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
import { getStickers } from "../../grid";

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

export default class AssetControls extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		// matches keys from props to respective variables
		const {
			currentX,
			currentZ,
			mode,
			multipleX,
			multipleZ,
			selectedAsset,
			selectedItem,
			shortcutsEnabled,
			stickers
		} = this.props;

		const {
			deselectAsset,
			editAsset,
			editSticker,
			extendWall,
			removeAsset,
			rotateAsset,
			updateTemporaryTooltip
		} = this.props;

		if (mode === "extendWall") {
			return (
				// preventDefault on mousedown prevents items underneath from being dragged
				<div
					id="UI-selected-asset-options"
					onMouseDown={e => e.preventDefault()}
				>
					<div>
						<button
							id="deselect"
							onClick={() => deselectAsset()}
							onMouseEnter={() =>
								updateTemporaryTooltip(true, "Back")
							}
							onMouseLeave={() => updateTemporaryTooltip(false)}
						>
							<DeselectSVG shortcutsEnabled={shortcutsEnabled} />
						</button>
					</div>
				</div>
			);
		}
		if (mode === "editAsset") {
			const rotation = selectedItem.rotation;
			const stickers = selectedItem.stickers
				? selectedItem.stickers
				: ["0", "0", "0", "0"];
			const stickerProps = {
				editSticker,
				stickers,
				rotation,
				id: selectedAsset.id,
				x: currentX,
				z: currentZ
			};

			return (
				<div
					id="UI-selected-asset-options"
					onMouseDown={e => e.preventDefault()}
				>
					<div>
						<button
							id="confirm"
							onClick={() => deselectAsset(true)}
							onMouseEnter={() =>
								updateTemporaryTooltip(true, "Confirm")
							}
							onMouseLeave={() => updateTemporaryTooltip(false)}
						>
							<ConfirmSVG shortcutsEnabled={shortcutsEnabled} />
						</button>
						<StickerBox index={TOP} side="top" {...stickerProps} />
						<StickerBox
							index={RIGHT}
							side="right"
							{...stickerProps}
						/>
						<StickerBox
							index={BOTTOM}
							side="bottom"
							{...stickerProps}
						/>
						<StickerBox
							index={LEFT}
							side="left"
							{...stickerProps}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div
					id="UI-selected-asset-options"
					onMouseDown={e => e.preventDefault()}
				>
					{mode != "assetTypeSelected" ? (
						<span id="selected-asset-label">
							<span className="selected-asset-label-title">
								Currently selected:{" "}
								{multipleX.length > 1
									? "Multiple Assets"
									: selectedAsset.title}
							</span>
						</span>
					) : null}
					{mode == "manipulation" ? (
						<div>
							<button
								id="confirm"
								onClick={() => deselectAsset()}
								onMouseEnter={() =>
									updateTemporaryTooltip(true, "Confirm")
								}
								onMouseLeave={() =>
									updateTemporaryTooltip(false)
								}
							>
								<ConfirmSVG
									shortcutsEnabled={shortcutsEnabled}
								/>
							</button>
							<button
								id="rotate"
								onClick={() => rotateAsset(currentX, currentZ)}
								onMouseEnter={() =>
									updateTemporaryTooltip(true, "Rotate")
								}
								onMouseLeave={() =>
									updateTemporaryTooltip(false)
								}
							>
								<RotateSVG
									shortcutsEnabled={shortcutsEnabled}
								/>
							</button>
							<button
								id="remove"
								onClick={() => removeAsset(currentX, currentZ)}
								onMouseEnter={() =>
									updateTemporaryTooltip(true, "Remove")
								}
								onMouseLeave={() =>
									updateTemporaryTooltip(false)
								}
							>
								<DeleteSVG
									shortcutsEnabled={shortcutsEnabled}
								/>
							</button>
							{selectedAsset.id == "wall-1" &&
							multipleX.length < 2 ? (
								<button
									id="extendWall"
									onClick={() =>
										extendWall(currentX, currentZ)
									}
									onMouseEnter={() =>
										updateTemporaryTooltip(
											true,
											"Extend Wall"
										)
									}
									onMouseLeave={() =>
										updateTemporaryTooltip(false)
									}
								>
									<ExtendSVG
										shortcutsEnabled={shortcutsEnabled}
									/>
								</button>
							) : null}
							{(selectedAsset.id == "wall-1" ||
								selectedAsset.id == "door-1") &&
							multipleX.length < 2 ? (
								<button
									id="editAsset"
									onClick={() =>
										editAsset(currentX, currentZ)
									}
									onMouseEnter={() =>
										updateTemporaryTooltip(
											true,
											"Attach Items to this Wall"
										)
									}
									onMouseLeave={() =>
										updateTemporaryTooltip(false)
									}
								>
									<StickerSVG
										shortcutsEnabled={shortcutsEnabled}
									/>
								</button>
							) : null}
						</div>
					) : (
						// assetTypeSelected
						<button
							id="deselect"
							onClick={() => deselectAsset()}
							onMouseEnter={() =>
								updateTemporaryTooltip(true, "Cancel")
							}
							onMouseLeave={() => updateTemporaryTooltip(false)}
						>
							<DeselectSVG shortcutsEnabled={shortcutsEnabled} />
						</button>
					)}
				</div>
			);
		}
	}
}
