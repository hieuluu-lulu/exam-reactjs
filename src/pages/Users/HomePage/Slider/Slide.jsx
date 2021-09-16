import React from 'react';
import Slider from 'react-slick';
import ProductItem from '../../../../components/Card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col } from 'antd';
import './style.scss';
export default function Slide({ data, type }) {
  const settings = {
    className: 'center',
    infinite: true,
    slidesToShow: type !== 'banner' ? 4 : 1,
    autoplay: true,
    swipe: true,
    arrows: true,
    slidesToScroll: 1,
    speed: 500,
    autoplaySpeed: 2500,
    cssEase: 'linear',
    centerPadding: '60px',
  };
  return (
    <div>
      <Slider {...settings}>
        {type !== 'banner'
          ? data.map((product, index) => (
              <Col sm={24} className="slide-product__col" key={`col-${product.id}-${index}`}>
                <ProductItem data={product}> </ProductItem>
              </Col>
            ))
          : data.map((product, index) => (
              <div key={`item-${index}`}>
                <img src={product} alt={`banner-${index}`} className="item-slide" />
              </div>
            ))}
      </Slider>
    </div>
  );
}
