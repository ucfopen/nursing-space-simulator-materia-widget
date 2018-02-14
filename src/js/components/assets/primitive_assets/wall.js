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
		wall
		trim
	*/

	return (
		<Entity
			events={{ mouseup: onClick }}
			position={{ x, y: 0, z }}
			rotation={{ x: 0, y: rotation, z: 0 }}>
			<Entity
				geometry={{ depth: 1, height: 3, primitive: "box", width: 1 }}
				material={
					isSelected && mode != "editAsset"
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, metalness, opacity: 1 }
				}
				position={{ x: 0, y: 1.5, z: 0 }}
			/>
			<Entity
				depth=".35"
				height="1.025"
				material={
					isSelected && mode != "editAsset"
						? { color: selectionColor, opacity: selectionOpacity }
						: { color: trimColor, opacity: 1 }
				}
				position={{ x: 0, y: 0.15, z: 0 }}
				primitive="a-box"
				rotation={{ x: -90 }}
				width="1.025"
			/>
			{processStickers()}
		</Entity>
	);
};
