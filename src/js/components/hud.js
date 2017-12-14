import React, { Component } from "react";

import CategoryButton from "./ui/category_button";
import AssetControls from "./ui/asset_controls";
import AssetTray from "./ui/asset_tray";
import MovementControls from "./ui/movement_controls";

import { connect } from "react-redux";

import {
	updateCameraPosition,
	toggleThirdPerson
} from "../actions/camera_actions.js";
import { toggleMenuVisibility, setCategory } from "../actions/menu_actions";

import {
	selectAssetType,
	deselectAsset,
	rotateAsset,
	removeAsset,
	updateAssetPosition,
	extendWall,
	editAsset
} from "../actions/grid_actions";

export class HUD extends Component {
	render() {
		if (
			!this.props.categories ||
			!this.props.assets ||
			!this.props.updateAssetPosition ||
			!this.props.updateCameraPosition
		) {
			return <div>Loading</div>;
		} else {
			const update = this.props.mode == "manipulation"
				? this.props.updateAssetPosition
				: this.props.updateCameraPosition;
			return (
				<div>
					<MovementControls
						thirdPerson={this.props.thirdPerson}
						update={update}
						updateCameraPosition={this.props.updateCameraPosition}
					/>
					{this.props.thirdPerson ? (
						<div>
							{this.props.selectedAsset ? (
								<AssetControls
									selectedAsset={this.props.selectedAsset}
									mode={this.props.mode}
									removeAsset={this.props.removeAsset}
									deselectAsset={this.props.deselectAsset}
									rotateAsset={this.props.rotateAsset}
									currentX={this.props.currentX}
									currentZ={this.props.currentZ}
									extendWall={this.props.extendWall}
									editAsset={this.props.editAsset}
									grid={this.props.grid}
								/>
							) : null}
							<AssetTray
								assets={this.props.assets}
								categories={this.props.categories}
								selectAssetType={this.props.selectAssetType}
								selectedAsset={this.props.selectedAsset}
								setCategory={this.props.setCategory}
								currentCategory={this.props.currentCategory}
							/>
						</div>
					) : (
						<div id="ground-top-panel">
							<button id="back" onClick={() => this.props.toggleThirdPerson()}>
								Back
							</button>
						</div>
					)}
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
		mode: grid.mode,
		grid: grid.grid,
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		thirdPerson: position.thirdPerson
	};
}

export default connect(mapStateToProps, {
	updateCameraPosition,
	toggleThirdPerson,
	toggleMenuVisibility,
	setCategory,
	selectAssetType,
	deselectAsset,
	rotateAsset,
	removeAsset,
	updateAssetPosition,
	extendWall,
	editAsset
})(HUD);
