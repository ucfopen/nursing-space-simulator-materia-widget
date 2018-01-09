import React from "react";

export default props => {
	return (
		<span
			className={props.showTooltip ? null : "hidden"}
			id="selected-asset-tooltip">
			{props.toolTipText}
		</span>
	);
};
