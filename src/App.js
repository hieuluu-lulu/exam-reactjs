/** @format */

import React, { Suspense } from 'react';
import { Router, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import PublicLayout from './layouts/PublicLayout';
import { history } from './utils/history';
function App() {
  return (
    <Suspense
      fallback={
        <Spin
          tip="Loading..."
          size="large"
          style={{
            display: 'block',
            fontSize: '20px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
      }
    >
      <Router history={history}>
        <Switch>
          <PublicLayout
            exact
            path="/login"
            component={React.lazy(() => import('./pages/Login/Login'))}
          ></PublicLayout>
          <PublicLayout
            exact
            path="/register"
            component={React.lazy(() => import('./pages/Register/Register'))}
          ></PublicLayout>
          \
          <PublicLayout
            exact
            path="/"
            component={React.lazy(() => import('./pages/Users/HomePage/HomePage'))}
          ></PublicLayout>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
