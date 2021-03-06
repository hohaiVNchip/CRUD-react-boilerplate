import { takeLatest, call, put } from 'redux-saga/effects';
import { requestGet } from 'utils/request';
import _slice from 'lodash/slice';
import _get from 'lodash/get';
import _size from 'lodash/size';
import _isEmpty from 'lodash/isEmpty';
import { GET_LIST_PRODUCT_URL } from 'constants/routesApi';
// import { fakeData } from 'constants/fakeData';
import { GET_LIST_PRODUCTS } from './constants';
import { getListProductSuccess, getListProductFail } from './actions';

// const getDataFake = () =>
//   new Promise(resolve => {
//     setTimeout(() => {
//       resolve(fakeData);
//     }, 1000);
//   });

function* GetListBook(action) {
  try {
    const limit = _get(action, 'limit', 15);
    const offset = _get(action, 'offset', 0);
    // const keySearch = _get(action, 'text', '');

    // const products = yield call(getDataFake);

    const products = yield call(requestGet, GET_LIST_PRODUCT_URL);
    const sizeProducts = _size(products);

    const result = _slice(products, offset, limit + offset);

    if (!_isEmpty(result)) {
      yield put(getListProductSuccess({ data: result, sizes: sizeProducts }));
    } else {
      yield put(getListProductFail());
    }

    // const sizeData = data.length;
    // let result = [];
    // if (!_isEmpty(keySearch)) {
    //   result = _filter(data, { title: keySearch });
    // } else {
    //   result = _slice(data, offset, limit + offset);
    // }
    // // const result = _slice(data, offset, limit + offset);
    // yield put(getListBookSuccess(result, sizeData, keySearch));
  } catch (err) {
    yield put(getListProductFail(err));
  }
}

// Individual exports for testing
export default function* homePageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_LIST_PRODUCTS, GetListBook);
}
