/** @format */

import React from 'react';
import { Checkbox } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LOADING } from '../../features/products/productSlice';
import { getProductByTypes } from '../../features/products/productActions';
export default function Type() {
	const types = useSelector((state) => state.product.types);
	const params = useSelector((state) => state.product.params);
	const dispatch = useDispatch();
	const handleChangeType = async (type) => {
		dispatch(SET_LOADING());
		if (type.checked) {
			const param = { ...params };
			delete param.type_like;
			dispatch(getProductByTypes(param, type));
		} else {
			const param = { ...params, type_like: type.type };
			dispatch(getProductByTypes(param, type));
		}
	};
	return (
		<div>
			{types.map((type, index) => (
				<div className='sidebar__checkbox' key={index}>
					<Checkbox
						value={type.type}
						onClick={() => handleChangeType(type)}
						checked={type?.checked}>
						{type.type}({type.quantity})
					</Checkbox>
				</div>
			))}
		</div>
	);
}
