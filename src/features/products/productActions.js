/** @format */

import API from '../../api/index';
import {
	SEARCH_PRODUCT,
	SORT_BY_PRICE,
	GET_PRODUCT_BY_TYPES,
	GET_FAIL,
	GET_PRODUCT_BY_RATING,
	GET_PRODUCT_BY_BRAND,
	GET_PRODUCT_BY_PRICE,
} from './productSlice';
import { Types } from '../../constants/index';
export const getProduct = (params) => {
	return {
		type: Types.GET_ALL_PRODUCT,
		payload: { params: params },
	};
};
export const SearchProduct = (params) => async (dispatch) => {
	console.log(params);
	try {
		const startTime = new Date().getTime();
		const { data } = await API.get('products', { params: params });
		const payload = {
			products: data,
			loadtime: new Date().getTime() - startTime,
		};
		dispatch(SEARCH_PRODUCT(payload));
	} catch (error) {
		console.log(error);
	}
};
export const SortPrice = (params) => async (dispatch) => {
	try {
		const startTime = new Date().getTime();
		const { data } = await API.get('products', { params: params });
		const payload = {
			products: data,
			loadtime: new Date().getTime() - startTime,
		};
		dispatch(SORT_BY_PRICE(payload));
	} catch (error) {
		console.log(error);
	}
};
export const getProductByCategories = (params, category) => {
	return {
		type: Types.GET_PRODUCT_CATEGORIES,
		payload: { params: params, category: category },
	};
};
export const getProductByTypes = (params, type) => async (dispatch) => {
	try {
		const startTime = new Date().getTime();
		const productAll = await API.get('products', { params: params });
		const payload = {
			products: productAll.data,
			loadtime: new Date().getTime() - startTime,
			productLimit: productAll.data.slice(0, 16),
			params: params,
			type: type,
		};
		dispatch(GET_PRODUCT_BY_TYPES(payload));
	} catch (error) {
		dispatch(GET_FAIL());
	}
};
export const getProductByRating = (params, index) => async (dispatch) => {
	try {
		const startTime = new Date().getTime();
		const products = await API.get('products', { params: params });

		const payload = {
			products: products.data,
			params: params,
			loadtime: new Date().getTime() - startTime,
			indexRating: index,
		};
		dispatch(GET_PRODUCT_BY_RATING(payload));
	} catch (error) {
		dispatch(GET_FAIL());
	}
};
export const getProductByBrand = (params, brand) => async (dispatch) => {
	try {
		const startTime = new Date().getTime();
		const productAll = await API.get('products', { params: params });
		const payload = {
			products: productAll.data,
			productLimit: productAll.data.slice(0, 16),
			params: params,
			brand: brand,
			loadtime: new Date().getTime() - startTime,
		};
		dispatch(GET_PRODUCT_BY_BRAND(payload));
	} catch (error) {
		dispatch(GET_FAIL());
	}
};
export const getProductByPrice = (params, index) => async (dispatch) => {
	try {
		const startTime = new Date().getTime();
		const productAll = await API.get('products', { params: params });
		const payload = {
			products: productAll.data,
			productLimit: productAll.data.slice(0, 16),
			params: params,
			loadtime: new Date().getTime() - startTime,
			indexPrice: index,
		};
		dispatch(GET_PRODUCT_BY_PRICE(payload));
	} catch (error) {
		dispatch(GET_FAIL());
	}
};
