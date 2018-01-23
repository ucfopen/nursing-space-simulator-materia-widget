import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";
import "aframe-mouse-cursor-component";

export default class CameraTP extends React.Component {
	render() {
		return (
			<Entity
				camera={{ active: this.props.active }}
				rotation="-90 180 90"
				position={this.props.position}
				mouse-cursor
			/>
		);
	}
}
