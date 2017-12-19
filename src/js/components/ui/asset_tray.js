import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Custom Assets
import AssetButton from './asset_button'
import CategoryButton from './category_button'

export default class AssetTray extends Component {
	render() {
		const { assets, currentCategory, selectedAsset, categories } = this.props
		const { selectAssetType, setCategory } = this.props
		return (
			<div id="UI-bottom-panel" className={this.props.showMenu ? 'open' : 'closed'}>
				<button onClick={this.props.toggleMenu} className="drawer-toggle">
					{this.props.showMenu ? '[Close Menu]' : '[Open Menu]'}
				</button>
				<div id="asset-selection-menu">
					<button
						id="vr-viewer-mode"
						className={selectedAsset && selectedAsset.id == 'pov_camera' ? 'active-category' : ''}
						onClick={() =>
							selectAssetType({
								id: 'pov_camera',
								title: 'POV Camera'
							})
						}
					>
						First-Person Viewer
					</button>
					<div id="categories-list">
						{categories.map((category, index) => (
							<CategoryButton
								onClick={setCategory.bind(this, category)}
								key={index}
								category={category}
								currentCategory={currentCategory}
							/>
						))}
					</div>
				</div>
				<div id="asset-picker">
					{Object.keys(assets).map(asset => {
						if (currentCategory === assets[asset].category) {
							return (
								<AssetButton
									key={asset}
									item={assets[asset]}
									selectedAsset={selectedAsset}
									onClick={selectAssetType.bind(this, assets[asset])}
								/>
							)
						}
					})}
				</div>
			</div>
		)
	}
}
