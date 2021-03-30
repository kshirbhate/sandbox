import { StateProps as ListStateProps, DispatchProps as ListDispatchProps } from './List';

export interface IProps extends ListStateProps, ListDispatchProps {
  initialize?: Function;
  getFEATURE_NAME_UPPER_CAMELList?: Function;
}

export const FEATURE_NAME_CAPITAL_TYPES = {
  GET_FEATURE_NAME_CAPITAL_LIST: 'GET_FEATURE_NAME_CAPITAL_LIST',
};

// FEATURE_NAME_CAPITAL;
// FEATURE_NAME_UPPER_CAMEL;
