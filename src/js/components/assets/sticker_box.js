import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";
import LeftArrowSVG from "../assets/icon-svgs/mini_left_arrow";
import RightArrowSVG from "../assets/icon-svgs/mini_right_arrow";

import { connect } from "react-redux";

import { editSticker } from "../../actions/grid_actions"

export class StickerBox extends Component {
	constructor(props) {
		super(props);
	}

	render()
	{
		const stickerType = this.props.stickers[this.props.index];
		return (
			<div className="stickerBox" id={this.props.side + "StickerBox"}>
				<button
					className="editWallSticker"
					style={
						stickerType == "0"
						? {background: "#af9888"}
						: {background:
								"url(" + this.props.assets[stickerType].buttonSource + ")"}
					}/>
				<button
					className="stickerArrowLeft"
					onClick={() => this.props.editSticker(
							this.props.x,
							this.props.z,
							this.props.index,
							-1,
							this.props.stickerTypes
						)}>
					<LeftArrowSVG />
				</button>
				<button
					className="stickerArrowRight"
					onClick={() => this.props.editSticker(
							this.props.x,
							this.props.z,
							this.props.index,
							1,
							this.props.stickerTypes
						)}>
					<RightArrowSVG />
				</button>
			</div>
		)
	}
}

function mapStateToProps({ data, menu, grid, position }) {
	return {
		assets: data.assets,
		stickerTypes: data.stickerTypes,
	};
}

export default connect(mapStateToProps, {
	editSticker
})(StickerBox);
