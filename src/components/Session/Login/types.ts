import { StateProps, DispatchProps } from '.';

export interface IProps extends StateProps, DispatchProps {
  handleSubmit?: (
    values: {
      [name: string]: any;
    },
    event?: React.SyntheticEvent<any, Event>
  ) => void;
}

export const LOGIN_TYPES = {
  LOGIN: 'SESSION/LOGIN',
  UPDATE_SESSION_ON_REFRESH: 'SESSION/UPDATE_SESSION_ON_REFRESH',
  LOGOUT: 'SESSION/LOGOUT',
  UPDATE_SESSION_CONTEXT: 'SESSION/UPDATE_SESSION_CONTEXT',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
};
