/** @format */

import React, { useContext } from 'react';
import { Breadcrumb, Select } from 'antd';
import store from '../../contextAPI/contextStore/store';
import API from '../../Apis/index';
import { Types } from '../../constants';
const { Option } = Select;
export default function Bread() {
	const productContext = useContext(store);
	const onChangeSort = async (value) => {
		if (value === 'featured') {
			const startTime = new Date().getTime();
			const { data } = await API.get('products');
			productContext.dispatch({
				type: Types.SORT_PRICE,
				payload: {
					products: data,
					productLimit: data.slice(0, 16),
					loadtime: new Date().getTime() - startTime,
				},
			});
		} else {
			const params = { ...productContext.state.params, _order: value, _sort: 'price' };
			const startTime = new Date().getTime();
			const { data } = await API.get('products', { params: params });
			productContext.dispatch({
				type: Types.SORT_PRICE,
				payload: {
					products: data,
					productLimit: data.slice(0, 16),
					loadtime: new Date().getTime() - startTime,
				},
			});
		}
	};

	return (
		<Breadcrumb style={{ margin: '75px 12px 0 280px' }} separator={null}>
			<Breadcrumb.Item>
				{productContext.state.pagination?.total} result found in{' '}
				{productContext.state?.loadtime} ms
			</Breadcrumb.Item>
			<Breadcrumb.Item style={{ float: 'right' }}>
				<Select defaultValue='featured' onChange={onChangeSort}>
					<Option value='featured'>Featured</Option>
					<Option value='asc'>Price Asc</Option>
					<Option value='desc'>Price Desc</Option>
				</Select>
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}
