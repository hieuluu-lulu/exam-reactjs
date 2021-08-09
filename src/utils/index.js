/** @format */

export const getCategories = (data, categories, currentCategory) => {
	const childCategories = new Set();
	let types = data.reduce((obj, currentValue) => {
		if (currentCategory.level === 0 && !currentCategory.isActive) {
			const childCate = currentValue.hierarchicalCategories.lvl1?.split('>')[1].trim();
			if (childCate) childCategories.add(childCate);
		} else if (currentCategory.level === 1 && !currentCategory.isActive) {
			const childCate = currentValue.hierarchicalCategories.lvl2?.split('>')[2].trim();
			if (childCate) return childCategories.add(childCate);
		} else {
			childCategories.add(currentValue.hierarchicalCategories.lvl0);
		}

		if (!obj[currentValue.type]) {
			obj[currentValue.type] = 0;
		}
		obj[currentValue.type]++;
		return obj;
	}, {});

	let children = [...childCategories].slice(0, 10); //cat de lay 10 item
	types = Object.entries(types)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		//đưa key và value vào chung 1 mảng để lặp, tránh tình trạng xem key là initial value và value là current value
		.map(([key, value]) => {
			return { type: key, quantity: value, checked: false };
		});

	let brands = data.reduce((obj, category) => {
		if (!obj[category.brand]) {
			obj[category.brand] = 0;
		}
		obj[category.brand]++;
		return obj;
	}, {});
	brands = Object.entries(brands)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([key, value]) => {
			return { brand: key, quantity: value, checked: false };
		});

	if (Object.values(currentCategory).length === 0) {
		categories = children.map((category) => {
			return {
				name: category,
				level: 0,
				isActive: false,
			};
		});
	} else if (currentCategory.level === 0 && children.length) {
		children = children.map((category) => {
			return {
				name: category,
				level: 1,
				isActive: false,
			};
		});

		const indexChange = categories.findIndex(
			(cateItem) => cateItem.name === currentCategory.name, // tim` index cua item dc click
		);

		categories = categories.map((category) => {
			delete category.children;
			return {
				...category,
				isActive: false,
			};
		});

		categories[indexChange] = {
			...categories[indexChange],
			children: children,
			isActive: true,
		};

		if (currentCategory.isActive) {
			categories = categories.map((category) => {
				delete category.children;
				return {
					...category,
					isActive: false,
				};
			});
		}
	} else if (currentCategory.level === 1 && children.length) {
		const indexLv0 = categories.findIndex((cateItem) => cateItem.children);
		const indexLv1 = categories[indexLv0].children.findIndex(
			(cateItem) => cateItem.name === currentCategory.name,
		);
		children = children.map((item) => {
			return {
				name: item,
				level: 2,
				isActive: false,
			};
		});
		// tìm vị trí level 1 của level 0 và thêm children
		categories[indexLv0].children[indexLv1] = {
			...categories[indexLv0].children[indexLv1],
			children: children,
			isActive: true,
		};

		if (currentCategory.isActive) {
			categories[indexLv0].children[indexLv1].isActive = false;
		}
	}

	return { categories: categories, types, brands };
};
