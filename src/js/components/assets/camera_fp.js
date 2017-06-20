import React from "react";
import { Entity } from "aframe-react";

export default props => {
	return (
		<Entity
			camera={{ active: props.active }}
			position={props.position}
			look-controls
			wasd-controls
		/>
	);
};
