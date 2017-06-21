import React from "react";

export default props => {
	return (
		<div className="button-container">
			<button
				className="asset"
				data-category={props.item.category}
				data-title={props.item.title}
				id={props.item.id}
				onClick={props.onClick}
				style={{
					background:
						"url(" + props.item.buttonSource + ") no-repeat center center",
					backgroundSize: "100% 100%"
				}}
			/>
			<div>{props.item.title}</div>
		</div>
	);
};
