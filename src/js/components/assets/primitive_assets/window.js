import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default props => {
	// attributes
	const {
		color,
		isSelected,
		metalness,
		mode,
		rotation,
		selectionColor,
		selectionOpacity,
		trimColor,
		x,
		y,
		z
	} = props;

	// functions
	const { onClick, processStickers } = props;

	/*
	Structure:
	Entity to set position
		top
		window
		bottom
		trim
	*/

	return (
		<Entity
			position={{ x, y: 0, z }}
			events={{ click: onClick }}
			rotation={{ x: 0, y: rotation, z: 0 }}>
			<Entity
				geometry={{ primitive: "box", height: 0.65, width: 1, depth: 1 }}
				material={
					isSelected
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, metalness, opacity: 1 }
				}
				position={{ x: 0, y: 2.675, z: 0 }}
			/>
			<Entity
				geometry={{ depth: 0.1, height: 1.4, primitive: "box", width: 1 }}
				material={{ color: "white", opacity: 0.25 }}
				position={{ x: 0, y: 1.65, z: 0 }}
			/>
			<Entity
				geometry={{ depth: 1, height: 0.95, primitive: "box", width: 1 }}
				material={
					isSelected
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, metalness, opacity: 1 }
				}
				position={{ x: 0, y: 0.475, z: 0 }}
			/>
			<Entity
				depth=".35"
				height="1.025"
				material={
					isSelected
						? { color: selectionColor, opacity: selectionOpacity }
						: { color: trimColor, opacity: 1 }
				}
				position={{ x: 0, y: 0.15, z: 0 }}
				primitive="a-box"
				rotation={{ x: -90 }}
				width="1.025"
			/>
		</Entity>
	);
};
