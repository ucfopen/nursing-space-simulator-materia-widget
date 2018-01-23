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
					xUp={this.props.xUp.bind(this)}
					xDown={this.props.xDown.bind(this)}
					yUp={this.props.yUp.bind(this)}
					yDown={this.props.yDown.bind(this)}
					zUp={this.props.zUp.bind(this)}
					zDown={this.props.zDown.bind(this)}
					resetPosition={this.props.resetPosition.bind(this)}
				/>
				{this.props.thirdPerson ? (
					<div>
						{this.props.selectedAsset !== null ? (
							<AssetControls
								manipulateAsset={this.props.manipulateAsset}
								selectedAsset={this.props.selectedAsset}
								manipulationMode={this.props.manipulationMode}
							/>
						) : null}
						<AssetTray
							assetsFromFile={this.props.assetsFromFile}
							categories={this.props.categories}
							selectAsset={this.props.selectAsset.bind(this)}
							selectedAsset={this.props.selectedAsset}
							setDeleteMode={this.props.setDeleteMode}
						/>
					</div>
				) : (
					<div id="ground-top-panel">
						<button
							id="back"
							onClick={this.props.toggleCamera.bind(this)}
						>
							Back
						</button>
					</div>
				)}
			</div>
		);
	}
}
