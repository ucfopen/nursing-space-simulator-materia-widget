import AFRAME from 'aframe'
import { Entity } from 'aframe-react'
import React, { Component } from 'react'
import Sticker from './sticker'

import DoorPrimitive from './primitive_assets/door'
import WindowPrimitive from './primitive_assets/window'
import WallPrimitive from './primitive_assets/wall'

export default class Wall extends Component {
	processStickers() {
		const { attributes, isSelected, rotation } = this.props
		let mappedStickers
		if (attributes.stickers) {
			mappedStickers = attributes.stickers.map((item, itemIndex) => {
				if (item != '0')
					return (
						<Sticker
							id={item}
							rotation={90 - itemIndex * 90 - rotation}
							isSelected={isSelected}
							key={`${item} ${itemIndex}`}
						/>
					)
			})
		}
		return mappedStickers
	}

	render() {
		const { x, y, z, type, rotation, mode, isSelected, onClick } = this.props
		const defaultProps = {
			x,
			y,
			z,
			rotation,
			mode,
			isSelected,
			onClick,
			color: '#f9d9c2',
			trimColor: '#7c695b',
			selectionColor: 'green',
			selectionOpacity: 0.4,
			metalness: 0.4,
			processStickers: this.processStickers.bind(this)
		}

		// There are 3 basic wall types: window, door, and regular
		if (type === 'window') return <WindowPrimitive {...defaultProps} />
		if (type === 'door-1') return <DoorPrimitive {...defaultProps} />
		else return <WallPrimitive {...defaultProps} />
	}
}
