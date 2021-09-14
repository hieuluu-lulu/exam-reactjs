/** @format */

import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import { RiLoginBoxLine } from 'react-icons/ri';

import './style.scss';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../../../features/auth/authSlice';

export default function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(authActions.login(values));
  };
  return (
    <>
      <Row justify="center">
        <Col lg={10} sm={24} md={12}>
          <div className="login">
            <Form
              form={form}
              name="login-form"
              layout="vertical"
              onFinish={handleSubmit}
              className="login-form"
            >
              <div className="login-form__icon">
                <RiLoginBoxLine />
              </div>
              <h2 className="login-form__title">Login</h2>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'Email is not valid',
                  },
                  {
                    required: true,
                    message: 'Please enter your email',
                  },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    min: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  {
                    required: true,
                    message: 'Please enter your password',
                  },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
              <Form.Item style={{ justifyContent: 'flex-end', marginBottom: 0 }}>
                <Typography.Link href="#" style={{ float: 'right', marginBottom: '10px' }}>
                  Forgot Password
                </Typography.Link>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button htmlType="submit" className="form-login__btn ">
                  Login
                </Button>
              </Form.Item>
              <Form.Item
                style={{ margin: '10px 0', textAlign: 'center', width: '100%' }}
                wrapperCol={{
                  offset: 4,
                  span: 20,
                }}
              >
                <Link to="/register">
                  <Typography style={{ float: 'right' }}>
                    You dont have account ? Sign Up
                  </Typography>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
}
