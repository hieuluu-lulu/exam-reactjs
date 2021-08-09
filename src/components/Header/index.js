/** @format */

import React, { useContext } from 'react';
import { Layout, Input } from 'antd';
import logo from '../../images/logo-is.png';
import './style.scss';
import store from '../../contextAPI/contextStore/store';
import API from '../../Apis/index';
import { Types } from '../../constants/index';
const { Header } = Layout;
const { Search } = Input;
export default function Head() {
	const productContext = useContext(store);

	const onSearch = async (value) => {
		try {
			const param = { ...productContext.state.params, name_like: value };
			const startTime = new Date().getTime();
			const { data } = await API.get('products', { params: param });

			productContext.dispatch({
				type: Types.SEARCH_PRODUCT,
				payload: {
					products: data,
					loadtime: new Date().getTime() - startTime,
				},
			});
		} catch (error) {
			console.log(error);
		}
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
