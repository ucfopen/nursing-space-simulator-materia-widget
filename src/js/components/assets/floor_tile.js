import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default () => {
	return (
		<Entity
			height="12"
			material="src: #ceilingTexture; repeat: 30 12; metalness: .15"
			position={{ x: "14.5", y: ".1", z: "5.5" }}
			primitive="a-plane"
			rotation={{ x: "-90", y: "0", z: "0" }}
			width="30"
		/>
	);
};
