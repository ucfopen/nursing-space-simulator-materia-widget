import AFRAME from 'aframe'
import { Entity } from 'aframe-react'
import React, { Component } from 'react'
import LeftArrowSVG from '../assets/icon-svgs/mini_left_arrow'
import RightArrowSVG from '../assets/icon-svgs/mini_right_arrow'

import { connect } from 'react-redux'

import { editSticker } from '../../actions/grid_actions'

export class StickerBox extends Component {
	render() {
		const { stickers, stickerTypes, x, z, index, side, assets } = this.props
		const { editSticker } = this.props
		const stickerType = stickers[index]
		return (
			<div className="sticker-box" id={`${side}-sticker-box`}>
				<button
					className="edit-wall-sticker"
					style={
						stickerType == '0'
							? { background: '#af9888' }
							: {
									background: `url(${assets[stickerType].buttonSource})`
								}
					}
				/>
				<button
					className="sticker-arrow-left"
					onClick={() => editSticker(x, z, index, -1, stickerTypes)}
				>
					<LeftArrowSVG />
				</button>
				<button
					className="sticker-arrow-right"
					onClick={() => editSticker(x, z, index, 1, stickerTypes)}
				>
					<RightArrowSVG />
				</button>
			</div>
		)
	}
}

function mapStateToProps({ data }) {
	return {
		assets: data.assets,
		stickerTypes: data.stickerTypes
	}
}

export default connect(mapStateToProps, {
	editSticker
})(StickerBox)
