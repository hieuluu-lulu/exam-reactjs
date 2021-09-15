import API from './axiosClient';

export const getProducts = (params) => API.get('/products', { params: params });
export const createProduct = (product) => API.post('/products', product);
export const updateProduct = (id) => API.patch(`/products/${id}`);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getProductSale = () => API.get('/products?sale=true');
export const getProductNew = () => API.get('/products?new=true');
