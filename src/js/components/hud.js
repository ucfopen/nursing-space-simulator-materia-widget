import React, { Component } from "react";
import { connect } from "react-redux";
import CategoryButton from "./ui/category_button";
import AssetButton from "./ui/asset_button";

import { updatePosition, toggleCameraType } from "../actions/camera_actions.js";
import { toggleMenuVisibility, setCategory } from "../actions/menu_actions";

import {
	selectAssetType,
	deselectObject,
	rotateObject,
	removeObject
} from "../actions/placement_actions";

class HUD extends Component {
	render() {
		if (!this.props.categories || !this.props.assets) {
			return <div>Loading</div>;
		} else {
			return (
				<div>
					<div id="ground-top-panel">
						<button id="back">Back</button>
					</div>
					<div id="UI-right-panel">
						<div id="top-buttons" />
						<button id="screenshot">Take a Screenshot</button>
						<div id="camera-move">
							<button
								id="camera-up"
								onMouseDown={() => this.props.updatePosition("xUp")}>
								↑
							</button>
							<div id="camera-move-horizontal">
								<button
									id="camera-left"
									onMouseDown={() => this.props.updatePosition("zUp")}>
									←
								</button>
								<button
									id="camera-right"
									onMouseDown={() => this.props.updatePosition("zDown")}>
									→
								</button>
							</div>
							<button
								id="camera-down"
								onMouseDown={() => this.props.updatePosition("xDown")}>
								↓
							</button>
						</div>
						<button
							id="camera-zoom-in"
							onMouseDown={() => this.props.updatePosition("yDown")}>
							+
						</button>
						<button
							id="camera-zoom-out"
							onMouseDown={() => this.props.updatePosition("yUp")}>
							-
						</button>
						<button
							id="camera-position-reset"
							onMouseDown={() => this.props.updatePosition("reset")}>
							Reset
						</button>
					</div>
					<div
						id="UI-selected-asset-options"
						style={{
							display: this.props.manipulationMode ? "inline" : "none"
						}}>
						{this.props.selectedAsset
							? <span className="selected-asset-label-title">
									Currently selected: {this.props.selectedAsset.title}
								</span>
							: null}
						<span id="selected-asset-label" />
						<button id="deselect" onClick={() => this.props.deselectObject()}>
							Deselect
						</button>
						<button
							id="rotate"
							onClick={() =>
								this.props.rotateObject(
									this.props.selectedAsset,
									this.props.currentX,
									this.props.currentY
								)}>
							Rotate
						</button>
						<button
							id="remove"
							onClick={() =>
								this.props.removeObject(
									this.props.currentX,
									this.props.currentY
								)}>
							Remove
						</button>
					</div>
					<div
						id="UI-bottom-panel"
						className={this.props.visible ? "open" : "closed"}>
						<button
							onClick={() => this.props.toggleMenuVisibility()}
							className="drawer-toggle">
							{this.props.visible ? "[Close Menu]" : "[Open Menu]"}
						</button>
						<div id="asset-selection-menu">
							<button
								id="vr-viewer-mode"
								onClick={() => this.props.toggleCameraType()}>
								First-Person Viewer
							</button>
							{this.props.categories.map((category, index) =>
								<CategoryButton
									onClick={() => this.props.setCategory(category)}
									key={index}
									category={category}
								/>
							)}
						</div>
						<div id="asset-picker">
							{Object.keys(this.props.assets).map(asset => {
								if (
									this.props.currentCategory ===
									this.props.assets[asset].category
								)
									return (
										<AssetButton
											key={asset}
											item={this.props.assets[asset]}
											onClick={() =>
												this.props.selectAssetType(this.props.assets[asset])}
										/>
									);
							})}
						</div>
					</div>
				</div>
			);
		} //end else
	}
}

function mapStateToProps({ menu, data, placement }) {
	return {
		assets: data.assets,
		selectedAsset: placement.selectedAsset,
		currentX: placement.currentX,
		currentY: placement.currentY,
		manipulationMode: placement.manipulationMode,
		categories: data.categories,
		currentCategory: menu.currentCategory,
		visible: menu.visible
	};
}

export default connect(mapStateToProps, {
	updatePosition,
	toggleCameraType,
	toggleMenuVisibility,
	setCategory,
	selectAssetType,
	deselectObject,
	rotateObject,
	removeObject
})(HUD);
