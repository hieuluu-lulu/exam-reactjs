import { createAction } from '@reduxjs/toolkit';
import { CART_TYPES, REQUEST } from '../constants';

export const addToCart = createAction(REQUEST(CART_TYPES.ADD_TO_CART));
export const updateCart = createAction(REQUEST(CART_TYPES.UPDATE_QUANTITY));
export const deleteCart = createAction(REQUEST(CART_TYPES.DELETE_PRODUCT_IN_CART));
