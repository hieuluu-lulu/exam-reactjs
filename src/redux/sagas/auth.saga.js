/** @format */

import { takeLeading, put } from 'redux-saga/effects';
import * as api from '../../api/userAPI';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
import { AUTH_TYPES, FAILURE, REQUEST, SUCCESS } from '../constants';
function* loginSaga(action) {
  try {
    const data = yield api.signIn(action.payload);

    toast.success(`Welcome ${data.user.firstname + ' ' + data.user.lastname}`, {
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
    if (data?.user?.role === 'admin') {
      yield put(push('/admin'));
    } else {
      yield put(push('/'));
    }
    yield put({
      type: SUCCESS(AUTH_TYPES.LOGIN),
      payload: data,
    });
  } catch (error) {
    yield put({
      type: FAILURE(AUTH_TYPES.LOGIN),
      payload: error.response.data,
    });
    toast.error(error?.response?.data, {
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
  }
}

function* signupSaga(action) {
  try {
    const { email, password, firstname, lastname } = action.payload;
    yield api.singUp({
      email,
      password,
      firstname,
      lastname,
      role: 'user',
    });
    yield put(push('/login'));
    toast.success('Register successful. Now you can login', {
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
  } catch (error) {
    toast.error(error?.response?.data, {
      position: toast.POSITION.TOP_RIGHT,
    });
    yield put({
      type: FAILURE(AUTH_TYPES.REGISTER),
      payload: error.response.data,
    });
  }
}

export default function* authSaga() {
  yield takeLeading(REQUEST(AUTH_TYPES.LOGIN), loginSaga);
  yield takeLeading(REQUEST(AUTH_TYPES.REGISTER), signupSaga);
}
