/** @format */

import React, { useContext } from 'react';
import store from '../../contextAPI/contextStore/store';
import { Checkbox } from 'antd';
import API from '../../Apis/index';
import { Types } from '../../constants';
export default function Type() {
	const productStore = useContext(store);
	const handleChangeType = async (type) => {
		productStore.dispatch({
			type: Types.SET_LOADING,
		});
		if (type.checked) {
			const params = { ...productStore.state.params };
			delete params.type_like;
			const productAll = await API.get('products', { params: params });
			const startTime = new Date().getTime();
			const productLimit = await API.get('products', {
				params: { ...params, _page: 1, _limit: 16 },
			});
			productStore.dispatch({
				type: Types.FILTER_TYPE,
				payload: {
					allProduct: productAll.data,
					productLimit: productLimit.data,
					params: params,
					type: type,
					loadtime: new Date().getTime() - startTime,
				},
			});
		} else {
			const params = { ...productStore.state.params, type_like: type.type };
			const productAll = await API.get('products', { params: params });
			const startTime = new Date().getTime();
			const productLimit = await API.get('products', {
				params: { ...params, _page: 1, _limit: 16 },
			});
			productStore.dispatch({
				type: Types.FILTER_TYPE,
				payload: {
					allProduct: productAll.data,
					productLimit: productLimit.data,
					params: params,
					type: type,
					loadtime: new Date().getTime() - startTime,
				},
			});
		}
	};
	return (
		<div>
			{productStore.state?.types.map((type, index) => (
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
