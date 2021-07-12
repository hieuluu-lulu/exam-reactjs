/** @format */

import React from 'react';
import { Layout, Input } from 'antd';
import logo from '../../images/logo-is.png';
import './style.scss';
const { Header } = Layout;
const { Search } = Input;
export default function Head({ onSearch }) {
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
