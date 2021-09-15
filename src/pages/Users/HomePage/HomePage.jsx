/** @format */

import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import './style.scss';
import { useDispatch } from 'react-redux';
import { getProductSale } from '../../../redux/actions';
export default function HomePage() {
  const imgSlide = [
    'https://cdn.mobilecity.vn/mobilecity-vn/images/2021/07/oneplus-8-mobilecity.jpg',
    'https://cdn.mobilecity.vn/mobilecity-vn/images/2021/07/oneplus-9r-banner-mobilecity.jpg',
    'https://cdn.mobilecity.vn/mobilecity-vn/images/2021/07/poco-x3-pro-dgw.jpg',
  ];
  const Carousels = () => {
    return (
      <Carousel autoplay easing>
        {imgSlide.map((item, index) => (
          <div key={`item-${index}`}>
            <img src={item} alt={`banner-${index}`} className="item-slide" />
          </div>
        ))}
      </Carousel>
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductSale());
  }, [dispatch]);
  return (
    <div className="home">
      <Carousels />
      <h1>HomePage</h1>
    </div>
  );
}
