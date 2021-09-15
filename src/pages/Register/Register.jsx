/** @format */

import React from 'react';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import 'react-toastify/dist/ReactToastify.css';
import { SiGnuprivacyguard } from 'react-icons/si';
import './style.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAction } from '../../redux/actions';
export default function Signup() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(registerAction(values));
  };

  return (
    <Row justify="center">
      <Col lg={10} sm={24} md={12}>
        <div className="login">
          <Form
            form={form}
            name="register-form"
            layout="vertical"
            onFinish={handleSubmit}
            className="login-form"
          >
            <div className="login-form__icon">
              <SiGnuprivacyguard />
            </div>
            <h2 className="login-form__title">Register</h2>
            <Form.Item
              label="First name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Firstname is required',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              label=" Last name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Lastname is required',
                  whitespace: true,
                },
              ]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Invalid email address',
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
                  message: 'Password must be at least 6 characters long',
                },
                {
                  required: true,
                  message: 'Please enter your password',
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="form-login__btn">
                Register
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center', width: '100%' }}>
              <Link to="/login">
                <Typography
                  style={{ float: 'right' }}
                >{`You already have an account ? Login`}</Typography>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}
