import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default props => {
	// attributes
	const {
		color,
		metalness,
		radius,
		rotation,
		scale,
		selectionColor,
		selectionOpacity,
		trimColor,
		x,
		z
	} = props;

	// functions
	const { onClick } = props;

	return (
		<Entity
			events={{ click: onClick }}
			position={{ x, y: 3.2, z }}
			rotation={{ x: -90, y: rotation, z: 0 }}
			scale={{ x:scale, y: scale, z: scale }}>
			<Entity
				events={{ click: onClick }}
				geometry={{ primitive: "plane", height: .8, width: .5 }}
				material={{ color: "#e8a26d", opacity: 1, side: "double" }}
				position={{ x: 0, y: radius + 1, z: 0 }}
			/>
			<Entity
				geometry={{ primitive: "triangle", vertices: "0 0 0, 2 0 0, 1 1 0" }}
				material={{ color: "#e8a26d", opacity: 1, side: "double" }}
				position={{ x:-0.55, y: radius + 1.25, z: 0 }}
				scale={{x: 0.55, y: 0.8}}
			/>
		</Entity>
	);
};
