import React, { Component } from "react";
import AFRAME from "aframe";
import { Entity, Scene } from "aframe-react";
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
	updateAssetPosition,
	fillWalls
} from "../actions/grid_actions";
import {
	updateTemporaryTooltip,
	updateTimedTooltip
} from "../actions/tooltip_actions";

// Utilities
import { checkPropsExist } from "../utils";

export class VRScene extends Component {
	renderAssets() {
		const {
			currentX,
			currentZ,
			grid,
			mode,
			selectedAsset,
			thirdPerson,
			insertAsset,
			selectAsset,
		} = this.props;
		const mappedAssets = grid.map(
			(row, rowIndex) =>
				row.map((column, colIndex) => {
					return (column !== "0" && column != "X") ? (
						<QsetAsset
							attributes={column}
							data={HS_ASSETS[column.id]}
							insertAsset={insertAsset}
							isSelected={currentX === colIndex && currentZ === rowIndex}
							key={`${rowIndex} ${colIndex}`}
							mode={mode}
							onClick={selectAsset.bind(
								this,
								HS_ASSETS[column.id],
								colIndex,
								rowIndex
							)}
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

	checkFillWalls(x, z, extendX, extendZ, validX, validZ) {
		const {
			deselectAsset,
			fillWalls,
			updateTemporaryTooltip,
			updateTimedTooltip
		} = this.props;
		let validFill = (
			(x == extendX && validZ.includes(z)) ||
			(z == extendZ && validX.includes(x))
		);

		if (validFill) {
			fillWalls(x, z, extendX, extendZ, validX, validZ);
		}
		else {
			deselectAsset();
			updateTemporaryTooltip(true, "Walls can only be extended horizontally and vertically.");
			setTimeout(function() {
				updateTimedTooltip("Walls can only be extended horizontally and vertically.");
			}, 6000);
		}
	}

	renderFloor() {
		const {
			currentX,
			currentZ,
			grid,
			mode,
			selectedAsset,
			thirdPerson,
			validX,
			validZ
		} = this.props;

		const { insertAsset } = this.props;
		const selectedAssetId = selectedAsset ? selectedAsset.id : null;

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
							onClick={mode == "extendWall" ? this.checkFillWalls.bind(this) : insertAsset}
							selectedAssetId={selectedAssetId}
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
			posX,
			posY,
			posZ,
			thirdPerson,
			updateAssetPosition } = this.props;
		const position = { x: posX, y: posY, z: posZ }
		return (
			<Scene className="vr-scene">
				<a-assets>
					<img
						alt="ceiling-texture"
						id="ceilingTexture"
						src="assets/CEILING_TILE.jpg"
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
				<CameraFP active={!thirdPerson} position={position} />
				<CameraTP active={thirdPerson} position={position} />
				{this.renderFloor()}
				{this.renderAssets()}
				{ this.props.mode == "manipulation"
					? (
						<AssetMovementControls
							currentX={this.props.currentX}
							currentZ={this.props.currentZ}
							asset={this.props.selectedAsset}
							position={position}
							updateAssetPosition={updateAssetPosition}/>
					) : null
				}
			</Scene>
		);
	}

	render() {
		if (checkPropsExist(this.props)) {
			return this.renderScene();
		}
		else return null;
	}
}

function mapStateToProps({ grid, position }) {
	return {
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		grid: grid.grid,
		mode: grid.mode,
		posX: position.x,
		posY: position.y,
		posZ: position.z,
		selectedAsset: grid.selectedAsset,
		thirdPerson: position.thirdPerson,
		validX: grid.validX,
		validZ: grid.validZ
	};
}

export default connect(mapStateToProps, {
	deselectAsset,
	fillWalls,
	insertAsset,
	selectAsset,
	updateAssetPosition,
	updateTemporaryTooltip,
	updateTimedTooltip
})(VRScene);
