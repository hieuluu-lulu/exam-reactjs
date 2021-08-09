/** @format */

import React, { useContext } from 'react';
import store from '../../contextAPI/contextStore/store';
import API from '../../Apis/index';
import { Types } from '../../constants';
export default function Price() {
	const productStore = useContext(store);

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
	const handleFilterByPrice = async (price, index) => {
		const params = { ...productStore.state.params };
		if (index !== productStore.state.indexPrice) {
			if (price.label.includes('≤')) {
				// const params = { ...productStore.state.params, price_lte: price.value };
				const startTime = new Date().getTime();
				const products = await API.get('products', {
					params: { ...params, price_lte: price.value },
				});

				productStore.dispatch({
					type: Types.FILTER_PRICE,
					payload: {
						products: products.data,
						params: { ...params, price_lte: price.value },
						loadtime: new Date().getTime() - startTime,
						indexPrice: index,
					},
				});
			} else if (price.label.includes('≥')) {
				// const params = { ...productStore.state.params, price_gte: price.value };
				delete params.price_lte;
				const startTime = new Date().getTime();
				const products = await API.get('products', {
					params: { ...params, price_gte: price.value },
				});

				productStore.dispatch({
					type: Types.FILTER_PRICE,
					payload: {
						products: products.data,
						params: { ...params, price_gte: price.value },
						loadtime: new Date().getTime() - startTime,
						indexPrice: index,
					},
				});
			} else {
				let smallest = price.value.split('-')[0];
				let biggest = price.value.split('-')[1];

				const startTime = new Date().getTime();
				const products = await API.get('products', {
					params: { ...params, price_gte: smallest, price_lte: biggest },
				});

				productStore.dispatch({
					type: Types.FILTER_PRICE,
					payload: {
						products: products.data,
						params: { ...params, price_gte: smallest, price_lte: biggest },
						loadtime: new Date().getTime() - startTime,
						indexPrice: index,
					},
				});
			}
		} else {
			delete params.price_gte;
			delete params.price_lte;
			const startTime = new Date().getTime();
			const products = await API.get('products', { params: params });

			productStore.dispatch({
				type: Types.FILTER_PRICE,
				payload: {
					products: products.data,
					params: params,
					loadtime: new Date().getTime() - startTime,
					indexPrice: null,
				},
			});
		}
	};
	return (
		<div>
			<h2 className='sidebar__types'>Prices</h2>
			{listPrice.map((price, i) => {
				return (
					<div
						className={
							i === productStore.state?.indexPrice
								? 'price-item active'
								: 'price-item'
						}
						key={i}
						onClick={() => handleFilterByPrice(price, i)}>
						{price.label}
					</div>
				);
			})}
		</div>
	);
}
