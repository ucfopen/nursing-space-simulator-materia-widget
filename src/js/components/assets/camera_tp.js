import React, { Component } from "react";
import { Entity } from "aframe-react";
import "aframe-mouse-cursor-component";

export default props => {
	return (
		<Entity
			camera={{ active: props.active }}
			rotation="270 0 0"
			position={props.position}
			mouse-cursor
		/>
	);
};
