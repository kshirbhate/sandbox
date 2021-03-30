import { format } from 'date-fns';
import { isNil } from 'lodash';

export const convertDateFormat = (date, dateFormat = 'dd-MM-yyyy') => {
  if (isNil(date)) return '';
  return format(new Date(date), dateFormat);
};
