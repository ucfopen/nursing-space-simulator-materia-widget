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

class VRScene extends Component {
	renderAssets() {
		const assets = this.props.assets;
		const selectAsset = this.props.selectAsset;
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
			row.map((column, colIndex) => <CeilingUnit x={rowIndex} z={colIndex} />)
		);
		return mappedCeiling;
	}

	renderFloor() {
		const insertAsset = this.props.insertAsset;
		const mappedFloor = this.props.grid.map(
			(row, rowIndex) =>
				row.map(
					(column, colIndex) =>
						<FloorUnit
							x={rowIndex}
							y={colIndex}
							onClick={insertAsset.bind(this, rowIndex, colIndex)}
							color="red"
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
				<Scene>
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
									/>
								);
							}
						})}
					</a-assets>

					<CameraFP
						active={!this.props.thirdPerson}
						position={{ x: 5, y: 1, z: 10 }}
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
		selectedAsset: grid.selectedAsset
	};
}

export default connect(mapStateToProps, { insertAsset, selectAsset })(VRScene);
