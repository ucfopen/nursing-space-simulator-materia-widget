import React from "react";
import ReactDOM from "react-dom";
import DeleteSVG from "../assets/icon-svgs/delete";
import DeselectSVG from "../assets/icon-svgs/deselect";
import RotateSVG from "../assets/icon-svgs/rotate";
import ConfirmSVG from "../assets/icon-svgs/confirm";
import EditSVG from "../assets/icon-svgs/edit_box";
import StickerBox from "../assets/sticker_box"

import{
	getCellRotation,
	getStickers
} from "../../grid"

import {
	selectAssetType,
	deselectAsset,
	rotateAsset,
	removeAsset,
	extendWall
} from "../../actions/grid_actions.js";

export default props => {
	if (props.mode == "extendWall")
		return (
			<div id="UI-selected-asset-options">
				<div>
					<span id="selected-asset-tooltip" className={props.tooltipText ? "shown" : "hidden"}>
						Click on a valid space to auto-fill walls.
					</span>
					<button id="deselect" onClick={() => props.deselectAsset()}>
						<DeselectSVG />
					</button>
				</div>
			</div>
		);
	if (props.mode == "editAsset")
	{
		const rotation = getCellRotation(props.grid, props.currentX, props.currentZ);
		const stickers = getStickers(props.grid, props.currentX, props.currentZ);
		return (
			<div id="UI-selected-asset-options">
				<div>
					<span id="selected-asset-tooltip" className={props.tooltipText ? "shown" : "hidden"}>
						Edit this item.
					</span>
					<button id="deselect" onClick={() => props.deselectAsset(true)}>
						<DeselectSVG />
					</button>
					{props.selectedAsset.id == "wall-1" ?
						<div>
							<StickerBox
								index={0}
								stickers={stickers}
								x={props.currentX}
								z={props.currentZ}
								side="top"/>
							<StickerBox
								index={1}
								stickers={stickers}
								x={props.currentX}
								z={props.currentZ}
								side="right"/>
							<StickerBox
								index={2}
								stickers={stickers}
								x={props.currentX}
								z={props.currentZ}
								side="bottom"/>
							<StickerBox
								index={3}
								stickers={stickers}
								x={props.currentX}
								z={props.currentZ}
								side="left"/>
						</div>
					: (
						rotation % 180 == 0  ?
							<div>
								<StickerBox
									index={0}
									stickers={stickers}
									x={props.currentX}
									z={props.currentZ}
									side="top"/>
								<StickerBox
									index={2}
									stickers={stickers}
									x={props.currentX}
									z={props.currentZ}
									side="bottom"/>
							</div>
						:	<div>
								<StickerBox
									index={1}
									stickers={stickers}
									x={props.currentX}
									z={props.currentZ}
									side="right"/>
								<StickerBox
									index={3}
									stickers={stickers}
									x={props.currentX}
									z={props.currentZ}
									side="left"/>
							</div>
					)
					}
				</div>
			</div>
		);
	}
	else // manipulationMode
		return (
			<div id="UI-selected-asset-options">
				<span id="selected-asset-label">
					<span className="selected-asset-label-title">
						Currently selected: {props.selectedAsset.title}
					</span>
				</span>
				{props.selectedAsset.id == "pov_camera" ?
					<span id="selected-asset-tooltip" className={props.tooltipText ? "shown" : "hidden"}>
						Select a location to jump into first-person view.
					</span>
					: null
				}
				{props.mode == "manipulation" ? (
					<div>
						<button id="confirm" onClick={() => props.deselectAsset()}>
							<ConfirmSVG />
						</button>
						<button
							id="rotate"
							onClick={() => props.rotateAsset(props.currentX, props.currentZ)}>
							<RotateSVG />
						</button>
						<button
							id="remove"
							onClick={() => props.removeAsset(props.currentX, props.currentZ)}>
							<DeleteSVG />
						</button>
						{props.selectedAsset.id == "wall-1" ?
							<button
								id="extendWall"
								onClick={() => props.extendWall(props.currentX, props.currentZ)}>
								<RotateSVG />
							</button>
							: null
						}
						{props.selectedAsset.id == "wall-1" ||
						 props.selectedAsset.id == "door-1" ?
							<button
								id="editAsset"
								onClick={() => props.editAsset(props.currentX, props.currentZ)}>
								<RotateSVG />
							</button>
							: null
						}
					</div>
				) : <button id="deselect" onClick={() => props.deselectAsset()}>
						<DeselectSVG />
					</button>
				}
			</div>
		);
};
