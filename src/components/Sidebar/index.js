/** @format */

import React, { useState } from 'react';
import { Button, Input } from 'antd';
import Categories from './Categories';
import './style.scss';
import Type from './Types';
import Brands from './Brands';
import Price from './Price';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByPrice } from '../../features/products/productActions';
import { getProduct } from '../../features/products/productActions';

export default function Sidebar() {
	const params = useSelector((state) => state.product.params);
	const dispatch = useDispatch();
	const handleClear = async () => {
		setInputPrice1('');
		setInputPrice2('');
		dispatch(getProduct({ _page: 1, _limit: 16 }));
	};
	const [inputPrice1, setInputPrice1] = useState('');
	const [inputPrice2, setInputPrice2] = useState('');

	const findProductRange = async () => {
		const param = {
			...params,
			price_gte: inputPrice1,
			price_lte: inputPrice2,
		};
		dispatch(getProductByPrice(param));
	};
	return (
		<div className='sidebar'>
			<Button
				style={{
					display: Object.keys(params).length > 0 ? 'block' : 'none',
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
