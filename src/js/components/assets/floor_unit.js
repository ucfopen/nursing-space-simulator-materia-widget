import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";
import ReactDOM from "react-dom";

export default class FloorUnit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false
		};
	}

	onMouseEnter() {
		if (this.props.thirdPerson) this.setState({ active: true });
		else this.setState({ active: false });
	}

	onMouseLeave() {
		this.setState({ active: false });
	}

	render() {
		return (
			<Entity
				primitive="a-plane"
				material={this.state.active ? "color: red" : "color: white"}
				position={{ x: this.props.x, y: "0", z: this.props.y }}
				rotation={{ x: "-90", y: "0", z: "0" }}
				scale={{ x: "1", y: "1", z: "1" }}
				events={{
					click: this.props.onClick,
					mouseenter: [this.onMouseEnter.bind(this), this.props.onMouseEnter],
					mouseleave: this.onMouseLeave.bind(this)
				}}
				height="1"
				width="1"
			/>
		);
	}
}
