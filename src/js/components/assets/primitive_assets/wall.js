import AFRAME from 'aframe'
import { Entity } from 'aframe-react'
import React from 'react'

export default props => {
	// attributes
	const {
		x,
		y,
		z,
		rotation,
		selectionColor,
		selectionOpacity,
		color,
		trimColor,
		metalness,
		mode,
		isSelected
	} = props

	// functions
	const { onClick, processStickers } = props

	/*
	Structure:
	Entity to set position
		wall
		trim
	*/

	return (
		<Entity
			events={{ click: onClick }}
			position={{ x, y: 0, z }}
			rotation={{ x: 0, y: rotation, z: 0 }}
		>
			<Entity
				events={{ click: onClick }}
				geometry={{ primitive: 'box', height: 3, width: 1, depth: 1 }}
				material={
					isSelected && mode != 'editAsset'
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, opacity: 1, metalness }
				}
				position={{ x: 0, y: 1.5, z: 0 }}
			/>
			<Entity
				primitive="a-box"
				width="1.025"
				height="1.025"
				depth=".35"
				material={
					isSelected && mode != 'editAsset'
						? { color: selectionColor, opacity: selectionOpacity }
						: { color: trimColor, opacity: 1 }
				}
				position={{ x: 0, y: 0.15, z: 0 }}
				rotation={{ x: -90 }}
			/>
			{processStickers()}
		</Entity>
	)
}
