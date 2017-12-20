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

// Redux Actions and Custom Libraries
import { updatePosition } from "../actions/camera_actions";
import { insertAsset, selectAsset, fillWalls } from "../actions/grid_actions";
import { checkPropsExist } from "../utils";

export class VRScene extends Component {
	renderAssets() {
		const {
			assets,
			currentX,
			currentZ,
			grid,
			mode,
			selectedAsset
		} = this.props;
		const { insertAsset, selectAsset } = this.props;
		const mappedAssets = grid.map(
			(row, rowIndex) =>
				row.map((column, colIndex) => {
					return column !== "0" ? (
						<QsetAsset
							attributes={column}
							data={assets[column.id]}
							insertAsset={insertAsset}
							isSelected={currentX === colIndex && currentZ === rowIndex}
							key={`${rowIndex} ${colIndex}`}
							mode={mode}
							onClick={selectAsset.bind(
								this,
								assets[column.id],
								colIndex,
								rowIndex
							)}
							selectedAssetId={selectedAsset ? selectedAsset.id : null}
							rotation={column.rotation}
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
			thirdPerson,
			validX,
			validZ
		} = this.props;

		const { fillWalls, insertAsset } = this.props;
		const selectedAssetId = selectedAsset ? selectedAsset.id : null;

		const mappedFloor = grid.map(
			(row, rowIndex) =>
				row.map(
					(column, colIndex) => (
						<FloorUnit
							extendX={currentX}
							extendZ={currentZ}
							grid={grid}
							key={`${rowIndex} ${colIndex}`}
							mode={mode}
							onClick={mode == "extendWall" ? fillWalls : insertAsset}
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
		const { assets, position, thirdPerson } = this.props;
		return (
			<Scene className="vr-scene">
				<a-assets>
					<img
						alt="ceiling-texture"
						id="ceilingTexture"
						src="assets/CEILING_TILE.jpg"
					/>
					{Object.keys(assets).map(asset => {
						if (assets[asset].objSrc) {
							return (
								<a-asset-item
									id={`${asset}-obj`}
									key={`${asset}-obj`}
									src={assets[asset].objSrc}
								/>
							);
						}
					})}
					{Object.keys(assets).map(asset => {
						if (assets[asset].mtlSrc) {
							return (
								<a-asset-item
									id={`${asset}-mtl`}
									key={`${asset}-mtl`}
									src={assets[asset].mtlSrc}
								/>
							);
						}
					})}
				</a-assets>
				<Skybox />
				<FloorTile />
				<Ceiling thirdPerson={thirdPerson} />
				<CameraFP active={!thirdPerson} position={position} />
				<CameraTP active={thirdPerson} position={position} />
				{this.renderFloor()}
				{this.renderAssets()}
			</Scene>
		);
	}

	render() {
		if (checkPropsExist(this.props)) return this.renderScene();
		else return null;
	}
}

function mapStateToProps({ position, data, grid }) {
	return {
		assets: data.assets,
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		grid: grid.grid,
		mode: grid.mode,
		position: { x: position.x, y: position.y, z: position.z },
		selectedAsset: grid.selectedAsset,
		thirdPerson: position.thirdPerson,
		validX: grid.validX,
		validZ: grid.validZ
	};
}

export default connect(mapStateToProps, {
	fillWalls,
	insertAsset,
	selectAsset
})(VRScene);
