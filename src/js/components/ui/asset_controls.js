import React from "react";
import ReactDOM from "react-dom";
import DeleteSVG from "../assets/icon-svgs/delete";
import RotateSVG from "../assets/icon-svgs/rotate";
import DeselectSVG from "../assets/icon-svgs/deselect";

export default class AssetControls extends React.Component {
	render() {
		return this.props.manipulationMode
			? <div id="UI-selected-asset-options">
					<span id="selected-asset-label">
						<span className="selected-asset-label-title">
							Currently selected: {this.props.selectedAsset.asset.title}
						</span>
					</span>
					<button
						id="deselect"
						onClick={this.props.manipulateAsset.bind(
							this,
							this.props.selectedAsset.asset,
							"deselect",
							this.props.selectedAsset.x,
							this.props.selectedAsset.y
						)}>
						<DeselectSVG />
					</button>
					<button
						id="rotate"
						onClick={this.props.manipulateAsset.bind(
							this,
							this.props.selectedAsset.asset,
							"rotate",
							this.props.selectedAsset.x,
							this.props.selectedAsset.y
						)}>
						<RotateSVG />
					</button>
					<button
						id="remove"
						onClick={this.props.manipulateAsset.bind(
							this,
							this.props.selectedAsset.asset,
							"remove",
							this.props.selectedAsset.x,
							this.props.selectedAsset.y
						)}>
						<DeleteSVG />
					</button>
				</div>
			: null;
	}
}
