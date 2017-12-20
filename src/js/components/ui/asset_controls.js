import React from "react";
import ReactDOM from "react-dom";

// Custom React Components
import AssetTooltip from "../ui/asset_tooltip";
import ConfirmSVG from "../assets/icon-svgs/confirm";
import DeleteSVG from "../assets/icon-svgs/delete";
import DeselectSVG from "../assets/icon-svgs/deselect";
import ExtendSVG from "../assets/icon-svgs/extend";
import RotateSVG from "../assets/icon-svgs/rotate";
import StickerSVG from '../assets/icon-svgs/sticker'
import StickerBox from "../assets/sticker_box";

// Redux Actions and Custom Libraries
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

export default props => {
	// matches keys from props to respective variables
	const { currentX, currentZ, grid, mode, selectedAsset, stickers } = props;

	const {
		deselectAsset,
		editAsset,
		extendWall,
		removeAsset,
		rotateAsset
	} = props;

	if (mode === "extendWall")
		return (
			<div id="UI-selected-asset-options">
				<div>
					<AssetTooltip
						showToolTip={true}
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
		const stickers = getStickers(grid, currentX, currentZ);
		const stickerProps = { stickers, x: currentX, z: currentZ };

		if (props.isMenuVisible) props.toggleMenu();

		return (
			<div id="UI-selected-asset-options">
				<div>
					<AssetTooltip showToolTip={true} toolTipText="Edit this item." />
					<button id="confirm" onClick={() => deselectAsset(true)}>
						<ConfirmSVG />
					</button>
					{selectedAsset.id == "wall-1" ? (
						<div>
							<StickerBox index={TOP} side="top" {...stickerProps} />
							<StickerBox index={RIGHT} side="right" {...stickerProps} />
							<StickerBox index={BOTTOM} side="bottom" {...stickerProps} />
							<StickerBox index={LEFT} side="left" {...stickerProps} />
						</div>
					) : rotation % 180 == 0 ? (
						<div>
							<StickerBox index={TOP} side="top" {...stickerProps} />
							<StickerBox index={BOTTOM} side="bottom" {...stickerProps} />
						</div>
					) : (
						<div>
							<StickerBox index={RIGHT} side="right" {...stickerProps} />
							<StickerBox index={LEFT} side="left" {...stickerProps} />
						</div>
					)}
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
				{selectedAsset.id == "pov_camera" ? (
					<AssetTooltip
						showToolTip={true}
						toolTipText="Select a location to jump into first-person view."
					/>
				) : null}
				{mode == "manipulation" ? (
					<div>
						<button id="confirm" onClick={() => deselectAsset()}>
							<ConfirmSVG />
						</button>
						<button id="rotate" onClick={() => rotateAsset(currentX, currentZ)}>
							<RotateSVG />
						</button>
						<button id="remove" onClick={() => removeAsset(currentX, currentZ)}>
							<DeleteSVG />
						</button>
						{selectedAsset.id == "wall-1" ? (
							<button
								id="extendWall"
								onClick={() => extendWall(currentX, currentZ)}>
								<ExtendSVG />
							</button>
						) : null}
						{selectedAsset.id == 'wall-1' || selectedAsset.id == 'door-1' ? (
							<button id="editAsset" onClick={() => editAsset(currentX, currentZ)}>
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
};
