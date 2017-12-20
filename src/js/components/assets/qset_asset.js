import React, { Component } from "react";
import AFRAME from "aframe";
import { Entity } from "aframe-react";

// Custom React Components
import Wall from "./wall";

export default props => {
	const { attributes, data, isSelected, mode, rotation, x, z } = props;
	const { onClick } = props;
	const yScaleFactor = data.category === "walls" ? data.scale.y / 2 : 0;
	const id = data.id;
	return id === "wall-1" || id === "window" || id == "door-1" ? (
		<Wall
			attributes={attributes}
			isSelected={isSelected}
			mode={mode}
			onClick={onClick}
			rotation={rotation}
			type={data.id}
			x={x}
			z={z}
		/>
	) : (
		<Entity
			events={{ click: onClick }}
			// If an assets contains an .mtl (defined in qset), aframe will use obj-model. Otherwise, aframe will use material src
			material={{ color: "green", opacity: 0.4 }}
			obj-model={
				isSelected
					? `obj: #${data.id}-obj;`
					: `obj: #${data.id}-obj;mtl: #${data.id}-mtl;`
			}
			/**
			 * The scale property grows an a-box in the +-y direction, but we want it to seem like the box is just growing in the +y direction.
			 *   To do this, the position of the box must be shifted upward half of the total scaling value.
			 */
			position={{ x, y: yScaleFactor, z }}
			primitive={data.tag}
			rotation={{ x: 0, y: props.rotation, z: 0 }}
			scale={data.scale}
		/>
	);
};
