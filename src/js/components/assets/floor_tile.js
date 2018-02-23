import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default () => {
	const repeatString = "" + (window.GRID_COLS / 3) + " " + (window.GRID_ROWS / 3);
	return (
		<Entity
			height={window.GRID_ROWS}
			material={{
				src: "#ceilingTexture",
				repeat: repeatString,
				metalness: .15
			}}
			position={{
				x: window.GRID_COLS / 2 - 0.5,
				y: ".1",
				z: window.GRID_ROWS / 2 - 0.5
			}}
			primitive="a-plane"
			rotation={{ x: "-90", y: "0", z: "0" }}
			width={window.GRID_COLS}
		/>
	);
};
