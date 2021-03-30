import moment from 'moment';

export const filterFields = [
  {
    name: 'fromTo',
    type: 'fromToDatePicker',
  },
  {
    label: 'Transaction Number',
    name: 'transactionNumber',
    type: 'number',
  },
];

export const initializeFilterValues = (props) => {
  const { initialize, filterFormName } = props;
  initialize(filterFormName, {
    fromTo: {
      from: new Date(moment(new Date()).subtract(7, 'd').format()),
      to: new Date(),
    },
  });
};
