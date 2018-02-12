import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default props => {
	// attributes
	const {
		color,
		isSelected,
		metalness,
		mode,
		rotation,
		selectionColor,
		selectionOpacity,
		trimColor,
		x,
		y,
		z
	} = props;

	// functions
	const { onClick } = props;

	return (
		<Entity
			events={{ click: onClick }}
			position={{ x, y: 5, z }}
			rotation={{ x: -90, y: rotation, z: 0 }}>
			<Entity
				events={{ click: onClick }}
				geometry={{ primitive: "plane", height: 1, width: 1 }}
				material={
					isSelected && mode != "editAsset"
						? { color: selectionColor, opacity: selectionOpacity, side: "double" }
                        : { color: "#e8a26d", opacity: 1, side: "double" }
				}
                position={{ x: 0, y:0.6, z: 0 }}
                scale={{x: 0.6, y: 0.8, z: 1}}
			/>
            <Entity
                geometry={{ primitive: "triangle", vertices: "0 0 -2, 2 0 -2, 1 1 -2" }}
                material={
					isSelected && mode != "editAsset"
						? { color: selectionColor, opacity: selectionOpacity, side: "double" }
						: { color: "#e8a26d", opacity: 1, side: "double" }
				}
                position={{ x:-0.5, y: 0.9, z: 1 }}
                scale={{x: 0.5, y: 1, z: 0.5}}
            />
		</Entity>
	);
};
