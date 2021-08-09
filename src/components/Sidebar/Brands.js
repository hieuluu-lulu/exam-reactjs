/** @format */

import React from 'react';
import { Checkbox, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SET_LOADING } from '../../features/products/productSlice';
import { getProductByBrand, SearchProduct } from '../../features/products/productActions';
const { Search } = Input;
export default function Brands() {
	const brands = useSelector((state) => state.product.brands);
	const params = useSelector((state) => state.product.params);
	const dispatch = useDispatch();
	const handleChangeBrand = async (brand) => {
		dispatch(SET_LOADING());

		if (brand.checked) {
			const param = { ...params };
			delete param.brand_like;
			dispatch(getProductByBrand(param, brand));
		} else {
			const param = { ...params, brand_like: brand.brand };
			dispatch(getProductByBrand(param, brand));
		}
	};
	const onSearch = async (value) => {
		const param = { ...params, brand_like: value };
		dispatch(SearchProduct(param));
	};
	return (
		<div>
			<Search
				placeholder='Search for other...'
				enterButton
				style={{ width: 200, margin: '0 0 20px 20px' }}
				onSearch={(value) => onSearch(value)}
			/>
			{brands.map((item, index) => (
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
