/** @format */
import React from 'react';
import './style.scss';
import { Card, Row, Col, Rate } from 'antd';

const { Meta } = Card;
export default function Cards({ product }) {
	return (
		<Col span={6} xs={24} sm={24} md={12} lg={6} xl={6} key={product.objectID}>
			<Card
				className='product'
				hoverable
				cover={<img alt={product.name} src={product.image} className='product__img' />}>
				<Meta title={product.name} className='product__title' />
				<Row gutter={[8, 8]} className='product__bottom'>
					<Col span={18}>
						<Rate disabled value={product.rating} className='product__rating' />
					</Col>
					<Col className='product__price' span={6}>
						${product.price}
					</Col>
				</Row>
			</Card>
		</Col>
	);
}
