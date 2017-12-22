import React from "react";

export default props => {
	const { item, onClick, selectedAsset } = props;
	return (
		<div className="button-container">
			<button
				className={
					selectedAsset && selectedAsset.id === item.id
						? `asset asset-selected-icon asset-${item.id}`
						: `asset asset-${item.id}`
				}
				data-category={item.category}
				data-title={item.title}
				id={item.id}
				onClick={() => onClick()}
				style={{
					background: `url(${item.buttonSource}) no-repeat center center`,
					backgroundSize: "100% 100%"
				}}
			/>
			<div>{item.title}</div>
		</div>
	);
};
