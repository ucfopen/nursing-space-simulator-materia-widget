import React from "react";

export default props => {
	return (
		<svg
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			viewBox="0 0 125 125"
			enableBackground="new 0 0 125 125"
			width="55px"
			height="55px">
			<g id="Layer_9">
				<polygon
					fill="#DC7627"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					points="104.77 114.05 104.77 28.66 37.04 1.52 1.52 3.68 2.52 92.18 64.98 118.27 104.77 114.05"
				/>
				<polyline
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					fill="#DC7627"
					points="65.16 116.69 65.16 33.69 105.17 30.08"/>
				<line
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					x1="1.91"
					y1="5.1"
					x2="65.16"
					y2="33.69"
				/>
				{props.shortcutsEnabled ? (
					<rect x="88" y="87" width="35" height="35" rx="12" ry="12" fill="#fff" strokeWidth="2" stroke="#000" strokeWidth="3" strokeMiterlimit="10"/>
				): null}
				{props.shortcutsEnabled ? (
					<text fontSize="26px" fill="#000" fontFamily="Arial-BoldMT Arial" transform="translate(97 114)">E</text>
				): null}
				<polygon
					fill="#FFFFFF"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					points="98.52 90.61 73.38 54.46 73.38 66.04 8.56 37.65 8.56 64.77 73.38 93.16 73.38 104.74 98.52 90.61"
				/>

			</g>
		</svg>
	);
};
