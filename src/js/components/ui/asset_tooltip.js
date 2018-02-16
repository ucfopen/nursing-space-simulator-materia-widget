import React from "react";

export default props => {
	return (
		// currently hides errror tooltips on touchscreen devices
		props.visible && ! (props.className == "error" && window.IS_TOUCHSCREEN)
			? (
				<div id="selected-asset-tooltip">
					<span className={props.className}>
						{ props.text }
					</span>
				</div>
			)
			: null
	);
};
