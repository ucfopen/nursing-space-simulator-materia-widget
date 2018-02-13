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
		let xOffset = (position.x - currentX) / 4;
		let zOffset = (position.z - currentZ) / 4 - 0.5;

		return (
				<Entity>
					<Arrow x={currentX + xOffset} z={currentZ + zOffset} onClick={this.controlClicked.bind(this, "zUp")}/>
					<Arrow x={currentX + (asset.spanX/2) + xOffset} z={currentZ + (asset.spanZ/2) + zOffset} rotation={270} onClick={this.controlClicked.bind(this, "xRight")}/>
					<Arrow x={currentX - (asset.spanX/2) + xOffset} z={currentZ + (asset.spanZ/2) + zOffset} rotation={90} onClick={this.controlClicked.bind(this, "xLeft")}/>
					<Arrow x={currentX + xOffset} z={currentZ + (asset.spanZ) + zOffset} rotation={180} onClick={this.controlClicked.bind(this, "zDown")}/>
				</Entity>
		);
	}
}
