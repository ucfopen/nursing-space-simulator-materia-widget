import { rotateCell, deleteItem, insertItem, isCellOccupied } from "../grid";

import {
	SELECT_ASSET_TYPE,
	SELECT_ASSET,
	DESELECT_ASSET,
	ROTATE_ASSET,
	REMOVE_ASSET,
	INSERT_ASSET
} from "../actions/grid_actions";

import { INIT_DATA } from "../actions";

export default function(
	state = { manipulationMode: false, selectedAsset: "none" },
	action
) {
	switch (action.type) {
		case INIT_DATA:
			return { ...state, grid: action.payload.grid };
		case SELECT_ASSET_TYPE:
			return {
				...state,
				selectedAsset: action.payload,
				manipulationMode: false,
				currentX: null,
				currentY: null
			};
		case SELECT_ASSET:
			let oldSelectedAsset;
			if (state.selectedAsset === "none") oldSelectedAsset = "none";
			else oldSelectedAsset = { ...state.selectedAsset };

			if (
				oldSelectedAsset !== "none" &&
				oldSelectedAsset.id !== action.payload.asset.id &&
				oldSelectedAsset.canReplace.includes(action.payload.asset.category)
			) {
				let gridCopy = JSON.parse(JSON.stringify(state.grid));
				return {
					...state,
					manipulationMode: true,
					selectedAsset: oldSelectedAsset,
					currentX: action.payload.x,
					currentY: action.payload.y,
					grid: insertItem(
						gridCopy,
						oldSelectedAsset.id,
						action.payload.x,
						action.payload.y
					)
				};
			} else {
				return {
					...state,
					manipulationMode: true,
					selectedAsset: action.payload.asset,
					currentX: action.payload.x,
					currentY: action.payload.y
				};
			}
		case DESELECT_ASSET:
			return {
				...state,
				manipulationMode: false,
				selectedAsset: "none",
				currentX: null,
				currentY: null
			};
		case ROTATE_ASSET: {
			let gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: rotateCell(gridCopy, action.payload.x, action.payload.y)
			};
		}
		case REMOVE_ASSET: {
			let gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: deleteItem(gridCopy, action.payload.x, action.payload.y),
				manipulationMode: false,
				selectedAsset: "none",
				currentX: null,
				currentY: null
			};
		}
		case INSERT_ASSET:
			let gridCopy = JSON.parse(JSON.stringify(state.grid));

			if (
				state.selectedAsset === "none" ||
				isCellOccupied(gridCopy, action.payload.x, action.payload.y)
			)
				return {
					...state
				};

			return {
				...state,
				grid: insertItem(
					gridCopy,
					state.selectedAsset.id,
					action.payload.x,
					action.payload.y
				),
				manipulationMode: true,
				currentX: action.payload.x,
				currentY: action.payload.y
			};
		default:
			return state;
	}
}
