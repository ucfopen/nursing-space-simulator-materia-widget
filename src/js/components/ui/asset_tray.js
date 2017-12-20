import React, { Component } from "react";
import ReactDOM from "react-dom";

// Custom React Components
import AssetButton from "./asset_button";
import CategoryButton from "./category_button";

export default class AssetTray extends Component {
	render() {
		const { assets, categories, currentCategory, selectedAsset } = this.props;
		const { selectAssetType, setCategory } = this.props;
		return (
			<div
				className={this.props.showMenu ? "open" : "closed"}
				id="UI-bottom-panel">
				<button className="drawer-toggle" onClick={this.props.toggleMenu}>
					{this.props.showMenu ? "[Close Menu]" : "[Open Menu]"}
				</button>
				<div id="asset-selection-menu">
					<button
						className={
							selectedAsset && selectedAsset.id == "pov_camera"
								? "active-category"
								: ""
						}
						id="vr-viewer-mode"
						onClick={() =>
							selectAssetType({
								id: "pov_camera",
								title: "POV Camera"
							})
						}>
						First-Person Viewer
					</button>
					<div id="categories-list">
						{categories.map((category, index) => (
							<CategoryButton
								category={category}
								currentCategory={currentCategory}
								key={index}
								onClick={setCategory.bind(this, category)}
							/>
						))}
					</div>
				</div>
				<div id="asset-picker">
					{Object.keys(assets).map(asset => {
						if (currentCategory === assets[asset].category) {
							return (
								<AssetButton
									item={assets[asset]}
									key={asset}
									onClick={selectAssetType.bind(this, assets[asset])}
									selectedAsset={selectedAsset}
								/>
							);
						}
					})}
				</div>
			</div>
		);
	}
}
