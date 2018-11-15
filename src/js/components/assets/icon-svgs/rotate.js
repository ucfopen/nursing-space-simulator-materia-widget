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
			<g id="Layer_2">
				<path
					fill="#DC7627"
					stroke="#000000"
					strokeWidth="3"
					strokeMiterlimit="10"
					d="M69.8,10.4v21.3c16.8,0.4,30.3,14.1,30.3,31c0,17.1-13.9,31-31,31c-16.6,0-30.2-13.1-31-29.6h13.1L27.5,32.9L3.8,64.2h13.2c0.9,28,23.8,50.4,52,50.4c28.8,0,52.1-23.3,52.1-52.1C121.2,34,98.2,10.8,69.8,10.4z"
				/>
				{props.shortcutsEnabled ? (
					<rect
						x="86"
						y="76"
						width="35"
						height="35"
						rx="12"
						ry="12"
						fill="#fff"
						strokeWidth="2"
						stroke="#000"
						strokeWidth="3"
						strokeMiterlimit="10"
					/>
				) : null}
				{props.shortcutsEnabled ? (
					<text
						fontSize="26px"
						fill="#000"
						fontFamily="Arial-BoldMT Arial"
						transform="translate(93 102)">
						R
					</text>
				) : null}
			</g>
		</svg>
	);
};
