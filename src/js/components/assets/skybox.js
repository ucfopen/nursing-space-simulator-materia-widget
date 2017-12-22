import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default props => {
	if (props.thirdPerson === true)
		return (
			<Entity
				src="../../../assets/third_person_background.png"
				primitive="a-sky"
			/>
		);

	return (
		<Entity
			src="../../../assets/first_person_background.jpg"
			primitive="a-sky"
		/>
	);
};
