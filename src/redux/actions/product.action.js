import { createAction } from '@reduxjs/toolkit';
import { PRODUCT_TYPES, REQUEST } from '../constants';
export const getProduct = createAction(REQUEST(PRODUCT_TYPES.GET_PRODUCT));
export const createProduct = createAction(REQUEST(PRODUCT_TYPES.CREATE_PRODUCT));
export const updateProduct = createAction(REQUEST(PRODUCT_TYPES.UPDATE_PRODUCT));
export const deleteProduct = createAction(REQUEST(PRODUCT_TYPES.DELETE_PRODUCT));
export const getProductSale = createAction(REQUEST(PRODUCT_TYPES.GET_PRODUCT_SALE));
export const getProductNew = createAction(REQUEST(PRODUCT_TYPES.GET_PRODUCT_NEW));
