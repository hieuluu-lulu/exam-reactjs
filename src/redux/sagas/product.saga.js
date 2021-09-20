import { takeLeading, put } from 'redux-saga/effects';
import * as api from '../../api/productAPI';
import { REQUEST, FAILURE, PRODUCT_TYPES, SUCCESS } from '../constants';

function* getProductSale() {
  try {
    const res = yield api.getProductSale();
    yield put({
      type: SUCCESS(PRODUCT_TYPES.GET_PRODUCT_SALE),
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: FAILURE(PRODUCT_TYPES.GET_PRODUCT_SALE),
      payload: error.response.data,
    });
  }
}

function* getProductNew() {
  try {
    const res = yield api.getProductNew();
    yield put({
      type: SUCCESS(PRODUCT_TYPES.GET_PRODUCT_NEW),
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: FAILURE(PRODUCT_TYPES.GET_PRODUCT_NEW),
      payload: error.response.data,
    });
  }
}
function* getProduct(action) {
  try {
    const res = yield api.getProducts(action.payload);
    yield put({
      type: SUCCESS(PRODUCT_TYPES.GET_PRODUCT),
      payload: {
        data: res.data,
        params: action.payload,
        total: res.total,
      },
    });
  } catch (error) {
    yield put({
      type: FAILURE(PRODUCT_TYPES.GET_PRODUCT),
      payload: error.response.data,
    });
  }
}
function* getBrand() {
  try {
    const res = yield api.getBrand();

    yield put({
      type: SUCCESS(PRODUCT_TYPES.GET_BRAND),
      payload: res.data,
    });
  } catch (error) {
    yield put({
      type: FAILURE(PRODUCT_TYPES.GET_BRAND),
      payload: error.response.data,
    });
  }
}

export default function* productSaga() {
  yield takeLeading(REQUEST(PRODUCT_TYPES.GET_PRODUCT_SALE), getProductSale);
  yield takeLeading(REQUEST(PRODUCT_TYPES.GET_PRODUCT_NEW), getProductNew);
  yield takeLeading(REQUEST(PRODUCT_TYPES.GET_PRODUCT), getProduct);
  yield takeLeading(REQUEST(PRODUCT_TYPES.GET_BRAND), getBrand);
}
