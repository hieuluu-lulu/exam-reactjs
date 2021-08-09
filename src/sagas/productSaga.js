/** @format */
import { put, takeEvery, takeLeading } from 'redux-saga/effects';
import API from '../api/index';
import {
	GET_ALL_PRODUCT,
	SET_LOADING,
	GET_FAIL,
	GET_PRODUCT_CATEGORIES,
} from '../features/products/productSlice';
import { Types } from '../constants/index';
function* getProduct({ payload }) {
	yield put(SET_LOADING());
	try {
		const { params } = payload;
		const productAll = yield API.get('products');
		const startTime = new Date().getTime();
		const productLimit = yield API.get('products', { params: params });
		const product = {
			products: productAll.data,
			productLimit: productLimit.data,
			loadtime: new Date().getTime() - startTime,
		};
		yield put(GET_ALL_PRODUCT(product));
	} catch (error) {
		yield put(GET_FAIL(error.message));
	}
}
function* getProductByCategories({ payload }) {
	yield put(SET_LOADING());
	try {
		const { params, category } = payload;
		const startTime = new Date().getTime();
		const productAll = yield API.get('products', { params: params });
		console.log(productAll);
		const product = {
			products: productAll.data,
			loadtime: new Date().getTime() - startTime,
			category: category,
			params: params,
		};
		yield put(GET_PRODUCT_CATEGORIES(product));
	} catch (error) {
		yield put(GET_FAIL());
	}
}
function* watchGetListProduct() {
	yield takeEvery(Types.GET_ALL_PRODUCT, getProduct);
}
function* watchGetProductByCategories() {
	yield takeLeading(Types.GET_PRODUCT_CATEGORIES, getProductByCategories);
}
const productSaga = [watchGetListProduct(), watchGetProductByCategories()];
export default productSaga;
