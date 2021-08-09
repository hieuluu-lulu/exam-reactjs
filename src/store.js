/** @format */

import { configureStore } from '@reduxjs/toolkit';
import productReducer from './features/products/productSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sageMiddleware = createSagaMiddleware();
const store = configureStore({
	reducer: {
		product: productReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sageMiddleware),
});
sageMiddleware.run(rootSaga);
export default store;
