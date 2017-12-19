import React, { Component } from 'react'
import { checkPropsExist } from '../utils'

import CategoryButton from './ui/category_button'
import AssetControls from './ui/asset_controls'
import AssetTray from './ui/asset_tray'
import MovementControls from './ui/movement_controls'

import { connect } from 'react-redux'

import { updateCameraPosition, toggleThirdPerson } from '../actions/camera_actions.js'
import { toggleMenuVisibility, setCategory } from '../actions/menu_actions'

import {
	selectAssetType,
	deselectAsset,
	rotateAsset,
	removeAsset,
	updateAssetPosition,
	extendWall,
	editAsset
} from '../actions/grid_actions'

export class HUD extends Component {
	renderHUD() {
		const { mode, thirdPerson, selectedAsset } = this.props
		const { updateAssetPosition, updateCameraPosition } = this.props

		const update = mode === 'manipulation' ? updateAssetPosition : updateCameraPosition
		console.log(mode);
		return (
			<div>
				{mode !== 'editAsset' ?
				(<MovementControls
					thirdPerson={thirdPerson}
					update={update}
					updateCameraPosition={updateCameraPosition}
				/>) : null}
				{thirdPerson ? (
					<div>
						{selectedAsset ? (
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
								isMenuVisible={this.props.visible}
								grid={this.props.grid}
								toggleMenu={this.props.toggleMenuVisibility.bind(this)}
							/>
						) : null}
						<AssetTray
							assets={this.props.assets}
							categories={this.props.categories}
							selectAssetType={this.props.selectAssetType}
							selectedAsset={this.props.selectedAsset}
							setCategory={this.props.setCategory}
							currentCategory={this.props.currentCategory}
							toggleMenu={this.props.toggleMenuVisibility.bind(this)}
							showMenu={this.props.visible}
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
		)
	}
	render() {
		if (checkPropsExist(this.props)) return this.renderHUD()
		else return null
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
	}
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
})(HUD)
