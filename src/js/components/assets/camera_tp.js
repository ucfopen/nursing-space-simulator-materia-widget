import { Entity } from "aframe-react";
import "aframe-mouse-cursor-component";
import React, { Component } from "react";

export default props => {
	return (
		<Entity
			id="cameratp"
			camera={{ active: props.active }}
			mouse-cursor
			wasd-controls={{
				enabled: (
					props.shortcutsEnabled &&
					props.mode != "manipulation" &&
					props.mode != "editAsset"
				),
				acceleration: 100
			}}
			position={props.position}
			rotation="270 0 0"
		/>
	);
};
