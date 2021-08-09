/** @format */

import { Types } from '../../constants/index';
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
export const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case Types.SET_LOADING: {
			return { ...state, isLoading: true };
		}
		case Types.GET_ALL_PRODUCT: {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state = {
				...state,
				allProducts: action.payload.products,
				productLimit: action.payload.productLimit,
				params: {},
				loadtime: action.payload.loadtime,
				isLoading: false,
				categories: categories,
				types: types,
				brands: brands,
				pagination: {
					currentPage: 1,
					total: action.payload.products.length,
					limit: 16,
				},
			};
			return { ...state };
		}
		case Types.SORT_PRICE: {
			state = {
				...state,
				allProducts: action.payload.products,
				productLimit: action.payload.productLimit,
				params: {},
				loadtime: action.payload.loadtime,
				isLoading: false,
				pagination: {
					currentPage: 1,
					total: action.payload.products.length,
					limit: 16,
				},
			};
			return { ...state };
		}
		case Types.CLEAR_FILTER: {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state = {
				...state,
				allProducts: action.payload.products,
				productLimit: action.payload.products.slice(0, 16),
				params: {},
				loadtime: action.payload.loadtime,
				isLoading: false,
				categories: categories,
				types: types,
				brands: brands,
				indexRating: null,
				indexPrice: null,
				pagination: {
					currentPage: 1,
					total: action.payload.products.length,
					limit: 16,
				},
			};
			return { ...state };
		}
		case Types.CHANGE_PAGE: {
			state = {
				...state,
				isLoading: false,
				productLimit: action.payload.productLimit,
				pagination: {
					...state.pagination,
					currentPage: action.payload.currentPage,
					limit: action.payload.limit,
				},
			};
			return state;
		}
		case Types.SEARCH_PRODUCT: {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state = {
				...state,
				isLoading: false,
				productLimit: action.payload.products.slice(0, 16),
				loadtime: action.payload.loadtime,
				types: types,
				categories: categories,
				brands: brands,
				pagination: {
					currentPage: 1,
					total: action.payload.products.length,
					limit: 16,
				},
			};
			return { ...state };
		}
		case Types.GET_PRODUCT_CATEGORIES: {
			const { categories, types, brands } = getCategories(
				action.payload.productAll,
				state.categories,
				action.payload.category,
			);
			state = {
				...state,
				productLimit: action.payload.productLimit,
				allProducts: action.payload.productAll,
				params: action.payload.params,
				isLoading: false,
				categories: categories,
				loadtime: action.payload.loadtime,
				types: types,
				brands: brands,
				pagination: {
					currentPage: 1,
					total: action.payload.productAll?.length,
					limit: 16,
				},
			};
			return { ...state };
		}
		case Types.FILTER_TYPE: {
			const { categories, brands } = getCategories(
				action.payload.allProduct,
				state.categories,
				state.currentCategory,
			);
			const index = state.types.findIndex((item) => item.type === action.payload.type.type);
			state.types[index] = { ...state.types[index], checked: !action.payload.type.checked };
			state = {
				...state,
				allProducts: action.payload.allProduct,
				productLimit: action.payload.productLimit,
				types: state.types,
				brands: brands,
				categories: categories,
				params: action.payload.params,
				loadtime: action.payload.loadtime,
				pagination: {
					currentPage: 1,
					total: action.payload.allProduct?.length,
					limit: 16,
				},
			};
			return { ...state };
		}
		case Types.FILTER_BRAND: {
			const { categories, types } = getCategories(
				action.payload.allProduct,
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
			state = {
				...state,
				allProducts: action.payload.allProduct,
				productLimit: action.payload.productLimit,
				types: types,
				brands: state.brands,
				categories: categories,
				loadtime: action.payload.loadtime,
				params: action.payload.params,
				pagination: {
					currentPage: 1,
					total: action.payload.allProduct?.length,
					limit: 16,
				},
			};
			return { ...state };
		}
		case Types.FILTER_RATING: {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state = {
				...state,
				allProducts: action.payload.products,
				productLimit: action.payload.products.slice(0, 16),
				types: types,
				categories: categories,
				brands: brands,
				loadtime: action.payload.loadtime,
				params: action.payload.params,
				indexRating: action.payload.indexRating,
				pagination: {
					currentPage: 1,
					total: action.payload.products?.length,
					limit: 16,
				},
			};

			return { ...state };
		}
		case Types.FILTER_PRICE: {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state = {
				...state,
				allProducts: action.payload.products,
				productLimit: action.payload.products.slice(0, 16),
				types: types,
				categories: categories,
				brands: brands,
				loadtime: action.payload.loadtime,
				params: action.payload.params,
				indexPrice: action.payload.indexPrice,
				pagination: {
					currentPage: 1,
					total: action.payload.products?.length,
					limit: 16,
				},
			};

			return { ...state };
		}
		case Types.FIND_BY_PRICE: {
			const { categories, types, brands } = getCategories(
				action.payload.products,
				state.categories,
				state.currentCategory,
			);
			state = {
				...state,
				allProducts: action.payload.products,
				productLimit: action.payload.products.slice(0, 16),
				types: types,
				categories: categories,
				brands: brands,
				loadtime: action.payload.loadtime,
				params: action.payload.params,
				pagination: {
					currentPage: 1,
					total: action.payload.products?.length,
					limit: 16,
				},
			};

			return { ...state };
		}
		default:
			return state;
	}
};
