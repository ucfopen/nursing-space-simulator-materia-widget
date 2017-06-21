import React, { Component } from "react";
import AFRAME from "aframe";
import { Entity } from "aframe-react";

export default props => {
	const yScaleFactor = props.data.category === "walls"
		? props.data.scale.y / 2
		: 0;
	return (
		<Entity
			events={{ click: props.onClick }}
			primitive={props.data.tag}
			// If an assets contains an .mtl (defined in qset), aframe will use obj-model. Otherwise, aframe will use material src
			material={{
				color: props.data.defaultColor
			}}
			obj-model={
				props.assetSelected
					? "obj: #" + props.data.id + "-obj;"
					: "obj: #" +
							props.data.id +
							"-obj;" +
							"mtl: #" +
							props.data.id +
							"-mtl;"
			}
			/** 
                * The scale property grows an a-box in the +-y direction, but we want it to seem like the box is just growing in the +y direction. 
                *   To do this, the position of the box must be shifted upward half of the total scaling value.
                */
			position={{ x: props.x, y: yScaleFactor, z: props.z }}
			rotation={{ x: 0, y: props.rotation, z: 0 }}
			scale={props.data.scale}
		/>
	);
};
