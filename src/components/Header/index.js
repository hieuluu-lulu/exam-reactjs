/** @format */

import React from 'react';
import { Layout, Input } from 'antd';
import logo from '../../images/logo-is.png';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { SearchProduct } from '../../features/products/productActions';
import { SET_LOADING } from '../../features/products/productSlice';
const { Header } = Layout;
const { Search } = Input;
export default function Head() {
	const params = useSelector((state) => state.product.params);
	const dispatch = useDispatch();
	const onSearch = (value) => {
		dispatch(SET_LOADING());
		dispatch(SearchProduct({ ...params, name_like: value }));
	};
	return (
		<Layout>
			<Header className='header'>
				<div className='header__logo'>
					<img src={logo} alt={logo} />
					<a href='/'>amazing</a>
					<Search
						placeholder='Search a product'
						onSearch={(value) => onSearch(value)}
						enterButton
						style={{ width: 300, marginLeft: 15 }}
					/>
				</div>
			</Header>
		</Layout>
	);
}
