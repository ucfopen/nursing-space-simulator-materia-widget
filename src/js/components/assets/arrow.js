import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

// Custom React Components
import ArrowPrimitive from "./primitive_assets/arrow";

export default props => {
	const { onClick, radius, rotation, scale, x, z } = props;
	const defaultProps = {
		color: "#d08751",
		onClick,
		radius,
		rotation,
		scale,
		selectionColor: "#e8a26d",
		x,
		z
	};

	return <ArrowPrimitive {...defaultProps} />;
};
