import React from "react";

export default props => {
	return (
		props.visible
			? (
				<div id="selected-asset-tooltip">
					<span>
						{ props.text }
					</span>
				</div>
			)
			: null
	);
};
