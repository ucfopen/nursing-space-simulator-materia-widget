import AFRAME from 'aframe'
import { Entity } from 'aframe-react'
import React from 'react'

export default props => {
	// attributes
	let {
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
	let { onClick, processStickers } = props

	/*
	Structure:
	Entity to set position
		top
		window
		bottom
		trim
	*/

	return (
		<Entity
			position={{ x, y: 0, z }}
			events={{ click: onClick }}
			rotation={{ x: 0, y: rotation, z: 0 }}
		>
			<Entity
				geometry={{ primitive: 'box', height: 0.65, width: 1, depth: 1 }}
				material={
					isSelected
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, opacity: 1, metalness }
				}
				position={{ x: 0, y: 2.675, z: 0 }}
			/>
			<Entity
				geometry={{ primitive: 'box', height: 1.4, width: 1, depth: 0.1 }}
				material={{ color: 'white', opacity: 0.25 }}
				position={{ x: 0, y: 1.65, z: 0 }}
			/>
			<Entity
				geometry={{ primitive: 'box', height: 0.95, width: 1, depth: 1 }}
				material={
					isSelected
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, opacity: 1, metalness }
				}
				position={{ x: 0, y: 0.475, z: 0 }}
			/>
			<Entity
				primitive="a-box"
				width="1.025"
				height="1.025"
				depth=".35"
				material={
					isSelected
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
