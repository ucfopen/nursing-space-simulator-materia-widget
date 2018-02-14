import { Entity } from "aframe-react";
import React from "react";

export default props => {
	return (
		<Entity
			camera={{ active: props.active }}
			look-controls
			wasd-controls={{
				enabled: props.shortcutsEnabled,
				acceleration: 50
			}}
			position={props.position}
		/>
	);
};
