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
		const { currentX, currentZ, asset, position, selectedItem } = this.props;
		const { updateAssetPosition } = this.props;

		// compute offsets based on the difference in camera position and asset position
		// this is to center the asset within the arrows when it would otherwise be offset due to the difference in height between the asset and arrows

		// width and height are shifted based on the asset spanX and spanZ
		const side = selectedItem ? ((450 - selectedItem.rotation) % 360) / 90 : 3;
		let widthShift = asset.spanX / 2 - 0.5;
		let heightShift = asset.spanZ / 2 - 0.5;
		let centerX, centerZ;
		if (side % 2 == 0) {
			[widthShift, heightShift] = [heightShift, widthShift];
		}
		if (side == 1 || side == 2) {
			centerX = currentX + widthShift;
			centerZ = currentZ + heightShift;
		} else {
			centerX = currentX - widthShift;
			centerZ = currentZ - heightShift;
		}

		// assumes that most assets are about 0.5 units in height
		const assetHeight = asset.category == "construction" ? 3 : 0.5;

		// adjusts the position of the arrows to make them seem like they're in
		// the right place. (math based on similar triangles where one is from the
		// camera to the arrow position (y=3.2) and the other one is from the
		// camera to the top of the asset (assetHeight)
		const depthShift = (position.y - 3.2) / (position.y - assetHeight);
		const xOffset = (centerX - position.x) * (depthShift - 1);
		const zOffset = (centerZ - position.z) * (depthShift - 1);

		// scale the arrows so that they're smaller when zoomed in (base is y=18)
		const scale =
			position.y < 5 ? 0.2 : (position.y * 2 / 3 + 18 * 1 / 3) / 18; // linear scale biased to 1

		return (
			<Entity>
				{selectedItem.adj[0] ? (
					<Arrow
						onClick={this.controlClicked.bind(this, "zUp")}
						radius={heightShift}
						scale={scale}
						x={centerX + xOffset}
						z={centerZ + zOffset}
					/>
				) : null}
				{selectedItem.adj[1] ? (
					<Arrow
						onClick={this.controlClicked.bind(this, "xRight")}
						radius={widthShift}
						rotation={270}
						scale={scale}
						x={centerX + xOffset}
						z={centerZ + zOffset}
					/>
				) : null}
				{selectedItem.adj[2] ? (
					<Arrow
						onClick={this.controlClicked.bind(this, "zDown")}
						radius={heightShift}
						rotation={180}
						scale={scale}
						x={centerX + xOffset}
						z={centerZ + zOffset}
					/>
				) : null}
				{selectedItem.adj[3] ? (
					<Arrow
						onClick={this.controlClicked.bind(this, "xLeft")}
						radius={widthShift}
						rotation={90}
						scale={scale}
						x={centerX + xOffset}
						z={centerZ + zOffset}
					/>
				) : null}
			</Entity>
		);
	}
}
