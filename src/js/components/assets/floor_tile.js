import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default () => {
	return (
		<Entity
			primitive="a-plane"
			material="src: #ceilingTexture; repeat: 10 4; metalness: .15"
			position={{ x: "14.5", y: ".1", z: "5.5" }}
			rotation={{ x: "-90", y: "0", z: "0" }}
			height="12"
			width="30"
		/>
	);
};
