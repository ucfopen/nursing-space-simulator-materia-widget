import React from 'react'
import ReactDOM from 'react-dom'
import AssetTooltip from '../ui/asset_tooltip'
import DeleteSVG from '../assets/icon-svgs/delete'
import DeselectSVG from '../assets/icon-svgs/deselect'
import RotateSVG from '../assets/icon-svgs/rotate'
import ConfirmSVG from '../assets/icon-svgs/confirm'
import ExtendSVG from '../assets/icon-svgs/extend'
import StickerBox from '../assets/sticker_box'

import { getCellRotation, getStickers } from '../../grid'
import { deselectAsset, rotateAsset, removeAsset, extendWall } from '../../actions/grid_actions.js'

const TOP = 0
const RIGHT = 1
const BOTTOM = 2
const LEFT = 3

export default props => {
	// matches keys from props to respective variables
	const { mode, grid, currentX, currentZ, selectedAsset, stickers } = props

	const { deselectAsset, extendWall, rotateAsset, removeAsset, editAsset } = props

	if (mode === 'extendWall')
		return (
			<div id="UI-selected-asset-options">
				<div>
					<AssetTooltip toolTipText="Click on a valid space to auto-fill walls." showToolTip={true}/>
					<button id="deselect" onClick={() => deselectAsset()}>
						<DeselectSVG />
					</button>
				</div>
			</div>
		)
	if (mode === 'editAsset') {
		const rotation = getCellRotation(grid, currentX, currentZ)
		const stickers = getStickers(grid, currentX, currentZ)
		const stickerProps = { stickers, x: currentX, z: currentZ }

		if(props.isMenuVisible) props.toggleMenu();

		return (
			<div id="UI-selected-asset-options">
				<div>
					<AssetTooltip toolTipText="Edit this item." showToolTip={true}/>
					<button id="deselect" onClick={() => deselectAsset(true)}>
						<DeselectSVG />
					</button>
					{selectedAsset.id == 'wall-1' ? (
						<div>
							<StickerBox index={TOP} {...stickerProps} side="top" />
							<StickerBox index={RIGHT} {...stickerProps} side="right" />
							<StickerBox index={BOTTOM} {...stickerProps} side="bottom" />
							<StickerBox index={LEFT} {...stickerProps} side="left" />
						</div>
					) : rotation % 180 == 0 ? (
						<div>
							<StickerBox index={TOP} {...stickerProps} side="top" />
							<StickerBox index={BOTTOM} {...stickerProps} side="bottom" />
						</div>
					) : (
						<div>
							<StickerBox index={RIGHT} {...stickerProps} side="right" />
							<StickerBox index={LEFT} {...stickerProps} side="left" />
						</div>
					)}
				</div>
			</div>
		)
	} else // manipulationMode
		return (
			<div id="UI-selected-asset-options">
				<span id="selected-asset-label">
					<span className="selected-asset-label-title">
						Currently selected: {selectedAsset.title}
					</span>
				</span>
				{selectedAsset.id == 'pov_camera' ? (
					<AssetTooltip toolTipText="Select a location to jump into first-person view." showToolTip={true}/>
				) : null}
				{mode == 'manipulation' ? (
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
						{selectedAsset.id == 'wall-1' ? (
							<button id="extendWall" onClick={() => extendWall(currentX, currentZ)}>
								<ExtendSVG />
							</button>
						) : null}
						{selectedAsset.id == 'wall-1' || selectedAsset.id == 'door-1' ? (
							<button id="editAsset" onClick={() => editAsset(currentX, currentZ)}>
								<RotateSVG />
							</button>
						) : null}
					</div>
				) : (
					<button id="deselect" onClick={() => deselectAsset()}>
						<DeselectSVG />
					</button>
				)}
			</div>
		)
}
