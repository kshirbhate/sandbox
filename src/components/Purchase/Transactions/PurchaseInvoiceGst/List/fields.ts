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
  {
    label: 'Party Invoice Number',
    name: 'partyInvoiceNumber',
    type: 'number',
  },
  {
    label: 'Supplier',
    name: 'supplier',
    type: 'text',
  },
  {
    label: 'Unit Name',
    name: 'unit',
    type: 'unit',
  },
  {
    label: 'From Amount',
    name: 'fromAmount',
    type: 'number',
  },
  {
    label: 'To Amount',
    name: 'toAmount',
    type: 'number',
  },
];

export const initializeFilterValues = (props) => {
  const { initialize, filterFormName, session } = props;
  initialize(filterFormName, {
    fromTo: {
      from: new Date(moment(new Date()).subtract(7, 'd').format()),
      to: new Date(),
    },
    unit: {
      value: session?.crrntCmpnyUnit?.id,
      label: session?.crrntCmpnyUnit?.title,
    },
  });
};
