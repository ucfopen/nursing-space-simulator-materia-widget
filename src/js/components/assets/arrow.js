import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

// Custom React Components
import ArrowPrimitive from "./primitive_assets/arrow";

export default class Arrow extends Component {

	render() {
		const { isSelected, mode, onClick, radius, rotation, type, x, z } = this.props;
		const defaultProps = {
			color: "#f9d9c2",
			metalness: 0.4,
			onClick,
			radius,
			rotation,
			selectionColor: "green",
			selectionOpacity: 0.4,
			trimColor: "#7c695b",
			x,
			z
		};

		return <ArrowPrimitive {...defaultProps} />;
	}
}
