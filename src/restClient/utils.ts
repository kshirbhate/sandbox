import store from '../store';

export let dispatchAction = ({}: any): any => {};

class DispatchAction {
  public registerDispatch(dispatch: any) {
    dispatchAction = dispatch;
  }
}

export const DispatchActionService = new DispatchAction();

export const OPERATIONS = {
  BEGINS: 'BEGINS',
  COMPLETE: 'COMPLETE',
  FAILURE: 'FAILURE',
};

export const startAction = (type: string): any => {
  store.dispatch({
    operation: OPERATIONS.BEGINS,
    type: type,
  });
};

export const completeAction = (type: string, response: any, args: any): any => {
  store.dispatch({
    operation: OPERATIONS.COMPLETE,
    type: type,
    response,
    args,
  });
};

export const errorAction = (type: string, error: any): any => {
  store.dispatch({
    operation: OPERATIONS.FAILURE,
    type,
    error,
  });
};

export const isStarted = (operation) => operation === OPERATIONS.BEGINS;

export const isCompleted = (operation) => operation === OPERATIONS.COMPLETE;

export const isFailure = (operation) => operation === OPERATIONS.FAILURE;
