import React, { Component } from "react";
import AFRAME from "aframe";
import { Scene } from "aframe-react";
import { connect } from "react-redux";

import { insertAsset, selectAsset } from "../actions/grid_actions";

// Scene Assets
import CeilingUnit from "./assets/ceiling_unit";
import CameraTP from "./assets/camera_tp";
import CameraFP from "./assets/camera_fp";
import QsetAsset from "./assets/qset_asset";
import FloorUnit from "./assets/floor_unit";
import Skybox from "./assets/skybox";

export class VRScene extends Component {
	renderAssets() {
		const assets = this.props.assets;
		const selectAsset = this.props.selectAsset;
		const currentX = this.props.currentX;
		const currentY = this.props.currentY;

		const mappedAssets = this.props.grid.map(
			(row, rowIndex) =>
				row.map((column, colIndex) => {
					return column !== "0"
						? <QsetAsset
								x={rowIndex}
								z={colIndex}
								onClick={selectAsset.bind(
									this,
									assets[column.id],
									rowIndex,
									colIndex
								)}
								data={assets[column.id]}
								rotation={column.rotation}
								isSelected={currentX === rowIndex && currentY === colIndex}
								key={`${rowIndex} ${colIndex}`}
							/>
						: null;
				}, this),
			this
		);
		return mappedAssets;
	}

	renderCeiling() {
		if (this.props.thirdPerson) return null;
		const mappedCeiling = this.props.grid.map((row, rowIndex) =>
			row.map((column, colIndex) =>
				<CeilingUnit
					x={rowIndex}
					z={colIndex}
					key={`${rowIndex} ${colIndex}`}
				/>
			)
		);
		return mappedCeiling;
	}

	renderFloor() {
		const selectedAssetId = this.props.selectedAsset
			? this.props.selectedAsset.id
			: null;

		const insertAsset = this.props.insertAsset;

		const mappedFloor = this.props.grid.map(
			(row, rowIndex) =>
				row.map(
					(column, colIndex) =>
						<FloorUnit
							thirdPerson={this.props.thirdPerson}
							selectedAssetId={selectedAssetId}
							x={rowIndex}
							y={colIndex}
							onClick={insertAsset}
							key={`${rowIndex} ${colIndex}`}
						/>,
					this
				),
			this
		);
		return mappedFloor;
	}

	render() {
		if (!this.props.grid || !this.props.position || !this.props.assets)
			return <div>Loading</div>;
		else {
			const assets = this.props.assets;
			return (
				<Scene className="vr-scene">
					<a-assets>
						<img
							id="ceilingTexture"
							alt="sorry"
							src="assets/CEILING_TILE.jpg"
						/>
						{Object.keys(assets).map(asset => {
							if (assets[asset].objSrc) {
								return (
									<a-asset-item
										id={asset + "-obj"}
										src={assets[asset].objSrc}
										key={`${asset}-obj`}
									/>
								);
							}
						})}
						{Object.keys(assets).map(asset => {
							if (assets[asset].mtlSrc) {
								return (
									<a-asset-item
										id={asset + "-mtl"}
										src={assets[asset].mtlSrc}
										key={`${asset}-mtl`}
									/>
								);
							}
						})}
					</a-assets>
					<Skybox />
					<CameraFP
						active={!this.props.thirdPerson}
						position={this.props.position}
					/>
					<CameraTP
						active={this.props.thirdPerson}
						position={this.props.position}
					/>
					{this.renderFloor()}
					{this.renderAssets()}
					{this.renderCeiling()}
				</Scene>
			);
		} //end else
	}
}

function mapStateToProps({ position, data, grid }) {
	return {
		position: { x: position.x, y: position.y, z: position.z },
		thirdPerson: position.thirdPerson,
		assets: data.assets,
		grid: grid.grid,
		currentX: grid.currentX,
		currentY: grid.currentY,
		selectedAsset: grid.selectedAsset
	};
}

export default connect(mapStateToProps, { insertAsset, selectAsset })(VRScene);
