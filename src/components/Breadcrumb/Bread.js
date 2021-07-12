/** @format */

import React from 'react';
import { Breadcrumb, Select } from 'antd';
const { Option } = Select;
export default function Bread({ total, loadtime, onChangeFilter }) {
	return (
		<Breadcrumb style={{ margin: '16px 12px' }} separator={null}>
			<Breadcrumb.Item>
				{total} result found in {loadtime}ms
			</Breadcrumb.Item>
			<Breadcrumb.Item style={{ float: 'right' }}>
				<Select
					defaultValue='featured'
					onChange={(value) => onChangeFilter(value)}>
					<Option value='featured'>Featured</Option>
					<Option value='asc'>Price Asc</Option>
					<Option value='desc'>Price Desc</Option>
				</Select>
			</Breadcrumb.Item>
		</Breadcrumb>
	);
}
