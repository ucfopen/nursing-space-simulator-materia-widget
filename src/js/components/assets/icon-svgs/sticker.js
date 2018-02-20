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
				<path
					stroke="none"
					fill="#FFFFFF"
					d="M54.46,96,26,83.76C19.91,81.16,15,74.08,15,68V39.54c0-6.05,5-8.87,11-6.27l28.5,12.25c6.05,2.6,11,9.68,11,15.73v28.5C65.46,95.79,60.51,98.62,54.46,96Z"
					transform="translate(-6.48 -2.23)"
				/>

				<path
					stroke="#000000"
					strokeWidth="3"
					strokeDasharray="4 4"
					fill="none"
					d="M51.59,89.7,28.83,79.91C24,77.84,20,72.18,20,67.35V44.59c0-4.83,4-7.09,8.79-5l22.76,9.78c4.83,2.08,8.79,7.73,8.79,12.56V84.69C60.38,89.52,56.42,91.78,51.59,89.7Z"
					transform="translate(-6.48 -2.23)"
				/>
				{props.shortcutsEnabled ? (
					<rect x="88" y="87" width="35" height="35" rx="12" ry="12" fill="#fff" strokeWidth="2" stroke="#000" strokeWidth="3" strokeMiterlimit="10"/>
				): null}
				{props.shortcutsEnabled ? (
					<text fontSize="26px" fill="#000" fontFamily="Arial-BoldMT Arial" transform="translate(97 114)">V</text>
				): null}
			</g>
		</svg>
	);
};
