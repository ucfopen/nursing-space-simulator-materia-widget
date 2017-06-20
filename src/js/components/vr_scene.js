import React, { Component } from "react";
import AFRAME from "aframe";
import { Scene } from "aframe-react";
import { connect } from "react-redux";

import { updateGrid, selectObject } from "../actions/placement_actions";

// Scene Assets
import CeilingUnit from "./assets/ceiling_unit";
import CameraTP from "./assets/camera_tp";
import CameraFP from "./assets/camera_fp";
import QsetAsset from "./assets/qset_asset";
import FloorUnit from "./assets/floor_unit";

class VRScene extends Component {
	renderAssets() {
		const mappedAssets = this.props.grid.map((row, rowIndex) =>
			row.map((column, colIndex) => {
				return column !== "0"
					? <QsetAsset
							x={rowIndex}
							z={colIndex}
							onClick={() =>
								this.props.selectObject(
									this.props.assets[column.id],
									rowIndex,
									colIndex
								)}
							data={this.props.assets[column.id]}
							rotation={column.rotation}
						/>
					: null;
			})
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
		const mappedFloor = this.props.grid.map((row, rowIndex) =>
			row.map((column, colIndex) =>
				<FloorUnit
					x={rowIndex}
					y={colIndex}
					onClick={() => this.props.updateGrid(rowIndex, colIndex)}
					color="red"
				/>
			)
		);
		return mappedFloor;
	}

	render() {
		if (!this.props.grid || !this.props.position || !this.props.assets)
			return <div>Loading</div>;
		else {
			return (
				<Scene>
					<a-assets>
						<img
							id="ceilingTexture"
							alt="sorry"
							src="assets/CEILING_TILE.jpg"
						/>
						<img id="wallTexture" alt="sorry" src="assets/WALL_2D_1.png" />
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

function mapStateToProps({ position, data, placement }) {
	return {
		position: { x: position.x, y: position.y, z: position.z },
		thirdPerson: position.thirdPerson,
		assets: data.assets,
		grid: placement.grid,
		selectedAsset: placement.selectedAsset
	};
}

export default connect(mapStateToProps, { updateGrid, selectObject })(VRScene);
