import React from "react";

export default props => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 125 125"
			width="55px"
			height="55px">
			<g className="svg-icon" id="Layer_5">
				<path
					fill="none"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					d="M82.5,18.8H42.5c-2.8,0-5-2.3-5-5V8c0-2.8,2.3-5,5-5h39.9c2.8,0,5,2.3,5,5v5.8C87.5,16.6,85.2,18.8,82.5,18.8z"
				/>
				<path
					fill="#DC7627"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					d="M96.5,120H28.5c-4.2,0-7.6-3.4-7.6-7.6V19c0-4.2,3.4-7.6,7.6-7.6h68.1c4.2,0,7.6,3.4,7.6,7.6v93.4C104.2,116.6,100.7,120,96.5,120z"
				/>
				<rect
					x="12.2"
					y="9.3"
					fill="#DC7627"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					width="100.6"
					height="19"
				/>
				<rect
					x="33.5"
					y="35"
					fill="none"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					width="9.7"
					height="77"
				/>
				<rect
					x="57.7"
					y="35"
					fill="none"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					width="9.7"
					height="77"
				/>
				<rect
					x="81.8"
					y="35"
					fill="none"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					width="9.7"
					height="77"
				/>
				{props.shortcutsEnabled ? (
					<rect x="88" y="84" width="35" height="35" rx="12" ry="12" fill="#fff" strokeWidth="2" stroke="#000" strokeWidth="3" strokeMiterlimit="10"/>
				): null}
				{props.shortcutsEnabled ? (
					<text fontSize="26px" fill="#000" fontFamily="Arial-BoldMT Arial" transform="translate(97 111)">T</text>
				): null}
			</g>
		</svg>
	);
};
