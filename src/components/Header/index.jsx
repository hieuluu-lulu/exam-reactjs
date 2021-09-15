/** @format */

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Avatar, Row, Menu, Dropdown, Typography } from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Input } from 'antd';
import logo from '../../assets/images/logo-full.svg';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { logoutAction } from '../../redux/actions';
const { Search } = Input;
export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
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
    {
      id: 5,
      name: 'Contact',
      path: '/contact',
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
