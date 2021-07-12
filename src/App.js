/** @format */

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Head from './components/Header/Header';
import SideBar from './components/Sidebar/Sidebar';
import ProductAPI from './api/productAPI';
import Product from './components/Content/Content';
import Bread from './components/Breadcrumb/Bread';
import { getCategories } from './utils/getCategories';

const { Header, Content, Sider } = Layout;

function App() {
	const [product, setProduct] = useState([]);
	const [total, setTotal] = useState(0);
	const [loadtime, setLoadtime] = useState('');
	const [params, setParams] = useState({ _limit: 16, _page: 1 });
	const [loading, setLoading] = useState(true);
	const [currentCategory, setCurrentCategory] = useState({});
	const [categories, setCategories] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [types, setTypes] = useState([]);
	const [brands, setBrands] = useState([]);

	console.log(currentCategory);
	useEffect(() => {
		(async function getProduct() {
			try {
				const { _limit, _page, ...param } = params;
				const startTime = new Date().getTime();
				const productLimit = await ProductAPI.getAll(params);
				const productAll = await ProductAPI.getAll(param);
				setLoadtime(new Date().getTime() - startTime);
				setProduct(productLimit);
				setTotal(productAll.length);

				setCategories(
					getCategories(productAll, categories, currentCategory)
						.categories,
				);
				setTypes(
					getCategories(productAll, categories, currentCategory)
						.types,
				);
				setBrands(
					getCategories(productAll, categories, currentCategory)
						.brands,
				);
				setTimeout(() => {
					setLoading(false);
				}, 300);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [params]);

	const onChangeFilter = (value) => {
		if (value === 'featured') {
			const { _sort, _order, ...param } = params;
			setParams({ ...param, _page: 1 });
			setLoading(true);
		} else {
			setParams({ ...params, _order: value, _sort: 'price', _page: 1 });
			setLoading(true);
		}
	};

	const onSearch = (value) => {
		setParams({ ...params, name_like: value });
	};
	const handleChangeCategories = (category) => {
		setCurrentCategory(category);
		setParams({ ...params, q: category.name });
		setIsVisible(true);
		if (category.isActive) {
			setParams({ ...params, q: '' });
		}
		if (category.level === 0 && category.isActive) {
			setParams({ ...params, q: '' });
			setIsVisible(false);

			// setCategories([]);
		}
	};
	return (
		<Layout>
			<Header className='header'>
				<Head onSearch={onSearch} />
			</Header>
			<Layout>
				<Sider
					width={260}
					className='site-layout-background sider'
					style={{ background: '#fff' }}>
					<SideBar
						setCurrentCategory={setCurrentCategory}
						isVisible={isVisible}
						setParams={setParams}
						categories={categories}
						handleChangeCategories={handleChangeCategories}
						setIsVisible={setIsVisible}
						types={types}
						brands={brands}
					/>
				</Sider>
				<Layout style={{ padding: '0 12px 12px' }}>
					<Bread
						total={total}
						loadtime={loadtime}
						onChangeFilter={onChangeFilter}
					/>
					<Content
						className='site-layout-background'
						style={{
							padding: 12,
							margin: 0,
							minHeight: 280,
						}}>
						<Product
							loading={loading}
							product={product}
							total={total}
							setParams={setParams}
							params={params}
							setLoading={setLoading}
						/>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}
export default App;
