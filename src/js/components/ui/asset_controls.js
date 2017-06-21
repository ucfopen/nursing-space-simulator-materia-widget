import React from "react";
import ReactDOM from "react-dom";
import DeleteSVG from "../assets/icon-svgs/delete";
import DeselectSVG from "../assets/icon-svgs/deselect";
import RotateSVG from "../assets/icon-svgs/rotate";
import ConfirmSVG from "../assets/icon-svgs/confirm";

export default props => {
	return (
		<div id="UI-selected-asset-options">
			<span id="selected-asset-label">
				<span className="selected-asset-label-title">
					Currently selected: {props.selectedAsset.asset.title}
				</span>
			</span>
			{props.manipulationMode
				? <div>
						<button
							id="confirm"
							onClick={props.manipulateAsset.bind(
								this,
								props.selectedAsset.asset,
								"deselect",
								props.selectedAsset.x,
								props.selectedAsset.y
							)}>
							<ConfirmSVG />
						</button>
						<button
							id="rotate"
							onClick={props.manipulateAsset.bind(
								this,
								props.selectedAsset.asset,
								"rotate",
								props.selectedAsset.x,
								props.selectedAsset.y
							)}>
							<RotateSVG />
						</button>
						<button
							id="remove"
							onClick={props.manipulateAsset.bind(
								this,
								props.selectedAsset.asset,
								"remove",
								props.selectedAsset.x,
								props.selectedAsset.y
							)}>
							<DeleteSVG />
						</button>
					</div>
				: <button
						id="deselect"
						onClick={props.manipulateAsset.bind(
							this,
							props.selectedAsset.asset,
							"deselect",
							props.selectedAsset.x,
							props.selectedAsset.y
						)}>
						<DeselectSVG />
					</button>}
		</div>
	);
};
