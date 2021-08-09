/** @format */

import React, { useContext } from 'react';
import { Collapse } from 'antd';
import store from '../../contextAPI/contextStore/store';
import './style.scss';
import API from '../../Apis/index';
import { Types } from '../../constants';
const { Panel } = Collapse;

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
				{/* đệ quy nếu như có thèn item.children */}
				{item.children && mapMenu(item.children, handleFilterCategories)}
			</Panel>
		</Collapse>
	));
};
export default function Categories() {
	const productStore = useContext(store);

	const handleFilterCategories = async (category) => {
		productStore.dispatch({
			type: Types.SET_LOADING,
		});

		try {
			const params = { ...productStore.state.params, categories_like: category.name };
			const productAll = await API.get('products', { params: params });
			const startTime = new Date().getTime();
			const productLimit = await API.get('products', {
				params: { ...params, _limit: 16, _page: 1 },
			});

			productStore.dispatch({
				type: Types.GET_PRODUCT_CATEGORIES,
				payload: {
					productAll: productAll.data,
					productLimit: productLimit.data,
					params,
					category,
					loadtime: new Date().getTime() - startTime,
				},
			});

			if (category.level === 0 && category.isActive) {
				const params = { ...productStore.state.params };
				delete params.categories_like;
				const productAll = await API.get('products', { params: params });
				const startTime = new Date().getTime();
				const productLimit = await API.get('products', {
					params: { ...params, _limit: 16, _page: 1 },
				});
				productStore.dispatch({
					type: Types.GET_PRODUCT_CATEGORIES,
					payload: {
						productAll: productAll.data,
						productLimit: productLimit.data,
						params,
						category,
						loadtime: new Date().getTime() - startTime,
					},
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return <div>{mapMenu(productStore.state?.categories, handleFilterCategories)}</div>;
}
