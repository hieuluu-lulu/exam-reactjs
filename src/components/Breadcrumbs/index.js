/** @format */

import React from 'react';
import { Breadcrumb, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { SortPrice } from '../../features/products/productActions';
const { Option } = Select;
export default function Bread() {
	const loadtime = useSelector((state) => state.product.loadtime);
	const pagination = useSelector((state) => state.product.pagination);
	const params = useSelector((state) => state.product.params);
	const dispatch = useDispatch();
	const onChangeSort = (value) => {
		if (value === 'featured') {
			const param = { ...params };
			delete param._order;
			delete param._sort;
			dispatch(SortPrice(param));
		} else {
			dispatch(SortPrice({ ...params, _order: value, _sort: 'price' }));
		}
	};
	return (
		<Breadcrumb style={{ margin: '75px 12px 0 280px' }} separator={null}>
			<Breadcrumb.Item>
				{pagination.total} result found in {loadtime} ms
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
