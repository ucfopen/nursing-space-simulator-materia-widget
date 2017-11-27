import React from "react";

export default props => {
	return (
		<button
			className={props.category == props.curCategory ? "active-category asset-category" : "asset-category"}
			data-category={props.category}
			onClick={props.onClick}>
			{props.category}
		</button>
	);
};
