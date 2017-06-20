import React from "react";

export default props => {
	return (
		<button
			className="asset-category"
			data-category={props.category}
			onClick={props.onClick}>
			{props.category}
		</button>
	);
};
