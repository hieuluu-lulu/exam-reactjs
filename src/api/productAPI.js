/** @format */

import API from './configAPI';

class productAPI {
	constructor(url) {
		this.url = url;
	}
	getAll = (params) => {
		return API.get(this.url, { params });
	};
}
const ProductAPI = new productAPI('/product');

export default ProductAPI;
