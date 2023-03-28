import { useEffect, useMemo, useReducer } from 'react';
import { listReducer, listActions } from './listStore';
import logger from '~/src/utils/logger';
import { DEFAULT_PAGE_SIZE } from '~/src/constant';
import { ListActions, ListProps, ListState } from './listType';

const STATE_DEFAULT: ListState<any> = {
    items: [],
    total: 0,
    pageSize: 1,
    currentPage: 1,
    isLoading: false,
    isFetched: false,
    isFilterChanged: false,
    filters: {},
    error: 0,
    type: '',
};

export default function useList<T>(
    props: ListProps<T>,
    deps: any = [],
): [ListState<T>, ListActions] {
    const { fetchFn, defaultFilters = {}, defaultPageSize = DEFAULT_PAGE_SIZE } = props;

    const [list, dispatch] = useReducer<React.Reducer<ListState<T>, any>>(listReducer, {
        ...STATE_DEFAULT,
        filters: defaultFilters || {},
        pageSize: defaultPageSize,
    });

    const { currentPage, filters, pageSize } = list;

    const actions = useMemo<ListActions>(() => {
        const a = {
            onPageChange: pageProps => {
                logger.debug('onPagePropsChange | current:', pageProps);
                dispatch(listActions.setPagePropsAction(pageProps));
            },

            onFilterChange: (obj = {}) => {
                dispatch(listActions.setFiltersAction(obj));
            },

            onRemoveItem: (item, keyId = 'id') => {
                logger.debug('onRemoveItem | itemRemove:', item);
                dispatch(listActions.removeItemAction(item, keyId));
            },

            onAddItem: (item, index = 0) => {
                logger.debug('onAddItem:', item);
                dispatch(listActions.addItemAction(item, index));
            },

            onEditItem: (item, key) => {
                logger.debug('onEditItem:', item);
                dispatch(listActions.editItemAction(item, key));
            },

            onUpdateList: (list = []) => {
                logger.debug('updateList|list', list);
                dispatch(listActions.updateListAction(list));
            },
        };
        return a as ListActions;
    }, []);

    useEffect(() => {
        const params = {
            ...filters,
            limit: pageSize,
            offset: (currentPage - 1) * pageSize,
        };
        dispatch(listActions.setLoadingAction(true));
        fetchFn(params)
            .then(resp => {
                dispatch(listActions.fetchSuccessAction(resp));
            })
            .catch(error => {
                dispatch(listActions.fetchErrorAction(error));
            });
    }, [currentPage, pageSize, filters, ...deps]);

    return [list, actions];
}
