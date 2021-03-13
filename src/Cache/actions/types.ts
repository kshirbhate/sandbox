export const CACHE_TYPES = {
  ADD: 'cache/ADD',
  UPDATE_ALL: 'cache/UPDATE_ALL',
};

export class Cache {
  id?: string;
  type: string;
  name: string;
  data: any;
  params: any;
  validTill?: string;
}
