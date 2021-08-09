/** @format */

import React, { useContext } from 'react';
import { Row, Pagination, Spin } from 'antd';
import store from '../../contextAPI/contextStore/store';
import Cards from '../Card/index';
import { Types } from '../../constants';
import './style.scss';
export default function Product() {
	const productStore = useContext(store);

	const handleChangePage = async (currentPage, currentSize) => {
		productStore.dispatch({
			type: Types.SET_LOADING,
		});
		try {
			const productPage = productStore.state.allProducts.slice(
				currentPage * currentSize - currentSize,
				currentPage * currentSize,
			);
			productStore.dispatch({
				type: Types.CHANGE_PAGE,
				payload: {
					productLimit: productPage,
					currentPage: currentPage,
					limit: currentSize,
				},
			});
		} catch (error) {
			console.log(error);
		}
	};
	return !productStore?.isLoading && productStore.state?.productLimit.length ? (
		<Row gutter={[16, 16]}>
			{productStore.state?.productLimit?.map((product, index) => {
				return <Cards product={product} key={index}></Cards>;
			})}
			<Pagination
				current={productStore.state?.pagination.currentPage}
				defaultPageSize='16'
				pageSizeOptions={['16', '32', '48']}
				total={productStore.state?.pagination.total}
				onChange={handleChangePage}
				className='pagination'
			/>
		</Row>
	) : (
		<Spin
			tip='Loading...'
			style={{
				display: 'block',
				margin: '0 auto',
				fontSize: '20px',
			}}></Spin>
	);
}
