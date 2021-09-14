/** @format */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { selectIsLoggedIn } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
export default function PrivateLayout({ component: Component, ...props }) {
	const isLogin = useSelector(selectIsLoggedIn);
	return isLogin ? (
		<Route
			{...props}
			render={(routerProps) => (
				<>
					<Header />
					<div className='container'>
						<Component {...routerProps} />
					</div>
				</>
			)}
		/>
	) : (
		<Redirect path='/login'>
			{toast.warning('You need to log in first !', {
				position: toast.POSITION.TOP_RIGHT,
				theme: 'colored',
			})}
		</Redirect>
	);
}
