/** @format */

import React, { useContext, useState } from 'react';
import API from '../../Apis/index';
import { Button, Input } from 'antd';
import store from '../../contextAPI/contextStore/store';
import Categories from './Categories';
import './style.scss';
import Type from './Type';
import Brands from './Brand';
import Price from './Price';
import Rating from './Rating';
import { Types } from '../../constants';
export default function Sidebar() {
	const productStore = useContext(store);

	const handleClear = async () => {
		const startTime = new Date().getTime();
		const productAll = await API.get('products');
		setInputPrice1('');
		setInputPrice2('');
		productStore.dispatch({
			type: Types.CLEAR_FILTER,
			payload: {
				products: productAll.data,
				loadtime: new Date().getTime() - startTime,
			},
		});
	};
	const [inputPrice1, setInputPrice1] = useState('');
	const [inputPrice2, setInputPrice2] = useState('');

	const findProductRange = async () => {
		const params = {
			...productStore.state?.params,
			price_gte: inputPrice1,
			price_lte: inputPrice2,
		};
		const startTime = new Date().getTime();
		const productAll = await API.get('products', {
			params: params,
		});

		productStore.dispatch({
			type: Types.FIND_BY_PRICE,
			payload: {
				products: productAll.data,
				loadtime: new Date().getTime() - startTime,
				params: params,
			},
		});
	};
	return (
		<div className='sidebar'>
			<Button
				style={{
					display: Object.keys(productStore.state.params).length > 0 ? 'block' : 'none',
					width: '200px',
					margin: ' 15px auto 0',
					fontSize: 16,
					textAlign: 'center',
				}}
				size='large'
				onClick={handleClear}>
				Clear Filter
			</Button>
			<h1 className='sidebar__heading'>Show result for</h1>
			<Categories />
			<h1 className='sidebar__types'>Types</h1>
			<Type />
			<Rating />
			<h1 className='sidebar__types'>Brands</h1>
			<Brands />
			<Price />
			<div className='input-price'>
				<span>$</span>
				<Input
					type='number'
					value={inputPrice1}
					min='1'
					style={{
						fontSize: 16,
						color: '#1890ff',
						margin: '0 5px',
					}}
					onChange={(e) => setInputPrice1(e.target.value)}
				/>
				<span>to</span>
				<span>$</span>
				<Input
					type='number'
					value={inputPrice2}
					min='1'
					style={{
						fontSize: 16,
						color: '#1890ff',
						margin: '0 5px',
					}}
					onChange={(e) => setInputPrice2(e.target.value)}
				/>
				<Button
					type='primary'
					shape='circle'
					size='small'
					disabled={inputPrice1 !== '' && inputPrice2 !== '' ? false : true}
					onClick={() => findProductRange()}>
					Go
				</Button>
			</div>
		</div>
	);
}
