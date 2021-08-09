/** @format */

import React, { useEffect } from 'react';
import Product from '../Product/index';
import Head from '../Header/index';
import SideBar from '../Sidebar/index';
import Bread from '../Breadcrumbs/index';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './style.scss';
import { useDispatch } from 'react-redux';
import { getProduct } from '../../features/products/productActions';
const { Header, Content, Sider } = Layout;

export default function Container() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProduct({ _page: 1, _limit: 16 }));
	}, [dispatch]);
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
							height: '100%',
						}}>
						<Product />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
