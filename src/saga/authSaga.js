/** @format */

import { takeLeading, put } from 'redux-saga/effects';
import * as api from '../api/userAPI';
import { toast } from 'react-toastify';
import { authActions } from '../features/auth/authSlice';
import { push } from 'connected-react-router';
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
    yield put(authActions.loginSuccess(data));
  } catch (error) {
    yield put(authActions.loginFailed());
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
    toast.success('Register successful. Now you can login');
  } catch (error) {
    toast.error(error?.response?.data, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
}

export default function* authSaga() {
  yield takeLeading(authActions.login.type, loginSaga);
  yield takeLeading(authActions.signUp.type, signupSaga);
}
