/** @format */

import React from 'react';
import { Card, Row, Col, Pagination, Rate, Spin } from 'antd';
import './style.scss';
const { Meta } = Card;

export default function Product({
	product,
	params,
	total,
	setParams,
	loading,
	setLoading,
}) {
	return !loading && product.length ? (
		<Row gutter={[16, 16]}>
			{product.map((item) => (
				<Col
					span={6}
					xs={24}
					sm={24}
					md={12}
					lg={6}
					xl={6}
					key={item.objectID}>
					<Card
						className='product'
						hoverable
						cover={
							<img
								alt={item.name}
								src={item.image}
								className='product__img'
							/>
						}>
						<Meta title={item.name} className='product__title' />
						<Row gutter={[8, 8]} className='product__bottom'>
							<Col span={18}>
								<Rate
									disabled
									value={item.rating}
									className='product__rating'
								/>
							</Col>
							<Col className='product__price' span={6}>
								${item.price}
							</Col>
						</Row>
					</Card>
				</Col>
			))}
			<Pagination
				current={params._page}
				defaultPageSize={params._limit}
				onShowSizeChange={(current, pageSize) =>
					setParams({ ...params, _limit: pageSize, _page: current })
				} // set limit product
				pageSizeOptions={[16, 32, 48]}
				onChange={(currentPage, pageSize) => {
					setParams({
						...params,
						_limit: pageSize,
						_page: currentPage,
					});
					setLoading(true);
				}}
				total={total}
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
