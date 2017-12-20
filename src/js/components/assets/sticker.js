import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

export default props => {
	const stickerType = props.id;
	const { isSelected, rotation } = props;
	return (
		<Entity
			material={{ color: "green", opacity: 0.4 }}
			obj-model={
				isSelected
					? `obj: #${stickerType}-obj;`
					: `obj: #${stickerType}-obj;mtl: #${stickerType}-mtl;`
			}
			position={{ x: 0, y: 0, z: 0 }}
			rotation={{ y: rotation }}
			scale={{ x: 0.25, y: 0.25, z: 0.25 }}
		/>
	);
};
