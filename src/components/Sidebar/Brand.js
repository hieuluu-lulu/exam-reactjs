/** @format */

import React, { useContext } from 'react';
import store from '../../contextAPI/contextStore/store';
import { Checkbox, Input } from 'antd';
import { Types } from '../../constants';
import API from '../../Apis/index';
const { Search } = Input;
export default function Brands() {
	const productStore = useContext(store);

	const handleChangeBrand = async (brand) => {
		productStore.dispatch({
			type: Types.SET_LOADING,
		});
		if (brand.checked) {
			const params = { ...productStore.state.params };
			delete params.brand_like;
			const productAll = await API.get('products', { params: params });
			const startTime = new Date().getTime();
			const productLimit = await API.get('products', {
				params: { ...params, _page: 1, _limit: 16 },
			});
			productStore.dispatch({
				type: Types.FILTER_BRAND,
				payload: {
					allProduct: productAll.data,
					productLimit: productLimit.data,
					params: params,
					brand: brand,
					loadtime: new Date().getTime() - startTime,
				},
			});
		} else {
			const params = { ...productStore.state.params, brand_like: brand.brand };
			const startTime = new Date().getTime();
			const productAll = await API.get('products', { params: params });
			const productLimit = await API.get('products', {
				params: { ...params, _page: 1, _limit: 16 },
			});
			productStore.dispatch({
				type: Types.FILTER_BRAND,
				payload: {
					allProduct: productAll.data,
					productLimit: productLimit.data,
					params: params,
					brand: brand,
					loadtime: new Date().getTime() - startTime,
				},
			});
		}
	};
	const onSearch = async (value) => {
		try {
			const param = { ...productStore.state.params, brand_like: value };
			const startTime = new Date().getTime();
			const { data } = await API.get('products', { params: param });

			productStore.dispatch({
				type: Types.SEARCH_PRODUCT,
				payload: {
					products: data,
					loadtime: new Date().getTime() - startTime,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Search
				placeholder='Search for other...'
				enterButton
				style={{ width: 200, margin: '0 0 20px 20px' }}
				onSearch={(value) => onSearch(value)}
			/>
			{productStore.state?.brands.map((item, index) => (
				<div className='sidebar__checkbox' key={index + 2}>
					<Checkbox
						value={item.brand}
						onClick={() => handleChangeBrand(item)}
						checked={item?.checked}>
						{item.brand}({item.quantity})
					</Checkbox>
				</div>
			))}
		</div>
	);
}
