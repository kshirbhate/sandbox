import { StateProps, DispatchProps } from '.';

export interface IProps extends StateProps, DispatchProps {
  handleSubmit?: (
    values: {
      [name: string]: any;
    },
    event?: React.SyntheticEvent<any, Event>
  ) => void;
  getContextHierarchy?: Function;
  setShowContextModal?: Function;
  change?: Function;
  dispatch?: any;
  initialize?: Function;
}

export const CONTEXT_TYPES = {
  GET_CONTEXT_HIERARCHY: 'GET_CONTEXT_HIERARCHY',
  SHOW_CONTEXT_MODAL: 'SHOW_CONTEXT_MODAL',
};
