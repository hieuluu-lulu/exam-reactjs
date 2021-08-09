/** @format */

import React from 'react';
import { Rate } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getProductByRating } from '../../features/products/productActions';
import { SET_LOADING } from '../../features/products/productSlice';

export default function Rating() {
	const listRating = [
		{ number: '16.075', value: 4 },
		{ number: '17.697', value: 3 },
		{ number: '17.891', value: 2 },
		{ number: '18.047', value: 1 },
	];

	const params = useSelector((state) => state.product.parmas);
	const indexRating = useSelector((state) => state.product.indexRating);
	const dispatch = useDispatch();
	const handleFilterByRating = async (rating, index) => {
		if (index !== indexRating) {
			dispatch(SET_LOADING());
			const param = { ...params, rating_like: rating.value };
			dispatch(getProductByRating(param, index));
		} else {
			const param = { ...params };
			delete param.rating_like;
			dispatch(getProductByRating(param, (index = null)));
		}
	};
	return (
		<div>
			<h2 className='sidebar__types'>Ratings</h2>
			{listRating.map((rating, i) => {
				return (
					<div
						className={indexRating === i ? 'rating active' : 'rating'}
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
