import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

export default class ArrowPrimitive extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	onMouseEnter() {
		this.setState({ active: true });
	}

	onMouseLeave() {
		this.setState({ active: false });
	}

	render () {
		// attributes
		const {
			color,
			radius,
			rotation,
			scale,
			selectionColor,
			x,
			z
		} = this.props;

		// functions
		const { onClick } = this.props;

		return (
			<Entity
				events={{
					click: onClick,
					mouseenter: this.onMouseEnter.bind(this),
					mouseleave: this.onMouseLeave.bind(this)
				}}
				position={{ x, y: 3.2, z }}
				rotation={{ x: -90, y: rotation, z: 0 }}
				scale={{ x:scale, y: scale, z: scale }}>
				<Entity
					geometry={{ primitive: "plane", height: .8, width: .5 }}
					material={
						this.state.active
							? { color: selectionColor, opacity: 1, side: "double" }
							: { color: color, opacity: 1, side: "double" }
					}
					position={{ x: 0, y: radius + 1, z: 0 }}
				/>
				<Entity
					geometry={{ primitive: "triangle", vertices: "0 0 0, 2 0 0, 1 1 0" }}
					material={
						this.state.active
							? { color: selectionColor, opacity: 1, side: "double" }
							: { color: color, opacity: 1, side: "double" }
					}
					position={{ x:-0.55, y: radius + 1.25, z: 0 }}
					scale={{x: 0.55, y: 0.8}}
				/>
			</Entity>
		);
	}
}
