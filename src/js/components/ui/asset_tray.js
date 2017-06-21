import React from "react";
import ReactDOM from "react-dom";

// Custom Assets
import AssetButton from "./asset_button";
import CategoryButton from "./category_button";

export default class AssetTray extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMenu: true
		};
	}

	toggleMenu() {
		const showMenu = this.state.showMenu;
		this.setState({ showMenu: !showMenu });
	}

	render() {
		const assets = this.props.assets;
		const curCategory = this.props.currentCategory;
		const selectAssetType = this.props.selectAssetType;

		return (
			<div
				id="UI-bottom-panel"
				className={this.state.showMenu ? "open" : "closed"}>
				<button onClick={this.toggleMenu.bind(this)} className="drawer-toggle">
					{this.state.showMenu ? "[Close Menu]" : "[Open Menu]"}
				</button>
				<div id="asset-selection-menu">
					<button
						id="vr-viewer-mode"
						onClick={() =>
							this.props.selectAssetType({
								id: "pov_camera",
								title: "POV Camera"
							})}>
						First-Person Viewer
					</button>
					<div id="categories-list">
						{this.props.categories.map((category, index) =>
							<CategoryButton
								onClick={() => this.props.setCategory(category)}
								key={index}
								category={category}
							/>
						)}
					</div>
				</div>
				<div id="asset-picker">
					{Object.keys(assets).map(asset => {
						if (curCategory === assets[asset].category) {
							return (
								<AssetButton
									key={asset}
									item={assets[asset]}
									onClick={() => selectAssetType(assets[asset])}
								/>
							);
						}
					})}
				</div>
			</div>
		);
	}
}
