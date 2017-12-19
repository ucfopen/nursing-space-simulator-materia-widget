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
		top
		door
		side
		side
		trim
		trim
	*/

	return (
		<Entity
			events={{ click: onClick }}
			rotation={{ x: 0, y: rotation, z: 0 }}
			position={{ x, y: 0, z }}
		>
			<Entity
				geometry={{ primitive: 'box', height: 1, width: 1, depth: 1 }}
				material={
					isSelected && mode != 'editAsset'
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, opacity: 1, metalness }
				}
				position={{ x: 0, y: 2.5, z: 0 }}
			/>
			<Entity
				geometry={{ primitive: 'plane', height: 0.75, width: 2 }}
				material={
					isSelected && mode != 'editAsset'
						? { side: 'double', color: selectionColor, opacity: selectionOpacity }
						: { side: 'double', color: 'white', opacity: 1, metalness }
				}
				position={{ y: 1 }}
				rotation={{ y: -90, z: -90 }}
			/>
			<Entity
				geometry={{ primitive: 'box', height: 3, width: 1, depth: 0.125 }}
				material={
					isSelected && mode != 'editAsset'
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, opacity: 1, metalness }
				}
				position={{ y: 1.5, z: 0.4375 }}
			/>
			<Entity
				geometry={{ primitive: 'box', height: 3, width: 1, depth: 0.125 }}
				material={
					isSelected && mode != 'editAsset'
						? { color: selectionColor, opacity: selectionOpacity }
						: { color, opacity: 1, metalness }
				}
				position={{ y: 1.5, z: -0.4375 }}
			/>
			<Entity
				primitive="a-box"
				width="1.025"
				height="0.15"
				depth=".35"
				material={
					isSelected && mode != 'editAsset'
						? { color: selectionColor, opacity: selectionOpacity }
						: { color: trimColor, opacity: 1 }
				}
				position={{ y: 0.15, z: 0.4375 }}
				rotation={{ x: -90 }}
			/>
			<Entity
				primitive="a-box"
				width="1.025"
				height="0.15"
				depth=".35"
				material={
					isSelected
						? { color: selectionColor, opacity: selectionOpacity }
						: { color: trimColor, opacity: 1 }
				}
				position={{ y: 0.15, z: -0.4375 }}
				rotation={{ x: -90 }}
			/>
			{processStickers()}
		</Entity>
	)
}
