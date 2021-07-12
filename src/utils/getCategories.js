/** @format */

export const getCategories = (data, oldCategories, currentCategory) => {
	//Day la phan slice data
	const childCategories = new Set();
	let types = data.reduce((obj, category) => {
		if (currentCategory.level === 0 && !currentCategory.isActive) {
			const childItem = category.hierarchicalCategories.lvl1
				?.split('>')[1]
				.trim();
			if (childItem) childCategories.add(childItem);
		} else if (currentCategory.level === 1 && !currentCategory.isActive) {
			const childItem = category.hierarchicalCategories.lvl2
				?.split('>')[2]
				.trim();

			if (childItem) childCategories.add(childItem);
		} else {
			childCategories.add(category.hierarchicalCategories.lvl0);
		}
		//kiểm tra nếu như object chưa có type để tránh bị trùng lặp lại type
		if (!obj[category.type]) {
			obj[category.type] = 0;
		}
		obj[category.type]++;
		return obj;
	}, {});

	let children = [...childCategories].slice(0, 10); //cat de lay 10 item
	// biến cái type thành array rồi map lấy 5 thèn đầu tiền từ lớn đến nhỏ
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
			return { type: key, quantity: value, checked: false };
		});

	if (Object.keys(currentCategory).length === 0) {
		oldCategories = children.map((category) => {
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

		const indexChange = oldCategories.findIndex(
			(cateItem) => cateItem.name === currentCategory.name, // tim` index cua item dc click
		);

		oldCategories = oldCategories.map((category) => {
			delete category.children;
			return {
				...category,
				isActive: false,
			};
		});

		oldCategories[indexChange] = {
			...oldCategories[indexChange],
			children: children,
			isActive: true,
		};

		if (currentCategory.isActive) {
			oldCategories = oldCategories.map((category) => {
				delete category.children;
				return {
					...category,
					isActive: false,
				};
			});
		}
	} else if (currentCategory.level === 1 && children.length) {
		const indexLv0 = oldCategories.findIndex(
			(cateItem) => cateItem.children,
		);
		const indexLv1 = oldCategories[indexLv0].children.findIndex(
			(cateItem) => cateItem.name === currentCategory.name,
		);
		children = children.map((item) => {
			return {
				name: item,
				level: 2,
				isActive: false,
			};
		});

		oldCategories[indexLv0].children[indexLv1] = {
			...oldCategories[indexLv0].children[indexLv1],
			children: children,
			isActive: true,
		};

		if (currentCategory.isActive) {
			oldCategories[indexLv0].children[indexLv1].isActive = false;
		}
	}

	return { categories: oldCategories, types, brands };
};
