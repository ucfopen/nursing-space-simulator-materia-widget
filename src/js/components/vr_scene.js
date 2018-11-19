import React, { Component } from "react";
import { connect } from "react-redux";

// Custom React Components
import CameraTP from "./assets/camera_tp";
import CameraFP from "./assets/camera_fp";
import Ceiling from "./assets/ceiling";
import FloorTile from "./assets/floor_tile";
import FloorUnit from "./assets/floor_unit";
import QsetAsset from "./assets/qset_asset";
import Skybox from "./assets/skybox";
import AssetMovementControls from "./ui/asset_movement_controls";

// Redux Actions
import {
	deselectAsset,
	insertAsset,
	selectAsset,
	fillWalls,
	refreshGrid,
	updateAssetPosition
} from "../actions/grid_actions";
import {
	BAD_INSERT,
	BAD_WALL_EXTEND,
	IMPOSSIBLE_WALL_EXTEND,
	showErrorTooltip,
	updateTimedTooltip
} from "../actions/tooltip_actions";
import { deleteItem, isCellAvailable, isInBounds } from "../grid";

// Utilities
import { checkPropsExist, deepCopy } from "../utils";

export class VRScene extends Component {
	cancelExtend() {
		const key = Math.random();
		const { deselectAsset, showErrorTooltip, updateTimedTooltip } = this.props;

		deselectAsset();
		showErrorTooltip(IMPOSSIBLE_WALL_EXTEND, key);
		setTimeout(function() {
			updateTimedTooltip(key);
		}, 3000);
	}
	checkFillWalls(x, z, extendX, extendZ, validX, validZ) {
		const { fillWalls, showErrorTooltip, updateTimedTooltip } = this.props;
		let validFill =
			(x == extendX && validZ.includes(z)) ||
			(z == extendZ && validX.includes(x));

		if (validFill) {
			fillWalls(x, z, extendX, extendZ, validX, validZ);
		} else {
			const key = Math.random();
			showErrorTooltip(BAD_WALL_EXTEND, key);
			setTimeout(function() {
				updateTimedTooltip(key);
			}, 5000);
		}
	}

	checkAssetDrag(x, z, assetId) {
		const { currentX, currentZ, grid } = this.props;
		const { refreshGrid } = this.props;

		if (!isInBounds(grid, z, x) || (currentX == x && currentZ == z)) {
			refreshGrid(); // refresh needed to reset the drag
		} else {
			this.checkInsertAsset(x, z, assetId);
		}
	}

	checkInsertAsset(x, z, assetId = null) {
		const { currentX, currentZ, dragging, grid, selectedItem } = this.props;
		const {
			insertAsset,
			refreshGrid,
			showErrorTooltip,
			updateTimedTooltip
		} = this.props;

		if (assetId == "pov_camera") {
			return insertAsset(x, z, assetId);
		}

		let validInsert;
		if (assetId && HS_ASSETS[assetId].spanX == 2) {
			let gridModified =
				currentX != null && currentZ
					? deleteItem(deepCopy(grid), currentX, currentZ)
					: grid;
			let prevRotation = selectedItem ? selectedItem.rotation : 180;
			const adjSide = 3 - ((prevRotation + 180) % 360) / 90;
			validInsert = isCellAvailable(gridModified, x, z, adjSide);
		} else {
			validInsert = isCellAvailable(grid, x, z);
		}

		if (validInsert) {
			insertAsset(x, z, assetId);
		} else if (dragging) {
			refreshGrid();
		} else if (currentX != x || currentZ != z) {
			if (assetId === null) return;
			const key = Math.random();
			showErrorTooltip(BAD_INSERT, key, HS_ASSETS[assetId].title);
			setTimeout(function() {
				updateTimedTooltip(key);
			}, 2000);
		}
	}

	componentDidUpdate() {
		const { mode, validX, validZ } = this.props;
		if (mode == "extendWall" && validX.length == 1 && validZ.length == 1) {
			this.cancelExtend();
		}
	}

	renderAssets() {
		const {
			currentX,
			currentZ,
			grid,
			mode,
			selectedAsset,
			thirdPerson
		} = this.props;
		const { selectAsset } = this.props;
		const mappedAssets = grid.map(
			(row, rowIndex) =>
				row.map((column, colIndex) => {
					return column !== "0" && column != "X" ? (
						<QsetAsset
							attributes={column}
							data={HS_ASSETS[column.id]}
							insertAsset={this.checkAssetDrag.bind(this)}
							isSelected={currentX === colIndex && currentZ === rowIndex}
							key={`${rowIndex} ${colIndex}`}
							mode={mode}
							onClick={
								mode != "editAsset"
									? selectAsset.bind(
											this,
											HS_ASSETS[column.id],
											colIndex,
											rowIndex
										)
									: null
							}
							rotation={column.rotation}
							selectedAssetId={selectedAsset ? selectedAsset.id : null}
							thirdPerson={thirdPerson}
							x={colIndex}
							z={rowIndex}
						/>
					) : null;
				}, this),
			this
		);
		return mappedAssets;
	}

	renderFloor() {
		const {
			currentX,
			currentZ,
			grid,
			mode,
			selectedAsset,
			selectedItem,
			thirdPerson,
			validX,
			validZ
		} = this.props;

		const mappedFloor = grid.map(
			(row, rowIndex) =>
				row.map(
					(column, colIndex) => (
						<FloorUnit
							currentX={currentX}
							currentZ={currentZ}
							grid={grid}
							key={`${rowIndex} ${colIndex}`}
							mode={mode}
							onClick={
								mode == "extendWall"
									? this.checkFillWalls.bind(this)
									: this.checkInsertAsset.bind(this)
							}
							selectedAsset={selectedAsset}
							selectedItem={selectedItem}
							thirdPerson={thirdPerson}
							validX={validX}
							validZ={validZ}
							x={colIndex}
							z={rowIndex}
						/>
					),
					this
				),
			this
		);
		return mappedFloor;
	}

	renderScene() {
		const {
			mode,
			posX,
			posY,
			posZ,
			shortcutsEnabled,
			thirdPerson
		} = this.props;
		const { updateAssetPosition } = this.props;
		const position = { x: posX, y: posY, z: posZ };
		return (
			<Scene className="vr-scene" keyboard-shortcuts="enterVR: false">
				<a-assets>
					<img
						alt="ceiling-texture"
						id="ceilingTexture"
						src="assets/CEILING_TILE.jpg"
					/>
					<img alt="door-texture" id="doorTexture" src="assets/DOOR_TEX.png" />
					<img
						alt="fire-texture"
						id="fireTexture"
						src="assets/FIRE_TEXTURE.png"
					/>
					{Object.keys(HS_ASSETS).map(asset => {
						if (HS_ASSETS[asset].objSrc) {
							return (
								<a-asset-item
									id={`${asset}-obj`}
									key={`${asset}-obj`}
									src={HS_ASSETS[asset].objSrc}
								/>
							);
						}
					})}
					{Object.keys(HS_ASSETS).map(asset => {
						if (HS_ASSETS[asset].mtlSrc) {
							return (
								<a-asset-item
									id={`${asset}-mtl`}
									key={`${asset}-mtl`}
									src={HS_ASSETS[asset].mtlSrc}
								/>
							);
						}
					})}
				</a-assets>
				<Skybox thirdPerson={thirdPerson} />
				<FloorTile />
				<Ceiling thirdPerson={thirdPerson} />
				<CameraFP
					active={!thirdPerson}
					position={position}
					shortcutsEnabled={shortcutsEnabled}
				/>
				<CameraTP
					active={thirdPerson}
					position={position}
					shortcutsEnabled={shortcutsEnabled}
					mode={mode}
				/>
				{this.renderFloor()}
				{this.renderAssets()}
				{this.props.mode == "manipulation" && !this.props.dragging ? (
					<AssetMovementControls
						currentX={this.props.currentX}
						currentZ={this.props.currentZ}
						asset={this.props.selectedAsset}
						position={position}
						selectedItem={this.props.selectedItem}
						updateAssetPosition={updateAssetPosition}
					/>
				) : null}
			</Scene>
		);
	}

	render() {
		if (checkPropsExist(this.props)) {
			return this.renderScene();
		} else return null;
	}
}

function mapStateToProps({ grid, position, menu }) {
	return {
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		dragging: grid.dragging,
		grid: grid.grid,
		mode: grid.mode,
		posX: position.x,
		posY: position.y,
		posZ: position.z,
		selectedAsset: grid.selectedAsset,
		selectedItem: grid.selectedItem,
		shortcutsEnabled: menu.shortcutsEnabled,
		thirdPerson: position.thirdPerson,
		validX: grid.validX,
		validZ: grid.validZ
	};
}

export default connect(mapStateToProps, {
	deselectAsset,
	fillWalls,
	insertAsset,
	refreshGrid,
	selectAsset,
	showErrorTooltip,
	updateAssetPosition,
	updateTimedTooltip
})(VRScene);
