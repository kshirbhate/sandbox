/* eslint-disable */

import { completeAction, errorAction, startAction } from './utils';

const actionType = (methodType: string, path: string) => `${methodType}_${path}`;

abstract class BaseRestClient {
  protected constructor(protected options: { request?: RequestInit; authHeader?: string; asBlob?: boolean } = {}) {}

  protected buildLink(path: string, args: { [key: string]: any } = {}): string {
    const usedArgs: string[] = [];
    // @ts-ignore
    let updatedLink = path.replace(/:(\w+)/g, (match, contents, offset, s) => {
      usedArgs.push(contents);
      return encodeURIComponent(args[contents]);
    });
    const params = Object.keys(args || {})
      .filter((key) => args[key] != null || key.startsWith('_'))
      .filter((key) => usedArgs.indexOf(key) === -1);
    if (params.length > 0) {
      updatedLink += `?${params.map((key) => `${key}=${args[key]}`).join('&')}`;
    }
    return `${process.env.REACT_APP_API_ENDPOINT}${updatedLink}`;
  }

  protected createRequestInit(method: string, body?: any): RequestInit {
    const request = this.options.request || ({} as RequestInit);
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: '',
    };
    if (request.headers) Object.assign(headers, request.headers);

    headers['Authorization'] = 'some token';

    return {
      body: body ? JSON.stringify(body) : null,
      cache: request.cache || 'no-cache',
      credentials: request.credentials || 'omit', // do not ever send cookies
      headers: headers,
      redirect: request.redirect || 'error', // default is follow (or manual prior to chrome 47)
      method: method,
      mode: request.mode || 'cors',
    } as RequestInit;
  }

  protected fetch<T>(url: string, request: RequestInit, transform?: (key: string, value: any) => T): Promise<T> {
    return fetch(url, request)
      .catch((_error: Error) => {
        return { status: -1 } as Response;
      })
      .then<T>((response) => this.convertResponse(response, transform));
  }

  private convertResponse<T>(response: Response, transform?: (key: string, value: any) => any): Promise<T> {
    switch (response.status) {
      case -1:
      case 503:
      case 504:
        throw {
          status: response.status,
          errors: [{ message: 'An issue has occurred communicating with the server. Please try again later.' }],
        };
      case 401:
        throw { status: 401, errors: [{ message: 'Not Authorized' }] };
      case 404:
        throw { status: 404, errors: [{ message: 'Not Found' }] };
    }

    if (response.status >= 400) {
      return response.text().then((body) => {
        const errors = [];
        try {
          const json = JSON.parse(body);
          (json.errors || []).forEach((error: any) => errors.push(error));
          if (json.error) errors.push({ message: json.error });
        } catch (e) {
          throw { status: response.status, errors: [{ code: e.message, message: body }] } as ErrorResponse;
        }
        throw { status: response.status, errors: errors };
      });
    }

    // @ts-ignore
    if (this.options.asBlob) return response.blob();
    return response.text().then((body) => JSON.parse(body, transform));
  }
}

export class PromiseRestClient extends BaseRestClient {
  // constructor(private request?: RequestInit) {
  //   super({ request: request });
  // }

  asBlob(): PromiseRestClient {
    return Object.assign(new PromiseRestClient(), this, { options: { asBlob: true } });
  }

  withAuthToken(type: 'Token' | 'Nonce' | 'Anonymous' = 'Token', token: string = ''): PromiseRestClient {
    let string = type == 'Anonymous' ? undefined : `${type} ${token}`;
    return Object.assign(new PromiseRestClient(), this, { options: { authHeader: string } });
  }

  $delete<T>(path: string, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): Promise<T> {
    const request = this.createRequestInit('DELETE');
    return this.fetch(this.buildLink(path, params), request, transform);
  }

  $get<T>(path: string, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): Promise<T> {
    const request = this.createRequestInit('GET');
    return this.fetch(this.buildLink(path, params), request, transform);
  }

  $patch<T>(path: string, data: any, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): Promise<T> {
    const request = this.createRequestInit('PATCH', data);
    return this.fetch(this.buildLink(path, params), request, transform);
  }

  $post<T>(path: string, data: any, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): Promise<T> {
    const request = this.createRequestInit('POST', data);
    return this.fetch(this.buildLink(path, params), request, transform);
  }

  $put<T>(path: string, data: any, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): Promise<T> {
    const request = this.createRequestInit('PUT', data);
    return this.fetch(this.buildLink(path, params), request, transform);
  }
}

export class AsyncRestClient extends BaseRestClient {
  constructor(request?: RequestInit) {
    super({ request: request });
  }

  asBlob(): AsyncRestClient {
    return Object.assign(new AsyncRestClient(), this, { options: { asBlob: true } });
  }

  withAuthToken(type: 'Token' | 'Nonce' | 'Anonymous' = 'Token', token: string = ''): AsyncRestClient {
    let string = type == 'Anonymous' ? undefined : `${type} ${token}`;
    return Object.assign(new AsyncRestClient(), this, { options: { authHeader: string } });
  }

  $delete<T>(path: string, type?: string, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): void {
    const request = this.createRequestInit('DELETE');
    this.fetchAsync(this.buildLink(path, params), type ? type : actionType('DELETE', path), request, transform, params);
  }

  $get<T>(path: string, type?: string, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): void {
    const request = this.createRequestInit('GET');
    this.fetchAsync(this.buildLink(path, params), type ? type : actionType('GET', path), request, transform, params);
  }

  $patch<T>(path: string, data: any, type?: string, params?: { [key: string]: any }, transform?: (key: string, value: any) => T): void {
    const request = this.createRequestInit('PATCH', data);
    this.fetchAsync(this.buildLink(path, params), type ? type : actionType('PATCH', path), request, transform, params);
  }

  $post<T>(path: string, data: any, type?: string, params?: { [key: string]: any }, transform?: (key: string, value: any) => T) {
    const request = this.createRequestInit('POST', data);
    this.fetchAsync(this.buildLink(path, params), type ? type : actionType('POST', path), request, transform, params);
  }

  $put<T>(path: string, data: any, type?: string, params?: { [key: string]: any }, transform?: (key: string, value: any) => T) {
    const request = this.createRequestInit('PUT', data);
    this.fetchAsync(this.buildLink(path, params), type ? type : actionType('PUT', path), request, transform, params);
  }

  private fetchAsync<T>(
    url: string,
    type: string,
    request: RequestInit,
    transform?: (key: string, value: any) => T,
    params: { [key: string]: any } = {}
  ): void {
    startAction(type);

    this.fetch(url, request, transform)
      .then((data) => completeAction(type, data, params))
      .catch((error) => errorAction(type, error));
  }
}

export class ErrorResponse {
  status!: number;
  errors: { code: string; field?: string; message: string }[] = [];
}

export const getAsyncRestClient = (_dispatch) => {
  return new AsyncRestClient();
};
