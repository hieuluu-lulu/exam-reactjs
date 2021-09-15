/** @format */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { history } from '../utils/history';
import authReducer from '../redux/reducers/auth.reducer';
import rootSaga from '../redux/sagas';
import productReducer from '../redux/reducers/product.reducer';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  router: connectRouter(history),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
});
sagaMiddleware.run(rootSaga);
