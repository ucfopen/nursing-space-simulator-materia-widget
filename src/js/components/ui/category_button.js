import React from "react";

export default props => {
	const { category, currentCategory, onClick } = props;
	const toUpper = word => word[0].toUpperCase() + word.substr(1);
	return (
		<button
			className={
				category == currentCategory
					? `active-category asset-category category-${category}`
					: `asset-category category-${category}`
			}
			data-category={category}
			onClick={onClick}>
			{toUpper(category)}
		</button>
	);
};
