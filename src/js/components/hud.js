import React from "react";
import ReactDOM from "react-dom";

// Custom Modules
import AssetControls from "./ui/asset_controls";
import AssetTray from "./ui/asset_tray";
import MovementControls from "./ui/movement_controls";

export default class HUD extends React.Component {
	render() {
		return (
			<div>
				<MovementControls
					thirdPerson={this.props.thirdPerson}
					xUp={this.props.xUp}
					xDown={this.props.xDown}
					yUp={this.props.yUp}
					yDown={this.props.yDown}
					zUp={this.props.zUp}
					zDown={this.props.zDown}
					resetPosition={this.props.resetPosition}
				/>
				{this.props.thirdPerson ? (
					<div>
						{this.props.selectedAsset !== null ? (
							<AssetControls
								manipulateAsset={this.props.manipulateAsset}
								selectedAsset={this.props.selectedAsset}
								selectedAssets={this.props.selectedAssets}
								manipulationMode={this.props.manipulationMode}
							/>
						) : null}
						<AssetTray
							assetsFromFile={this.props.assetsFromFile}
							categories={this.props.categories}
							selectAsset={this.props.selectAsset}
							selectedAsset={this.props.selectedAsset}
							setDeleteMode={this.props.setDeleteMode}
							deleteMultipleMode={this.props.deleteMultipleMode}
						/>
					</div>
				) : (
					<div id="ground-top-panel">
						<button id="back" onClick={this.props.toggleCamera}>
							Back
						</button>
					</div>
				)}
			</div>
		);
	}
}
