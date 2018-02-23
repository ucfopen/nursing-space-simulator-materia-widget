import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default props => {
	const repeatString = "" + (window.GRID_COLS) + " " + (window.GRID_ROWS);
	return props.thirdPerson ? null : (
		<Entity
			height={window.GRID_ROWS}
			material={{
				src: "#ceilingTexture",
				repeat: repeatString,
				metalness: .15
			}}
			position={{
				x: window.GRID_COLS / 2 - 0.5,
				y: "3",
				z: window.GRID_ROWS / 2 - 0.5 }}
			primitive="a-plane"
			rotation={{ x: "90", y: "0", z: "0" }}
			width={window.GRID_COLS}
		/>
	);
};
