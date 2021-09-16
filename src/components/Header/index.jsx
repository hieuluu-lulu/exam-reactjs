/** @format */

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Avatar, Row, Menu, Dropdown, Typography, Drawer, Button } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Input } from 'antd';
import logo from '../../assets/images/logo-full.svg';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { logoutAction } from '../../redux/actions';
import { FaShoppingCart } from 'react-icons/fa';
import empty from '../../assets/images/empty-cart.jpg';
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { deleteCart, updateCart } from '../../redux/actions/cart.action';
const { Search } = Input;
export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [visible, setVisible] = useState(false);
  const productCart = useSelector((state) => state.cart);
  const navMenu = [
    {
      id: 1,
      name: 'Home',
      path: '/',
    },
    {
      id: 2,
      name: 'Product',
      path: '/shop',
    },
    {
      id: 3,
      name: 'Shoping Cart',
      path: '/cart',
    },
    {
      id: 4,
      name: 'Checkout',
      path: '/payment',
    },
  ];
  const onSearch = (value) => {
    console.log(value);
  };
  const Logout = () => {
    dispatch(logoutAction());
    history.push('/login');
    toast.success('Logged out!', {
      position: toast.POSITION.TOP_RIGHT,
      theme: 'colored',
    });
  };

  const handleUpQuantity = (item) => {
    const type = 'increase';
    dispatch(updateCart({ type, item }));
  };
  const handleDownQuantity = (item) => {
    const type = 'decrease';
    dispatch(updateCart({ type, item }));
  };

  const deleteCartProduct = (item) => {
    dispatch(deleteCart(item));
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Typography onClick={Logout}>Logout</Typography>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="container header">
      <div className="grid header__nav">
        <div className="header__nav-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <Search
          placeholder="What are you looking for...."
          style={{
            width: '300px',
            display:
              location.pathname !== '/login' && location.pathname !== '/register'
                ? 'block'
                : 'none',
          }}
          allowClear
          enterButton="Search"
          size="medium"
          onSearch={onSearch}
        />
        <div className="header__nav-menu">
          {navMenu.map((item, index) => (
            <Link
              to={item.path}
              key={`link-${index + 1}`}
              className={location.pathname === item.path ? 'menu__item active' : 'menu__item'}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="header__nav-cart">
          <FaShoppingCart className="cart__icon" onClick={() => setVisible(true)} />
          <span className="cart__number">{productCart?.cartNumber}</span>
          <Drawer
            title="My Cart"
            width={420}
            placement="right"
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            getContainer={false}
            footer={
              <div className="drawer-footer">
                <div className="drawer-footer__total">
                  <span className="drawer-footer__total-text">Total</span>
                  <span className="drawer-footer__total-price">
                    {`${productCart?.totalCost.toLocaleString('vi-VN')} VNĐ`}
                  </span>
                </div>
                <Link to="/cart" onClick={() => setVisible(false)}>
                  <Button
                    shape="round"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    className="drawer-footer__btn"
                  >
                    Cart
                  </Button>
                </Link>
              </div>
            }
          >
            {productCart?.cartData.length > 0 ? (
              productCart?.cartData.map((item, index) => (
                <div className="cart-drawer" key={item.id + index}>
                  <div className="cart-drawer__product">
                    <img src={item?.img[0]} alt={item.name} className="cart-drawer__product-img" />
                    <div className="cart-drawer__product-desc">
                      <h3 className="desc__title">{item.name}</h3>
                      <span className="desc__price">{item.price.toLocaleString('vi-VN')}</span>
                      <div className="desc__quantity">
                        <Button icon={<MinusOutlined />} onClick={() => handleDownQuantity(item)} />
                        <span className="desc__quantity-number">{item.quantity}</span>
                        <Button icon={<PlusOutlined />} onClick={() => handleUpQuantity(item)} />
                      </div>
                    </div>
                  </div>
                  <DeleteOutlined
                    className="cart-drawer__delete"
                    onClick={() => deleteCartProduct(item)}
                  />
                </div>
              ))
            ) : (
              <div className="cart-drawer__empty">
                <img src={empty} alt="empty-cart" style={{ width: '100%' }} />
                <p>Your's cart is currently empty</p>
              </div>
            )}
          </Drawer>
        </div>
        <div className="header__nav-user">
          {!isLogin ? (
            <>
              <Link to="/register" className="user__btn">
                Sign Up
              </Link>
              <Link to="/login" className="user__btn">
                Login
              </Link>
            </>
          ) : (
            <Row align="middle">
              <Avatar
                size={48}
                style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginRight: '10px' }}
              >
                {user.user.firstname.charAt(0)}
              </Avatar>
              <Dropdown overlay={menu}>
                <Typography style={{ cursor: 'pointer' }}>
                  {user.user.firstname + ' ' + user.user.lastname}
                </Typography>
              </Dropdown>
            </Row>
          )}
        </div>
      </div>

      <ToastContainer autoClose={2500} />
    </div>
  );
}
