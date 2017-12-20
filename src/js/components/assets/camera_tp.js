import { Entity } from "aframe-react";
import "aframe-mouse-cursor-component";
import React, { Component } from "react";

export default props => {
	return (
		<Entity
			camera={{ active: props.active }}
			mouse-cursor
			position={props.position}
			rotation="270 0 0"
		/>
	);
};
