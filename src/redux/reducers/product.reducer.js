import { createReducer } from '@reduxjs/toolkit';
import { FAILURE, PRODUCT_TYPES, REQUEST, SUCCESS } from '../constants';
const initialState = {
  load: false,
  params: {},
  productData: [],
  productSale: [],
  productNew: [],
  brand: [],
  pagination: {
    currentPage: 1,
    total: 1,
    limit: 12,
  },
};
const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_TYPES.GET_PRODUCT_NEW)]: (state, action) => {
    return {
      ...state,
      load: true,
    };
  },
  [SUCCESS(PRODUCT_TYPES.GET_PRODUCT_NEW)]: (state, action) => {
    return {
      ...state,
      load: false,
      productNew: action.payload,
    };
  },
  [FAILURE(PRODUCT_TYPES.GET_PRODUCT_NEW)]: (state, action) => {
    return {
      ...state,
      error: action.payload,
    };
  },
  [REQUEST(PRODUCT_TYPES.GET_PRODUCT_SALE)]: (state, action) => {
    return {
      ...state,
      load: true,
    };
  },
  [SUCCESS(PRODUCT_TYPES.GET_PRODUCT_SALE)]: (state, action) => {
    return {
      ...state,
      load: false,
      productSale: action.payload,
    };
  },
  [FAILURE(PRODUCT_TYPES.GET_PRODUCT_SALE)]: (state, action) => {
    return {
      ...state,
      error: action.payload,
    };
  },
  [REQUEST(PRODUCT_TYPES.GET_PRODUCT)]: (state, action) => {
    return {
      ...state,
      load: true,
    };
  },
  [SUCCESS(PRODUCT_TYPES.GET_PRODUCT)]: (state, action) => {
    return {
      ...state,
      load: false,
      productData: action.payload.data,
      params: action.payload.params,
      pagination: {
        ...state.pagination,
        total: action.payload.total,
      },
    };
  },
  [FAILURE(PRODUCT_TYPES.GET_PRODUCT)]: (state, action) => {
    return {
      ...state,
      error: action.payload,
    };
  },
  [REQUEST(PRODUCT_TYPES.GET_BRAND)]: (state, action) => {
    return { ...state, load: true };
  },
  [SUCCESS(PRODUCT_TYPES.GET_BRAND)]: (state, action) => {
    return { ...state, load: false, brand: action.payload };
  },
  [FAILURE(PRODUCT_TYPES.GET_BRAND)]: (state, action) => {
    return { ...state, error: action.payload };
  },
});

export default productReducer;
