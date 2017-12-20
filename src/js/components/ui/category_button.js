import React from "react";

export default props => {
	const { category, currentCategory, onClick } = props;
	const toUpper = word => word[0].toUpperCase() + word.substr(1);
	return (
		<button
			className={
				category == currentCategory
					? "active-category asset-category"
					: "asset-category"
			}
			data-category={category}
			onClick={onClick}>
			{toUpper(category)}
		</button>
	);
};
