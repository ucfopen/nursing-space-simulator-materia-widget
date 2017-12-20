import { Entity } from "aframe-react";
import React from "react";

export default props => {
	return (
		<Entity
			camera={{ active: props.active }}
			look-controls
			position={props.position}
			wasd-controls
		/>
	);
};
