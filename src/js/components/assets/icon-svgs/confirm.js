import React from "react";

export default props => {
	return (
		<svg
			version="1.1"
			xmlns="http=//www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 125 125"
			enableBackground="new 0 0 125 125"
			width="55px"
			height="55px">
			<g id="Layer_9">
				{props.shortcutsEnabled ? (
					<rect x="82" y="72" width="35" height="35" rx="12" ry="12" fill="#fff" strokeWidth="2" stroke="#000" strokeWidth="3" strokeMiterlimit="10"/>
				): null}
				{props.shortcutsEnabled ? (
					<text fontSize="26px" fill="#000" fontFamily="Arial-BoldMT Arial" transform="translate(89 98)">Q</text>
				) : null}
				<polygon
					fill="#DC7627"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					points="119,33.2 100.4,14.7 45,70.2 23.5,48.7 5,67.2 26.4,88.7 26.4,88.7 45,107.2 45,107.2 45,107.2 63.5,88.7 63.5,88.7"
				/>
			</g>
		</svg>
	);
};
