import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

export default props => {
	const stickerType = props.id;
	return (
		<Entity
			primitive="a-obj-model"
			material={{ color: "green", opacity: 0.4}}
			obj-model={
				props.isSelected
					? "obj: #" + stickerType + "-obj;"
					: "obj: #" +
						stickerType +
						"-obj;" +
						"mtl: #" +
						stickerType +
						"-mtl;"
			}
			position={{ x: 0, y: 0, z: 0 }}
			scale={{ x: 0.25, y: 0.25, z: 0.25 }}
			rotation={{ y: props.rotation }}
		/>
	)
};
