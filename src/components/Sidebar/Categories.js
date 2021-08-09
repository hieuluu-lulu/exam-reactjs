/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Collapse } from 'antd';
import './style.scss';
import { getProductByCategories } from '../../features/products/productActions';
const { Panel } = Collapse;
export default function Categories() {
	const categories = useSelector((state) => state.product.categories);
	const params = useSelector((state) => state.product.params);
	const dispatch = useDispatch();
	const handleFilterCategories = (category) => {
		const param = { ...params, categories_like: category.name };
		dispatch(getProductByCategories(param, category));
		if (category.level === 0 && category.isActive) {
			const newParam = { ...params };
			delete newParam.categories_like;
			dispatch(getProductByCategories(newParam, category));
		}
	};
	const mapMenu = (categories, handleFilterCategories) => {
		return categories.map((item, i) => (
			<Collapse
				activeKey={item.isActive ? i : ''}
				ghost
				key={i * 2}
				style={{ padding: 0 }}
				onChange={() => handleFilterCategories(item)}>
				<Panel
					header={
						<span
							style={{
								fontWeight: item.isActive ? 600 : 400,
							}}
							className='sidebar__list'>
							{item.name}
						</span>
					}
					key={i}
					forceRender={true}
					destroyInactivePanel={true}>
					{item.children && mapMenu(item.children, handleFilterCategories)}
				</Panel>
			</Collapse>
		));
	};
	return <div>{mapMenu(categories, handleFilterCategories)}</div>;
}
