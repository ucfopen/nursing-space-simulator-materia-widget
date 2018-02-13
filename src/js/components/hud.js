import React, { Component } from "react";
import { connect } from "react-redux";

// Custom React Components
import AssetControls from "./ui/asset_controls";
import AssetTooltip from "./ui/asset_tooltip";
import AssetTray from "./ui/asset_tray";
import CategoryButton from "./ui/category_button";
import MovementControls from "./ui/movement_controls";

// Redux Actions
import {
	updateCameraPosition,
	toggleThirdPerson
} from "../actions/camera_actions.js";
import { toggleMenuVisibility, setCategory } from "../actions/menu_actions";
import { updatePersistentTooltip, updateTemporaryTooltip } from "../actions/tooltip_actions";
import { checkPropsExist } from "../utils";

import {
	deselectAsset,
	editAsset,
	editSticker,
	extendWall,
	removeAsset,
	rotateAsset,
	selectAsset,
	selectAssetType,
	updateAssetPosition
} from "../actions/grid_actions";

export class HUD extends Component {
	renderHUD() {
		const {
			isTooltipPersistent,
			isTooltipTemporary,
			mode,
			selectedAsset,
			selectedItem,
			thirdPerson,
			tooltipPersistentText,
			tooltipTemporaryText
		} = this.props;
		const { updateAssetPosition, updateCameraPosition } = this.props;

		const update =
			mode === "manipulation" ? updateAssetPosition : updateCameraPosition;

		return (
			<div>
				<AssetTooltip
					visible={ (isTooltipTemporary || isTooltipPersistent) }
					text={
						isTooltipTemporary ? tooltipTemporaryText : tooltipPersistentText
					}
				/>
				{mode !== "editAsset" ? (
					<MovementControls
						thirdPerson={thirdPerson}
						update={update}
						mode={mode}
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
								isMenuVisible={this.props.menuVisible}
								mode={mode}
								removeAsset={this.props.removeAsset}
								rotateAsset={this.props.rotateAsset}
								selectedAsset={this.props.selectedAsset}
								selectedItem={this.props.selectedItem}
								updatePersistentTooltip={this.props.updatePersistentTooltip}
								updateTemporaryTooltip={this.props.updateTemporaryTooltip}
							/>
						) : null}
						<AssetTray
							currentCategory={this.props.currentCategory}
							selectAssetType={this.props.selectAssetType}
							selectedAsset={this.props.selectedAsset}
							setCategory={this.props.setCategory}
							isMenuVisible={
								mode === "editAsset" ? false : this.props.menuVisible
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
		if (checkPropsExist(this.props) && this.props.ready) {
			return this.renderHUD();
		}
		else return null;
	}
}

function mapStateToProps({ menu, grid, position, tooltip }) {
	return {
		currentCategory: menu.currentCategory,
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		ready: grid.ready,
		mode: grid.mode,
		selectedAsset: grid.selectedAsset,
		selectedItem: grid.selectedItem,
		thirdPerson: position.thirdPerson,
		menuVisible: menu.visible,
		isTooltipTemporary: tooltip.temporary,
		tooltipTemporaryText: tooltip.temporaryText,
		isTooltipPersistent: tooltip.persistent,
		tooltipPersistentText: tooltip.persistentText
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
	updatePersistentTooltip,
	updateTemporaryTooltip,
	toggleMenuVisibility,
	toggleThirdPerson,
	updateAssetPosition,
	updateCameraPosition
})(HUD);
