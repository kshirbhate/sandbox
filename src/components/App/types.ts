import { StateProps, DispatchProps } from '.';

export interface IProps extends StateProps, DispatchProps {
  children?: React.ReactNode;
  updateSessionOnRefresh?: Function;
}
