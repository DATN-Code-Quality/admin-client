import { ResponseData } from '~/src/constant';
import { removeFromArr, findAndReplace, insertAt } from '~/src/utils';
import logger from '~/src/utils/logger';

const SET_LOADING = 'setLoading';
const FETCH_SUCCESS = 'fetchSuccess';
const FETCH_ERROR = 'fetchError';
const SET_PAGE_PROPS = 'setPageProps';
const SET_STATE_FROM_QUERY = 'setStateFromQuery';
const SET_TOTAL = 'setTotal';
const SET_FILTERS = 'setFilters';
const REMOVE_ITEM = 'removeItem';
const ADD_ITEM = 'addItem';
const EDIT_ITEM = 'editItem';
const EDIT_LIST = 'editList';

export const listActions = {
  setLoadingAction: (isLoading: boolean) => ({
    type: SET_LOADING,
    payload: isLoading,
  }),
  fetchSuccessAction: <T>(payload: ResponseData<T[]>) => ({
    type: FETCH_SUCCESS,
    payload,
  }),
  fetchErrorAction: (payload) => ({
    type: FETCH_ERROR,
    payload,
  }),
  setPagePropsAction: (pageProps) => ({
    type: SET_PAGE_PROPS,
    payload: pageProps,
  }),
  setStateFromQuery: <T>(payload: ResponseData<T[]>) => ({
    type: SET_STATE_FROM_QUERY,
    payload,
  }),
  setTotalAction: (total: number) => ({
    type: SET_TOTAL,
    payload: total,
  }),
  setFiltersAction: (filters = {}) => ({
    type: SET_FILTERS,
    payload: filters,
  }),
  removeItemAction: <T>(item: T, keyId: string) => ({
    type: REMOVE_ITEM,
    payload: { item, keyId },
  }),
  addItemAction: <T>(item: T, index: number) => ({
    type: ADD_ITEM,
    payload: { item, index },
  }),
  editItemAction: <T>(item: T, key: string) => ({
    type: EDIT_ITEM,
    payload: { item, key },
  }),
  updateListAction: <T>(list: T[]) => ({
    type: EDIT_LIST,
    payload: { list },
  }),
};

const listHandler = {
  setLoading: (state, isLoading) => {
    return {
      ...state,
      isLoading,
    };
  },
  setStateFromQuery: (state, data) => {
    return {
      ...state,
      ...data,
    };
  },
  fetchSuccess: (state, payload) => {
    if (payload?.data?.length) {
      return {
        ...state,
        isLoading: false,
        isFetched: true,
        items: payload.data,
        total: payload.total,
      };
    } else {
      return {
        ...state,
        isFetched: true,
        isLoading: false,
        items: [],
        total: 0,
      };
    }
  },
  fetchError: (state, payload) => {
    return {
      ...state,
      isFetched: true,
      isLoading: false,
      items: [],
      total: 0,
      error: payload.error,
    };
  },
  setPageProps: (state, pageProps) => {
    const { current, pageSize } = pageProps;
    return {
      ...state,
      currentPage: current,
      pageSize,
    };
  },

  setTotal: (state, total) => {
    return {
      ...state,
      total,
    };
  },
  setFilters: (state, filters = {}) => {
    return {
      ...state,
      isFilterChanged: true,
      currentPage: 1,
      filters,
    };
  },
  removeItem: (state, { item, keyId }) => {
    return {
      ...state,
      items: removeFromArr(state.items, item[keyId], keyId),
      total: state.total - 1,
    };
  },
  addItem: (state, { item, index }) => {
    logger.debug('useList | addItem', item);
    return {
      ...state,
      items: insertAt(state.items, item, index),
      total: state.total + 1,
    };
  },
  editItem: (state, { item, key }) => {
    logger.debug('useList | editItem', item);
    return {
      ...state,
      items: findAndReplace(state.items, item, key),
    };
  },
  editList: (state, { list }) => {
    logger.debug('useList | editList', list);
    return {
      ...state,
      items: list,
    };
  },
  // swapItem: (state, { indexA, indexB }) => {
  //     return {
  //         ...state,
  //         items: swapPositionByIndex(state.items, indexA, indexB)
  //     };
  // }
};

export function listReducer(state, action) {
  if (listHandler[action.type]) {
    return listHandler[action.type](state, action.payload);
  }

  return { ...state };
}
