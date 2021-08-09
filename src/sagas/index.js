/** @format */

import { all } from '@redux-saga/core/effects';
import productSaga from './productSaga';

export default function* rootSaga() {
	yield all([...productSaga]);
}
