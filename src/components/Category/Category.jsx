import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, getProduct } from '../../redux/actions';
import './style.scss';
export default function Category() {
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.product.brand);
  const params = useSelector((state) => state.product.params);
  const [isFilter, setIsFilter] = useState(false);
  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);
  const getProductByBrand = (id) => {
    dispatch(getProduct({ ...params, brandId: id }));
    setIsFilter(true);
  };
  const clearFilter = () => {
    const newParams = { ...params };
    delete newParams.brandId;
    dispatch(getProduct(newParams));
    setIsFilter(false);
  };
  return (
    <div className="brand">
      {brand.map((item) => (
        <div
          key={item.id}
          className={params.brandId === item.id ? 'brand__item active' : 'brand__item'}
          onClick={() => getProductByBrand(item.id)}
        >
          <img src={item.img} alt={item.name} />
        </div>
      ))}
      <div
        className="brand__item"
        style={{ display: isFilter ? 'block' : 'none' }}
        onClick={clearFilter}
      >
        Clear Filter
      </div>
    </div>
  );
}
