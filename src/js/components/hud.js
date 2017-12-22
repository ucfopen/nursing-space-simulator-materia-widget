import React, { Component } from "react";
import { connect } from "react-redux";

// Custom React Components
import AssetControls from "./ui/asset_controls";
import AssetTray from "./ui/asset_tray";
import CategoryButton from "./ui/category_button";
import MovementControls from "./ui/movement_controls";

// Redux Actions
import {
	updateCameraPosition,
	toggleThirdPerson
} from "../actions/camera_actions.js";
import { toggleMenuVisibility, setCategory } from "../actions/menu_actions";
import { checkPropsExist } from "../utils";

import {
	deselectAsset,
	editAsset,
	editSticker,
	extendWall,
	removeAsset,
	rotateAsset,
	selectAssetType,
	updateAssetPosition
} from "../actions/grid_actions";

export class HUD extends Component {
	renderHUD() {
		const { mode, selectedAsset, thirdPerson } = this.props;
		const { updateAssetPosition, updateCameraPosition } = this.props;

		const update =
			mode === "manipulation" ? updateAssetPosition : updateCameraPosition;

		return (
			<div>
				{mode !== "editAsset" ? (
					<MovementControls
						thirdPerson={thirdPerson}
						update={update}
						updateCameraPosition={updateCameraPosition}
					/>
				) : null}
				{thirdPerson ? (
					<div>
						{selectedAsset ? (
							<AssetControls
								currentX={this.props.currentX}
								currentZ={this.props.currentZ}
								deselectAsset={this.props.deselectAsset}
								editAsset={this.props.editAsset}
								editSticker={this.props.editSticker}
								extendWall={this.props.extendWall}
								grid={this.props.grid}
								isMenuVisible={this.props.visible}
								mode={this.props.mode}
								removeAsset={this.props.removeAsset}
								rotateAsset={this.props.rotateAsset}
								selectedAsset={this.props.selectedAsset}
							/>
						) : null}
						<AssetTray
							currentCategory={this.props.currentCategory}
							selectAssetType={this.props.selectAssetType}
							selectedAsset={this.props.selectedAsset}
							setCategory={this.props.setCategory}
							isMenuVisible={
								this.props.mode === "editAsset" ? false : this.props.visible
							}
							toggleMenu={this.props.toggleMenuVisibility.bind(this)}
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
	}
	render() {
		if (checkPropsExist(this.props)) return this.renderHUD();
		else return null;
	}
}

function mapStateToProps({ menu, grid, position }) {
	return {
		currentCategory: menu.currentCategory,
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		grid: grid.grid,
		mode: grid.mode,
		selectedAsset: grid.selectedAsset,
		thirdPerson: position.thirdPerson,
		visible: menu.visible
	};
}

export default connect(mapStateToProps, {
	deselectAsset,
	editAsset,
	editSticker,
	extendWall,
	removeAsset,
	rotateAsset,
	selectAssetType,
	setCategory,
	toggleMenuVisibility,
	toggleThirdPerson,
	updateAssetPosition,
	updateCameraPosition
})(HUD);
