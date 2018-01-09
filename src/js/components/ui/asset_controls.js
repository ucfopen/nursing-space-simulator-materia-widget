import React, { Component } from "react";
import ReactDOM from "react-dom";

// Custom React Components
import AssetTooltip from "../ui/asset_tooltip";
import ConfirmSVG from "../assets/icon-svgs/confirm";
import DeleteSVG from "../assets/icon-svgs/delete";
import DeselectSVG from "../assets/icon-svgs/deselect";
import ExtendSVG from "../assets/icon-svgs/extend";
import RotateSVG from "../assets/icon-svgs/rotate";
import StickerSVG from "../assets/icon-svgs/sticker";
import StickerBox from "../assets/sticker_box";

// Redux Actions
import { getCellRotation, getStickers } from "../../grid";
import {
	deselectAsset,
	extendWall,
	removeAsset,
	rotateAsset
} from "../../actions/grid_actions.js";

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

export default class AssetControls extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showTooltip: false,
			toolTipText: "abc"
		};
	}

	onMouseEnter(text) {
		this.setState({ showTooltip: true, toolTipText: text });
	}

	onMouseLeave() {
		this.setState({ showTooltip: false });
	}

	render() {
		// matches keys from props to respective variables
		const { currentX, currentZ, grid, mode, selectedAsset, stickers } = this.props;

		const {
			deselectAsset,
			editAsset,
			editSticker,
			extendWall,
			removeAsset,
			rotateAsset
		} = this.props;

		if (mode === "extendWall")
			return (
				<div id="UI-selected-asset-options">
					<div>
						<AssetTooltip
							showTooltip={true}
							toolTipText="Click on a valid space to auto-fill walls."
						/>
						<button id="deselect" onClick={() => deselectAsset()}>
							<DeselectSVG />
						</button>
					</div>
				</div>
			);
		if (mode === "editAsset") {
			const rotation = getCellRotation(grid, currentX, currentZ);
			const stickers = getStickers(grid, currentX, currentZ, true);
			const stickerProps = {
				editSticker,
				stickers,
				rotation,
				id: selectedAsset.id,
				x: currentX,
				z: currentZ
			};

			return (
				<div id="UI-selected-asset-options">
					<div>
						<AssetTooltip showTooltip={true} toolTipText="Edit this item." />
						<button id="confirm" onClick={() => deselectAsset(true)}>
							<ConfirmSVG />
						</button>
						<StickerBox index={TOP} side="top" {...stickerProps} />
						<StickerBox index={RIGHT} side="right" {...stickerProps} />
						<StickerBox index={BOTTOM} side="bottom" {...stickerProps} />
						<StickerBox index={LEFT} side="left" {...stickerProps} />
					</div>
				</div>
			);
		} else // manipulationMode
			return (
				<div id="UI-selected-asset-options">
					<span id="selected-asset-label">
						<span className="selected-asset-label-title">
							Currently selected: {selectedAsset.title}
						</span>
					</span>
					<AssetTooltip
						showTooltip={this.state.showTooltip}
						toolTipText={this.state.toolTipText}
					/>
					{mode == "manipulation" ? (
						<div>
							<button
								id="confirm"
								onClick={() => deselectAsset()}
								onMouseEnter={() => this.onMouseEnter("Confirm")}
								onMouseLeave={() => this.onMouseLeave()}>
								<ConfirmSVG/>
							</button>
							<button
								id="rotate"
								onClick={() => rotateAsset(currentX, currentZ)}
								onMouseEnter={() => this.onMouseEnter("Rotate")}
								onMouseLeave={() => this.onMouseLeave()}>
								<RotateSVG />
							</button>
							<button
								id="remove"
								onClick={() => removeAsset(currentX, currentZ)}
								onMouseEnter={() => this.onMouseEnter("Remove")}
								onMouseLeave={() => this.onMouseLeave()}>
								<DeleteSVG />
							</button>
							{selectedAsset.id == "wall-1" ? (
								<button
									id="extendWall"
									onClick={() => extendWall(currentX, currentZ)}
									onMouseEnter={() => this.onMouseEnter("Extend Wall")}
									onMouseLeave={() => this.onMouseLeave()}>
									<ExtendSVG />
								</button>
							) : null}
							{selectedAsset.id == "wall-1" || selectedAsset.id == "door-1" ? (
								<button
									id="editAsset"
									onClick={() => editAsset(currentX, currentZ)}
									onMouseEnter={() => this.onMouseEnter("Attach Mode")}
									onMouseLeave={() => this.onMouseLeave()}>
									<StickerSVG />
								</button>
							) : null}
						</div>
					) : (
						<button id="deselect" onClick={() => deselectAsset()}>
							<DeselectSVG />
						</button>
					)}
				</div>
			);
	}
}
