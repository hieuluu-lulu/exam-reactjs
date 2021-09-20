import React, { useEffect } from 'react';
import { Breadcrumb, Row, Col, Checkbox, Select } from 'antd';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/actions';
import Category from '../../../components/Category/Category';
import ProductItem from '../../../components/Card';
import noProduct from '../../../assets/images/no-product.jpg';
const { Option } = Select;
export default function Product() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct({ _page: 1, _limit: 12 }));
  }, [dispatch]);
  const product = useSelector((state) => state.product.productData);
  const totalProduct = useSelector((state) => state.product.pagination.total);
  const params = useSelector((state) => state.product.params);
  const filterProduct = (e, type) => {
    if (e.target.checked && type === 'sale') {
      dispatch(getProduct({ ...params, sale: e.target.checked }));
    } else if (e.target.checked && type === 'news') {
      dispatch(getProduct({ ...params, news: e.target.checked }));
    } else {
      const newParams = { ...params };
      if (type === 'sale') {
        delete newParams.sale;
        dispatch(getProduct(newParams));
      } else {
        delete newParams.news;
        dispatch(getProduct(newParams));
      }
    }
  };
  const handleSortChange = (value) => {
    const newParams = { ...params };
    if (value === 'default') {
      delete newParams._sort;
      delete newParams._order;
      dispatch(getProduct(newParams));
    } else {
      dispatch(getProduct({ ...params, _sort: 'price', _order: value }));
    }
  };
  return (
    <div className="product">
      <div className="product__bread">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Smart Phone</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Category />
      <div className="product__list">
        <div className="product__list-filter">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="filter__title">{totalProduct} SmartPhone</h2>
            <div className="filter__list">
              <Checkbox
                className="filter__list-checkbox"
                onChange={(e, type) => filterProduct(e, (type = 'sale'))}
              >
                Sale
              </Checkbox>
              <Checkbox
                className="filter__list-checkbox"
                onChange={(e, type) => filterProduct(e, (type = 'news'))}
              >
                New
              </Checkbox>
            </div>
          </div>
          <div className="filter__order">
            <Select defaultValue="default" style={{ width: 130 }} onChange={handleSortChange}>
              <Option value="default">Default</Option>
              <Option value="desc">Desc</Option>
              <Option value="asc">Asc</Option>
            </Select>
          </div>
        </div>
        <Row gutter={[0, 16]}>
          {product.length > 0 ? (
            product.map((item) => (
              <Col lg={6} key={item.id}>
                <ProductItem data={item} />
              </Col>
            ))
          ) : (
            <img src={noProduct} alt="no-product" style={{ margin: ' 0 auto' }} />
          )}
        </Row>
      </div>
    </div>
  );
}
