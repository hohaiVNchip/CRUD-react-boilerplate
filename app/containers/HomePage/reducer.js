/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import _size from 'lodash/size';
// import _isEmpty from 'lodash/isEmpty';
// import _forEach from 'lodash/forEach';
// import _get from 'lodash/get';
import {
  GET_LIST_PRODUCTS,
  GET_LIST_PRODUCTS_SUCCESS,
  GET_LIST_PRODUCTS_FAIL,
} from './constants';

export const initialState = {
  data: [],
  linkParams: {
    limit: 8,
    offset: 0,
    keySearch: '',
    sizeData: 0,
  },
  statusFlags: {
    isLoading: false,
    isShowLoadMore: false,
    isGetListFail: false,
    isCallApi: false,
    isGetProductSuccess: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_PRODUCTS:
        draft.statusFlags.isLoading = true;
        draft.statusFlags.isCallApi = true;
        if (action.offset === 0) {
          draft.linkParams.offset = initialState.linkParams.offset;
        }
        break;

      case GET_LIST_PRODUCTS_SUCCESS:
        draft.statusFlags.isLoading = false;
        draft.linkParams.sizeData = action.sizeData;
        draft.statusFlags.isShowLoadMore =
          _size(action.data) >= state.linkParams.limit;
        draft.linkParams.offset =
          _size(action.data) > 0
            ? state.linkParams.offset + _size(action.data)
            : 0;

        if (_size(action.data) > 0) {
          draft.statusFlags.isGetProductSuccess = true;
          draft.data = [...state.data, ...action.data];
        }
        break;

      case GET_LIST_PRODUCTS_FAIL:
        draft.statusFlags.isGetListFail = true;
        draft.statusFlags.isLoading = false;
        draft.statusFlags.isGetProductSuccess = false;
        draft.linkParams.offset = initialState.linkParams.offset;
        break;
    }
  });

export default homePageReducer;
// case GET_LIST_BOOK_SUCCESS: {
//   draft.statusFlags.isLoading = false;
//   draft.statusFlags.isShowLoadMore =
//     _size(action.data) >= state.linkParams.limit;

//   draft.linkParams.offset =
//     _size(action.data) > 0
//       ? state.linkParams.offset + _size(action.data)
//       : 0;

//   draft.linkParams.sizeData = action.sizeData;
//   const listData = [];
//   if (!_isEmpty(action.data) && _size(action.data) > 0) {
//     _forEach(action.data, (item, index) => {
//       const no = index + 1;
//       const title = _get(item, 'title', '');
//       const body = _get(item, 'body', '');
//       listData.push({ no, title, body });
//     });
//   }

//   if (!_isEmpty(action.text)) {
//     draft.data = listData;
//   } else {
//     draft.data = [...state.data, ...listData];
//   }
//   draft.statusFlags.isLoadMore = true;

//   break;
// }
