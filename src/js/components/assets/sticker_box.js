import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

// Custom React Components
import LeftArrowSVG from "../assets/icon-svgs/mini_left_arrow";
import RightArrowSVG from "../assets/icon-svgs/mini_right_arrow";

export default class StickerBox extends Component {
	render() {
		const { index, side, stickers, x, z } = this.props;
		const { editSticker } = this.props;
		const stickerType = stickers[index];
		return (
			<div className="sticker-box" id={`${side}-sticker-box`}>
				<button
					className="edit-wall-sticker"
					style={
						stickerType == "0"
							? { background: "#af9888" }
							: {
									background: `url(${HS_ASSETS[stickerType].buttonSource})`
								}
					}
				/>
				<button
					className="sticker-arrow-left"
					onClick={() => editSticker(x, z, index, -1, HS_STICKER_TYPES)}>
					<LeftArrowSVG />
				</button>
				<button
					className="sticker-arrow-right"
					onClick={() => editSticker(x, z, index, 1, HS_STICKER_TYPES)}>
					<RightArrowSVG />
				</button>
			</div>
		);
	}
}
