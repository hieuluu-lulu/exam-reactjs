/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../../utils/index';
const initialState = {
	allProducts: [],
	productLimit: [],
	params: {},
	loadtime: 0,
	isLoading: false,
	categories: [],
	currentCategory: {},
	types: [],
	brands: [],
	pagination: {
		currentPage: 1,
		total: 1,
		limit: 16,
	},
};

const productSlice = createSlice({
	name: 'product',
	initialState: initialState,
	reducers: {
		SET_LOADING(state) {
			state.isLoading = true;
		},
		GET_FAIL(error) {
			console.log(error);
		},
		GET_ALL_PRODUCT(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.productLimit;
			state.params = {};
			state.isLoading = false;
			state.categories = categories;
			state.types = types;
			state.brands = brands;
			state.loadtime = action.payload.loadtime;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products.length,
				limit: 16,
			};
		},
		CHANGE_PAGE(state, action) {
			state.productLimit = action.payload.productLimit;
			state.pagination.currentPage = action.payload.currentPage;
			state.pagination.limit = action.payload.limit;
		},
		SEARCH_PRODUCT(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state.isLoading = false;
			state.productLimit = action.payload.products.slice(0, 16);
			state.loadtime = action.payload.loadtime;
			state.categories = categories;
			state.types = types;
			state.brands = brands;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products.length,
				limit: 16,
			};
		},
		SORT_BY_PRICE(state, action) {
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.products.slice(0, 16);
			state.loadtime = action.payload.loadtime;
			state.isLoading = false;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products.length,
				limit: 16,
			};
		},
		GET_PRODUCT_CATEGORIES(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				action.payload.category,
			);
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.products.slice(0, 16);
			state.categories = categories;
			state.isLoading = false;
			state.types = types;
			state.brands = brands;
			state.params = action.payload.params;
			state.loadtime = action.payload.loadtime;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products.length,
				limit: 16,
			};
		},
		GET_PRODUCT_BY_TYPES(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			const index = state.types.findIndex((item) => item.type === action.payload.type.type);
			state.types[index] = { ...state.types[index], checked: !action.payload.type.checked };
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.productLimit;
			state.params = action.payload.params;
			state.isLoading = false;
			state.types = Object.keys(state.params).length === 0 ? types : [...state.types];
			state.brands = brands;
			state.categories = categories;
			state.loadtime = action.payload.loadtime;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products.length,
				limit: 16,
			};
		},
		GET_PRODUCT_BY_RATING(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.products.slice(0, 16);
			state.isLoading = false;
			state.categories = categories;
			state.brands = brands;
			state.types = types;
			state.loadtime = action.payload.loadtime;
			state.params = action.payload.params;
			state.indexRating = action.payload.indexRating;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products?.length,
				limit: 16,
			};
		},
		GET_PRODUCT_BY_BRAND(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			const index = state.brands.findIndex(
				(item) => item.brand === action.payload.brand.brand,
			);
			state.brands[index] = {
				...state.brands[index],
				checked: !action.payload.brand.checked,
			};
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.productLimit;
			state.params = action.payload.params;
			state.isLoading = false;
			state.brands = Object.keys(state.params).length === 0 ? brands : [...state.brands];
			state.types = types;
			state.categories = categories;
			state.loadtime = action.payload.loadtime;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products.length,
				limit: 16,
			};
		},
		GET_PRODUCT_BY_PRICE(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.products.slice(0, 16);
			state.types = types;
			state.categories = categories;
			state.brands = brands;
			state.loadtime = action.payload.loadtime;
			state.params = action.payload.params;
			state.indexPrice = action.payload.indexPrice;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products?.length,
				limit: 16,
			};
		},
		FIND_PRODUCT_BY_PRICE(state, action) {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state.allProducts = action.payload.products;
			state.productLimit = action.payload.products.slice(0, 16);
			state.categories = categories;
			state.types = types;
			state.brands = brands;
			state.loadtime = action.payload.loadtime;
			state.params = action.payload.params;
			state.pagination = {
				currentPage: 1,
				total: action.payload.products?.length,
				limit: 16,
			};
		},
	},
});
const { actions, reducer } = productSlice;
export const {
	GET_ALL_PRODUCT,
	SET_LOADING,
	GET_FAIL,
	CHANGE_PAGE,
	SEARCH_PRODUCT,
	GET_PRODUCT_CATEGORIES,
	SORT_BY_PRICE,
	GET_PRODUCT_BY_TYPES,
	GET_PRODUCT_BY_RATING,
	GET_PRODUCT_BY_BRAND,
	GET_PRODUCT_BY_PRICE,
	FIND_PRODUCT_BY_PRICE,
} = actions;
export default reducer;
