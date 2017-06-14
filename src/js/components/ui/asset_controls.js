import React from "react";
import ReactDOM from "react-dom";
import DeleteSVG from "../assets/icon-svgs/delete";
import RotateSVG from "../assets/icon-svgs/rotate";
import ConfirmSVG from "../assets/icon-svgs/confirm";

export default class AssetControls extends React.Component {
	render() {
		return (
			<div id="UI-selected-asset-options">
				<span id="selected-asset-label">
					<span className="selected-asset-label-title">
						Currently selected: {this.props.selectedAsset.asset.title}
					</span>
				</span>
				{this.props.manipulationMode
					? <div>
							<button
								id="deselect"
								onClick={this.props.manipulateAsset.bind(
									this,
									this.props.selectedAsset.asset,
									"deselect",
									this.props.selectedAsset.x,
									this.props.selectedAsset.y
								)}>
								<ConfirmSVG />
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
					: null}
			</div>
		);
	}
}
