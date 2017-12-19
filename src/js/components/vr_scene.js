import React, { Component } from 'react'
import AFRAME from 'aframe'
import { Scene } from 'aframe-react'
import { connect } from 'react-redux'
import { Entity } from 'aframe-react'

import { insertAsset, selectAsset, fillWalls } from '../actions/grid_actions'
import { updatePosition } from '../actions/camera_actions'
import { checkPropsExist } from '../utils'

// Scene Assets
import CameraTP from './assets/camera_tp'
import CameraFP from './assets/camera_fp'
import QsetAsset from './assets/qset_asset'
import FloorUnit from './assets/floor_unit'
import Skybox from './assets/skybox'
import FloorTile from './assets/floor_tile'
import Ceiling from './assets/ceiling'

export class VRScene extends Component {
	renderAssets() {
		const { assets, currentX, currentZ, grid, mode } = this.props
		const { selectAsset } = this.props

		const mappedAssets = grid.map(
			(row, rowIndex) =>
				row.map((column, colIndex) => {
					return column !== '0' ? (
						<QsetAsset
							x={colIndex}
							z={rowIndex}
							onClick={selectAsset.bind(this, assets[column.id], colIndex, rowIndex)}
							data={assets[column.id]}
							attributes={column}
							rotation={column.rotation}
							isSelected={currentX === colIndex && currentZ === rowIndex}
							mode={mode}
							key={`${rowIndex} ${colIndex}`}
						/>
					) : null
				}, this),
			this
		)
		return mappedAssets
	}

	renderFloor() {
		const {
			selectedAsset,
			thirdPerson,
			grid,
			mode,
			currentX,
			currentZ,
			validX,
			validZ
		} = this.props
		const { insertAsset, fillWalls } = this.props
		const selectedAssetId = selectedAsset ? selectedAsset.id : null

		const mappedFloor = grid.map(
			(row, rowIndex) =>
				row.map(
					(column, colIndex) => (
						<FloorUnit
							thirdPerson={thirdPerson}
							selectedAssetId={selectedAssetId}
							x={colIndex}
							z={rowIndex}
							onClick={mode == 'extendWall' ? fillWalls : insertAsset}
							key={`${rowIndex} ${colIndex}`}
							grid={grid}
							mode={mode}
							extendX={currentX}
							extendZ={currentZ}
							validX={validX}
							validZ={validZ}
						/>
					),
					this
				),
			this
		)
		return mappedFloor
	}

	renderScene() {
		const { assets, thirdPerson, position } = this.props
		return (
			<Scene className="vr-scene">
				<a-assets>
					<img id="ceilingTexture" alt="sorry" src="assets/CEILING_TILE.jpg" />
					{Object.keys(assets).map(asset => {
						if (assets[asset].objSrc) {
							return (
								<a-asset-item id={`${asset}-obj`} src={assets[asset].objSrc} key={`${asset}-obj`} />
							)
						}
					})}
					{Object.keys(assets).map(asset => {
						if (assets[asset].mtlSrc) {
							return (
								<a-asset-item id={`${asset}-mtl`} src={assets[asset].mtlSrc} key={`${asset}-mtl`} />
							)
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
		)
	}

	render() {
		if (checkPropsExist(this.props)) return this.renderScene()
		else return null
	}
}

function mapStateToProps({ position, data, grid }) {
	return {
		position: { x: position.x, y: position.y, z: position.z },
		thirdPerson: position.thirdPerson,
		assets: data.assets,
		grid: grid.grid,
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		selectedAsset: grid.selectedAsset,
		mode: grid.mode,
		validX: grid.validX,
		validZ: grid.validZ
	}
}

export default connect(mapStateToProps, {
	insertAsset,
	selectAsset,
	fillWalls
})(VRScene)
