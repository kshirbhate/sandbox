import { isStarted, isCompleted, isFailure } from 'restClient/utils';
import { CONTEXT_TYPES } from '../types';

const initialState = {
  loading: false,
  errors: [],
  list: [],
  branchList: [],
  regionList: [],
  companyList: [],
  unitList: [],
  financialYearList: [],
  showContextModal: false,
};

export type ContextState = Readonly<typeof initialState>;

const start = (state) => ({
  ...state,
  loading: true,
});

const failure = (state, action) => ({
  ...state,
  loading: false,
  errors: action.error,
});

const mapItem = (item) => ({
  label: item.name,
  value: item.id,
});

const constructContextList = (list) => {
  const companyList = [];
  const regionList = [];
  const branchList = [];
  const unitList = [];
  const financialYearList = [];
  list.forEach((company) => {
    companyList.push(mapItem(company));
    company?.regions.forEach((region) => {
      regionList.push({
        ...mapItem(region),
        company: company.id,
      });

      region?.branches.forEach((branch) => {
        branchList.push({
          ...mapItem(branch),
          region: region.id,
        });

        branch?.units.forEach((unit) => {
          unitList.push({
            ...mapItem(unit),
            branch: branch.id,
          });

          unit?.financialYears.forEach((financialYear) => {
            financialYearList.push({
              ...mapItem(financialYear),
              unit: unit.id,
            });
          });
        });
      });
    });
  });

  return {
    companyList,
    regionList,
    branchList,
    unitList,
    financialYearList,
  };
};

const result = (state, action) => {
  const list = action?.response || [];
  const { companyList, regionList, branchList, unitList, financialYearList } = constructContextList(list);
  return {
    ...state,
    loading: false,
    companyList,
    regionList,
    branchList,
    unitList,
    financialYearList,
  };
};

const showContextModalResult = (state, action) => ({
  ...state,
  showContextModal: action.value,
});

export default (state: ContextState = initialState, action): ContextState => {
  switch (action.type) {
    case CONTEXT_TYPES.SHOW_CONTEXT_MODAL:
      return showContextModalResult(state, action);
    case CONTEXT_TYPES.GET_CONTEXT_HIERARCHY: {
      if (isStarted(action.operation)) {
        return start(state);
      } else if (isCompleted(action.operation)) {
        return result(state, action);
      } else if (isFailure(action.operation)) {
        return failure(state, action);
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};
