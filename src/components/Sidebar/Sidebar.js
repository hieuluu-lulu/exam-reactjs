/** @format */

import React, { useState } from 'react';
import { Collapse, Button, Checkbox } from 'antd';
import './style.scss';

const { Panel } = Collapse;

const mapMenu = (categories, handleChangeCategories) => {
	return categories.map((item, i) => (
		<Collapse
			activeKey={item.isActive ? i : ''}
			ghost
			key={i}
			onChange={() => handleChangeCategories(item)}
			style={{ padding: 0 }}>
			<Panel
				header={
					<span
						style={{
							fontWeight: item.isActive ? 600 : 400,
						}}
						className='sidebar__list'>
						{item.name}
					</span>
				}
				key={i}
				forceRender={true}
				destroyInactivePanel={true}>
				{/* đệ quy nếu như có thèn item.children */}
				{item.children &&
					mapMenu(item.children, handleChangeCategories)}
			</Panel>
		</Collapse>
	));
};

const SideBar = ({
	categories,
	setParams,
	params,
	isVisible,
	handleChangeCategories,
	setCurrentCategory,
	setIsVisible,
	types,
	brands,
}) => {
	const [checked, setChecked] = useState(false);
	const handleClearFilter = () => {
		setParams({ _page: 1, _limit: 16 });
		setCurrentCategory({});
		setIsVisible(false);
	};
	const handleChangeType = (e) => {
		if (e.target.checked) {
			setParams({ ...params, q: e.target.value });
			setIsVisible(true);
		} else {
			setParams({ ...params, q: '' });
			setIsVisible(false);
		}

		// console.log(e.target.checked);
	};
	return (
		<>
			<Button
				style={{
					display: isVisible ? 'block' : 'none',
					width: '200px',
					margin: ' 15px auto 0',
					fontSize: 16,
					textAlign: 'center',
				}}
				onClick={() => handleClearFilter()}
				size='large'>
				Clear Filter
			</Button>
			<h1 className='sidebar__heading'>Show result for</h1>
			{mapMenu(categories, handleChangeCategories)}
			<h1 className='sidebar__heading'>Refine by</h1>
			<h2 className='sidebar__type'>Types</h2>

			{types.map((value, index) => (
				<div className='sidebar__checkbox'>
					<Checkbox
						value={value.type}
						onChange={handleChangeType}
						key={index}>
						{value.type}({value.quantity})
					</Checkbox>
				</div>
			))}
			<h2 className='sidebar__type'>Brands</h2>

			{brands.map((value, index) => (
				<div className='sidebar__checkbox'>
					<Checkbox key={value.type}>
						{value.type}({value.quantity})
					</Checkbox>
				</div>
			))}
		</>
	);
};

export default SideBar;
