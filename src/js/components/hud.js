import React, { Component } from "react";

import CategoryButton from "./ui/category_button";
import AssetControls from "./ui/asset_controls";
import AssetTray from "./ui/asset_tray";
import MovementControls from "./ui/movement_controls";

import { connect } from "react-redux";

import { updatePosition, toggleCameraType } from "../actions/camera_actions.js";
import { toggleMenuVisibility, setCategory } from "../actions/menu_actions";

import {
	selectAssetType,
	deselectAsset,
	rotateAsset,
	removeAsset
} from "../actions/grid_actions";

class HUD extends Component {
	render() {
		if (!this.props.categories || !this.props.assets) {
			return <div>Loading</div>;
		} else {
			return (
				<div>
					<MovementControls
						thirdPerson={this.props.thirdPerson}
						updatePosition={this.props.updatePosition}
					/>
					{this.props.thirdPerson
						? <div>
								{this.props.selectedAsset !== "none"
									? <AssetControls
											selectedAsset={this.props.selectedAsset}
											manipulationMode={this.props.manipulationMode}
										/>
									: null}
								<AssetTray
									assets={this.props.assets}
									categories={this.props.categories}
									selectAssetType={this.props.selectAssetType}
									selectedAsset={this.props.selectAsset}
									setCategory={this.props.setCategory}
									currentCategory={this.props.currentCategory}
								/>
							</div>
						: <div id="ground-top-panel">
								<button id="back" onClick={() => this.props.toggleCameraType()}>
									Back
								</button>
							</div>}
				</div>
			);
		} //end else
	}
}

function mapStateToProps({ data, menu, grid, position }) {
	return {
		assets: data.assets,
		categories: data.categories,
		currentCategory: menu.currentCategory,
		visible: menu.visible,
		selectedAsset: grid.selectedAsset,
		currentX: grid.currentX,
		currentY: grid.currentY,
		manipulationMode: grid.manipulationMode,
		thirdPerson: position.thirdPerson
	};
}

export default connect(mapStateToProps, {
	updatePosition,
	toggleCameraType,
	toggleMenuVisibility,
	setCategory,
	selectAssetType,
	deselectAsset,
	rotateAsset,
	removeAsset
})(HUD);
