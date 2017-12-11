import React, { Component } from "react";
import AFRAME from "aframe";
import { Entity } from "aframe-react";
import Wall from "./wall";

export default props => {
	const yScaleFactor = props.data.category === "walls"
		? props.data.scale.y / 2
		: 0;
	const id = props.data.id;
	return (
		(id === 'wall-1' || id === 'window' || id == 'door-1') ?
			<Wall
				onClick={props.onClick}
				isSelected={props.isSelected}
				x={props.x}
				z={props.z}
				rotation={props.rotation}
				type={props.data.id}
			/> :
			<Entity
				events={{ click: props.onClick }}
				primitive={props.data.tag}
				// If an assets contains an .mtl (defined in qset), aframe will use obj-model. Otherwise, aframe will use material src
				material={{ color: "green", opacity: 0.4}}
				obj-model={
					props.isSelected
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
