import { takeLeading, put } from 'redux-saga/effects';
import * as api from '../../api/productAPI';
import { REQUEST, FAILURE, PRODUCT_TYPES, SUCCESS } from '../constants';

function* getProductSale() {
  try {
    const data = yield api.getProductSale();
    yield put({
      type: SUCCESS(PRODUCT_TYPES.GET_PRODUCT_SALE),
      payload: data,
    });
  } catch (error) {
    yield put({
      type: FAILURE(PRODUCT_TYPES.GET_PRODUCT_SALE),
      payload: error.response.data,
    });
  }
}

export default function* productSaga() {
  yield takeLeading(REQUEST(PRODUCT_TYPES.GET_PRODUCT_SALE), getProductSale);
}
