import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

// Custom React Components
import DoorPrimitive from "./primitive_assets/door";
import Sticker from "./sticker";
import WallPrimitive from "./primitive_assets/wall";
import WindowPrimitive from "./primitive_assets/window";

export default class Wall extends Component {
	processStickers() {
		const { attributes, isSelected, rotation } = this.props;
		let mappedStickers;
		if (attributes.stickers) {
			mappedStickers = attributes.stickers.map((item, itemIndex) => {
				if (item != "0")
					return (
						<Sticker
							id={item}
							isSelected={isSelected}
							key={`${item} ${itemIndex}`}
							rotation={90 - itemIndex * 90 - rotation}
						/>
					);
			});
		}
		return mappedStickers;
	}

	render() {
		const { isSelected, mode, onClick, rotation, type, x, y, z } = this.props;
		const defaultProps = {
			color: "#f9d9c2",
			isSelected,
			metalness: 0.4,
			mode,
			onClick,
			processStickers: this.processStickers.bind(this),
			rotation,
			selectionColor: "green",
			selectionOpacity: 0.4,
			trimColor: "#7c695b",
			x,
			y,
			z
		};

		// There are 3 basic wall types: window, door, and regular
		if (type === "window") return <WindowPrimitive {...defaultProps} />;
		if (type === "door-1") return <DoorPrimitive {...defaultProps} />;
		else return <WallPrimitive {...defaultProps} />;
	}
}
