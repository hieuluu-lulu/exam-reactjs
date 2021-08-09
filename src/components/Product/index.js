/** @format */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Pagination, Spin } from 'antd';
import './style.scss';
import Cards from '../Card';
import { CHANGE_PAGE } from '../../features/products/productSlice';

export default function Product() {
	const loading = useSelector((state) => state.product.isLoading);
	const productLimit = useSelector((state) => state.product.productLimit);
	const pagination = useSelector((state) => state.product.pagination);
	const allProduct = useSelector((state) => state.product.allProducts);
	const dispatch = useDispatch();
	const handleChangePage = async (currentPage, currentSize) => {
		const data = allProduct.slice(
			currentPage * currentSize - currentSize,
			currentPage * currentSize,
		);
		const payload = {
			productLimit: data,
			currentPage: currentPage,
			limit: currentSize,
		};
		dispatch(CHANGE_PAGE(payload));
	};
	return !loading && productLimit.length ? (
		<Row gutter={[16, 16]}>
			{productLimit.map((product, index) => {
				return <Cards product={product} key={index}></Cards>;
			})}
			<Pagination
				current={pagination.currentPage}
				defaultPageSize='16'
				pageSizeOptions={['16', '32', '48']}
				total={pagination.total}
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
