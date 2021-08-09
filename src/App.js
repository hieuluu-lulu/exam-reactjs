/** @format */

import store from './contextAPI/contextStore/store';
import { productReducer } from './contextAPI/contextReducer/productReducer';

import { useReducer } from 'react';
import Container from './components/Container/Container';

const initialState = {
	allProducts: [],
	productLimit: [],
	params: {},
	isFilter: false,
	isLoading: false,
	loadtime: 0,
	categories: [],
	types: [],
	brands: [],
	currentCategory: {},
	pagination: {
		currentPage: 1,
		total: 1,
		limit: 16,
	},
};

function App() {
	const [state, dispatch] = useReducer(productReducer, initialState);

	return (
		<store.Provider value={{ state: state, dispatch: dispatch }}>
			<Container />
		</store.Provider>
	);
}

export default App;
