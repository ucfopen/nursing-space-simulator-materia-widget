import React from "react";
import ReactDOM from "react-dom";

// Custom Assets
import AssetButton from "./asset_button";
import CategoryButton from "./category_button";

export default class AssetTray extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: this.props.categories[0],
			showMenu: true
		};
	}

	toggleMenu() {
		const showMenu = this.state.showMenu;
		this.setState({ showMenu: !showMenu });
	}
	setCurrentCategory(category) {
		this.setState({ category: category });
	}

	render() {
		const assets = this.props.assetsFromFile;
		const curCategory = this.state.category;
		const selectAsset = this.props.selectAsset;

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
						onClick={selectAsset.bind(
							this,
							{ id: "pov_camera", title: "POV Camera" },
							null,
							null
						)}>
						First-Person Viewer
					</button>
					{this.props.categories.map((category, index) =>
						<CategoryButton
							onClick={this.setCurrentCategory.bind(this, category)}
							key={index}
							category={category}
						/>
					)}
				</div>
				<div id="asset-picker">
					{Object.keys(assets).map(function(asset) {
						if (curCategory === assets[asset].category)
							return (
								<AssetButton
									key={asset}
									item={assets[asset]}
									onClick={selectAsset.bind(this, assets[asset], null, null)}
								/>
							);
					})}
				</div>
			</div>
		);
	}
}
