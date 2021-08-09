/** @format */

import React, { useContext } from 'react';
import store from '../../contextAPI/contextStore/store';
import { Rate } from 'antd';
import API from '../../Apis/index';
import { Types } from '../../constants';

export default function Rating() {
	const listRating = [
		{ number: '16.075', value: 4 },
		{ number: '17.697', value: 3 },
		{ number: '17.891', value: 2 },
		{ number: '18.047', value: 1 },
	];

	const productStore = useContext(store);
	const handleFilterByRating = async (rating, index) => {
		try {
			const params = { ...productStore.state.params, rating_like: rating.value };
			if (index !== productStore.state.indexRating) {
				const startTime = new Date().getTime();
				const products = await API.get('products', { params: params });

				productStore.dispatch({
					type: Types.FILTER_RATING,
					payload: {
						products: products.data,
						params: params,
						loadtime: new Date().getTime() - startTime,
						indexRating: index,
					},
				});
			} else {
				delete params.rating_like;
				const startTime = new Date().getTime();
				const products = await API.get('products', { params: params });

				productStore.dispatch({
					type: Types.FILTER_RATING,
					payload: {
						products: products.data,
						params: params,
						loadtime: new Date().getTime() - startTime,
						indexRating: null,
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<h2 className='sidebar__types'>Ratings</h2>
			{listRating.map((rating, i) => {
				return (
					<div
						className={
							productStore.state?.indexRating === i ? 'rating active' : 'rating'
						}
						key={i}
						onClick={() => handleFilterByRating(rating, i)}>
						<Rate className='rating__star' disabled value={rating.value} />
						{`& Up ${rating.number}`}
					</div>
				);
			})}
		</div>
	);
}
