/** @format */

import React, { useContext, useEffect } from 'react';
import Head from '../Header/index';
import SideBar from '../Sidebar/index';
import Bread from '../Breadcrumbs/index';
import Product from '../ProductContainer/index';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';
import store from '../../contextAPI/contextStore/store';
import API from '../../Apis/index';
import { Types } from '../../constants';

const { Header, Content, Sider } = Layout;

export default function Container() {
	const productContext = useContext(store);
	console.log(productContext);
	useEffect(() => {
		const getProductLimit = async () => {
			productContext.dispatch({
				type: Types.SET_LOADING,
			});
			try {
				const params = {
					_page: 1,
					_limit: 16,
				};
				const startTime = new Date().getTime();
				const productAll = await API.get('products');
				const productLimit = await API.get('products', { params: params });

				productContext.dispatch({
					type: Types.GET_ALL_PRODUCT,
					payload: {
						products: productAll.data,
						productLimit: productLimit.data,
						loadtime: new Date().getTime() - startTime,
					},
				});
			} catch (error) {
				console.log(error);
			}
		};
		getProductLimit();
	}, []);
	return (
		<Layout>
			<Header className='header'>
				<Head />
			</Header>
			<Layout>
				<Sider
					width={270}
					className='site-layout-background sider'
					style={{ background: '#fff' }}>
					<SideBar />
				</Sider>
				<Layout>
					<Bread />
					<Content
						className='site-layout-background'
						style={{
							padding: 12,
							margin: 0,
							marginLeft: 280,
						}}>
						<Product />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
