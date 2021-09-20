/** @format */

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IoEyeSharp } from 'react-icons/io5';
import { HiShoppingBag } from 'react-icons/hi';
import { Tooltip, Rate } from 'antd';
import { toast } from 'react-toastify';
import './style.scss';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cart.action';

const ProductItem = ({ data }) => {
  let history = useHistory();
  let { id, name, rate, price, oldPrice, news, img } = data;
  const sales = oldPrice !== 0 && Math.ceil((1 - price / oldPrice) * 100);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    toast.success('Add cart success', {
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
    console.log(item);
    dispatch(
      addToCart({
        ...item,
        quantity: 1,
      })
    );
  };
  return (
    <div className="product-item">
      <div className="product-item__img">
        <Link to={`/product/${id}`} className="rotate-img">
          <img src={img[0]} alt="anh" />
          <img src={img[1]} alt="ANH" />
        </Link>
        <div className="product-item__widget">
          <span
            className="icon icon-round product-item__widget-icon"
            onClick={() => handleAddToCart(data)}
          >
            <Tooltip placement="top" title="ADD TO CARD">
              <HiShoppingBag />
            </Tooltip>
          </span>
          <span
            className="icon icon-round product-item__widget-icon"
            onClick={() => history.push(`/product/${id}`)}
          >
            <Tooltip placement="top" title="QUICKVIEW">
              <IoEyeSharp />
            </Tooltip>
          </span>
        </div>
        {news && <span className="product-item--new ">New</span>}
        {oldPrice !== 0 && <span className="product-item--new">Sale</span>}
        {oldPrice !== 0 && <span className="product-item--sale"> - {sales} %</span>}
      </div>
      <div className="product-item__content">
        <h3 className="product-item__name">{name}</h3>
        <div className="product-item__rate">
          <Rate disabled defaultValue={rate} />
        </div>
        <div className="product-item__price">
          <span className="product-item__price--new">{`$${price.toLocaleString()}`}</span>
          {oldPrice !== 0 && (
            <span className="product-item__price--old">{` $${oldPrice.toLocaleString()}`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
