import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
import { SubscriberCode } from 'library';

export const getInputComponent = (inputType) => {
  switch (inputType) {
    case T.TEXT:
      return Input;
    case T.EMAIL:
      return Input;
    case T.PASSWORD:
      return Input;
    case T.NUMBER:
      return NumericTextBox;
    case T.SUBSCRIBERCODE:
      return SubscriberCode;
    default:
      return Input;
  }
};

export const T = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  NUMBER: 'number',
  SUBSCRIBERCODE: 'subscriberCode',
};
