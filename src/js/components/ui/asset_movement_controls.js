import React, { Component } from "react";
import ReactDOM from "react-dom";
import AFRAME from "aframe";
import { Entity } from "aframe-react";

// Custom Reaction Components
import Arrow from "../assets/arrow";

export default class AssetMovementControls extends Component {
	constructor(props) {
		super(props);
	}

	// Have to stop propagation of the click event, so clicks are routed through this function before calling updateAssetPosition
	controlClicked(direction, e) {
		e.stopPropagation();
		this.props.updateAssetPosition(direction);
	}

	render() {
		const { currentX, currentZ, asset, position, offsets, updateAssetPosition } = this.props;

		// compute offsets based on the difference in camera position and asset position
		// this is to center the asset within the arrows when it would otherwise be offset due to the difference in height between the asset and arrows
		// TODO: does not currently take rotation into account, because passing rotation state into this component is gonna be annoying

		const widthShift = asset.spanX/2 - 0.5;
		const heightShift = asset.spanZ/2 - 0.5;
		const centerX = currentX - widthShift;
		const centerZ = currentZ - heightShift;

		const assetHeight = 0.5;
		const depthShift = (position.y - 3.2) / (position.y - assetHeight);
		let xOffset = ((centerX - position.x) * depthShift) - (centerX - position.x);
		let zOffset = ((centerZ - position.z) * depthShift) - (centerZ - position.z);

		console.log("center: (" + centerX + ", " + centerZ + ")");
		console.log("offset: " + xOffset + ", " + zOffset + ")");
		console.log("total: " + (currentX + xOffset) + ", " + (currentZ + zOffset));

		return (
				<Entity>
					<Arrow
						x={centerX + xOffset}
						z={centerZ + zOffset}
						radius={heightShift}
						onClick={this.controlClicked.bind(this, "zUp")}/>
					<Arrow
						x={centerX + xOffset}
						z={centerZ + zOffset}
						radius={widthShift}
						rotation={270}
						onClick={this.controlClicked.bind(this, "xRight")}/>
					<Arrow
						x={centerX + xOffset}
						z={centerZ + zOffset}
						radius={heightShift}
						rotation={180}
						onClick={this.controlClicked.bind(this, "zDown")}/>
					<Arrow
						x={centerX + xOffset}
						z={centerZ + zOffset}
						radius={widthShift}
						rotation={90}
						onClick={this.controlClicked.bind(this, "xLeft")}/>
				</Entity>
		);
	}
}
