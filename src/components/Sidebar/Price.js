/** @format */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByPrice } from '../../features/products/productActions';
export default function Price() {
	const listPrice = [
		{ label: '≤ $1', value: '1' },
		{ label: '$1 - 80', value: '1-80' },
		{ label: '$80 - 160', value: '80-160' },
		{ label: '$160 - 240', value: '160-240' },
		{ label: '$240 - 1.820', value: '240-1820' },
		{ label: '$1.820 - 3.400', value: '1820-3400' },
		{ label: '$3.400 - 4.980', value: '3400-4980' },
		{ label: '≥ $4.980', value: '4980' },
	];
	const indexPrice = useSelector((state) => state.product.indexPrice);
	const params = useSelector((state) => state.product.params);
	const dispatch = useDispatch();
	const handleFilterByPrice = async (price, index) => {
		if (index !== indexPrice) {
			if (price.label.includes('≤')) {
				dispatch(getProductByPrice({ ...params, price_lte: price.value }, index));
			} else if (price.label.includes('≥')) {
				delete params.price_lte;
				dispatch(getProductByPrice({ ...params, price_gte: price.value }, index));
			} else {
				let smallest = price.value.split('-')[0];
				let biggest = price.value.split('-')[1];
				dispatch(
					getProductByPrice(
						{ ...params, price_gte: smallest, price_lte: biggest },
						index,
					),
				);
			}
		} else {
			const param = { ...params };
			delete param.price_gte;
			delete param.price_lte;
			dispatch(getProductByPrice(param, (index = null)));
		}
	};
	return (
		<div>
			<h2 className='sidebar__types'>Prices</h2>
			{listPrice.map((price, i) => {
				return (
					<div
						className={i === indexPrice ? 'price-item active' : 'price-item'}
						key={i}
						onClick={() => handleFilterByPrice(price, i)}>
						{price.label}
					</div>
				);
			})}
		</div>
	);
}
