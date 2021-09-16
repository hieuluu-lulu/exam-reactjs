/** @format */

import React, { useEffect } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProductNew, getProductSale } from '../../../redux/actions';
import { Row, Col, Spin } from 'antd';
import Slide from './Slider/Slide';
import ProductItem from '../../../components/Card';
export default function HomePage() {
  const imgSlide = [
    'https://cdn.mobilecity.vn/mobilecity-vn/images/2021/07/oneplus-8-mobilecity.jpg',
    'https://cdn.mobilecity.vn/mobilecity-vn/images/2021/07/oneplus-9r-banner-mobilecity.jpg',
    'https://cdn.mobilecity.vn/mobilecity-vn/images/2021/07/poco-x3-pro-dgw.jpg',
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductSale());
    dispatch(getProductNew());
  }, [dispatch]);
  const productSale = useSelector((state) => state.product.productSale);
  const productNew = useSelector((state) => state.product.productNew);
  const load = useSelector((state) => state.product.load);
  return (
    <div className="home">
      <Slide data={imgSlide} type="banner"></Slide>
      {!load ? (
        <>
          <section className="home__sale">
            <h1 className="home__sale-title">Hot Sale Product</h1>
            <div className="home__sale-slide">
              <Slide data={productSale} type="product" />
            </div>
          </section>
          <section className="home__new">
            <h1 className="home__sale-title">New Product</h1>
            <Row gutter={[0, 16]}>
              {productNew.slice(0, 8).map((product, index) => (
                <Col key={`col-${index}`} lg={6}>
                  <ProductItem data={product} />
                </Col>
              ))}
            </Row>
          </section>
        </>
      ) : (
        <Spin
          tip="Loading..."
          size="large"
          style={{
            display: 'block',
            fontSize: '20px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
      )}
    </div>
  );
}
