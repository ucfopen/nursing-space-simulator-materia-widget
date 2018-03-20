import React, { Component } from "react";
import ReactDOM from "react-dom";

// Custom React Components
import AssetButton from "./asset_button";
import CategoryButton from "./category_button";

export default class AssetTray extends Component {
	render() {
		const { currentCategory, selectedAsset } = this.props;
		const { selectAssetType, setCategory } = this.props;
		const { setDeleteMode, mode } = this.props;
		return (
			<div
				className={this.props.isMenuVisible ? "open" : "closed"}
				id="UI-bottom-panel"
				// preventDefault on mousedown prevents items underneath from being dragged
				onMouseDown={e => e.preventDefault()}
			>
				<button
					className="drawer-toggle"
					onClick={this.props.toggleMenu}
				>
					{this.props.isMenuVisible ? "[Close Menu]" : "[Open Menu]"}
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
						}
					>
						First-Person Viewer
					</button>
					<button
						className={
							mode == "deleteMultiple" ? "active-category" : ""
						}
						id="vr-viewer-mode"
						onClick={() => setDeleteMode()}
					>
						Delete Multiple Assets
					</button>
					<div id="categories-list">
						{HS_CATEGORIES.map((category, index) => (
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
					{Object.keys(HS_ASSETS).map(asset => {
						if (currentCategory === HS_ASSETS[asset].category) {
							return (
								<AssetButton
									item={HS_ASSETS[asset]}
									key={asset}
									onClick={selectAssetType.bind(
										this,
										HS_ASSETS[asset]
									)}
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
