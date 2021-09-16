/** @format */

import { Route } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function PublicLayout({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={(routerProps) => (
        <>
          <Header />
          <div className="container">
            <div className="grid">
              <Component {...routerProps} />
            </div>
          </div>
          <Footer />
        </>
      )}
    />
  );
}
