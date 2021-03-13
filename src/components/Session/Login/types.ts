import { StateProps, DispatchProps } from '.';

export interface IProps extends StateProps, DispatchProps {
  handleSubmit?: (
    values: {
      [name: string]: any;
    },
    event?: React.SyntheticEvent<any, Event>
  ) => void;
}
