import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

// Custom React Components
import ArrowPrimitive from "./primitive_assets/arrow";

export default class Arrow extends Component {

	render() {
		const { isSelected, mode, onClick, rotation, type, x, y, z } = this.props;
		const defaultProps = {
			color: "#f9d9c2",
			isSelected,
			metalness: 0.4,
			mode,
			onClick,
			rotation,
			selectionColor: "green",
			selectionOpacity: 0.4,
			trimColor: "#7c695b",
			x,
			y,
			z
		};

		return <ArrowPrimitive {...defaultProps} />;
	}
}
