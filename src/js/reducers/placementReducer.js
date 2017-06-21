import { rotateCell, resetCell, insertItem } from "../grid";

import {
	SELECT_ASSET_TYPE,
	SELECT_OBJECT,
	DESELECT_OBJECT,
	ROTATE_OBJECT,
	REMOVE_OBJECT,
	UPDATE_GRID
} from "../actions/placement_actions";

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
		case SELECT_OBJECT:
			let oldSelectedAsset;
			if (state.selectedAsset === "none") oldSelectedAsset = "none";
			else oldSelectedAsset = { ...state.selectedAsset };

			if (
				oldSelectedAsset.id !== action.payload.asset.id &&
				oldSelectedAsset !== "none"
			) {
				let gridWithReplacedObject = JSON.parse(JSON.stringify(state.grid));
				gridWithReplacedObject[action.payload.x][action.payload.y] = {
					id: oldSelectedAsset.id,
					rotation: 0
				};
				return {
					...state,
					manipulationMode: true,
					selectedAsset: oldSelectedAsset,
					currentX: action.payload.x,
					currentY: action.payload.y,
					grid: gridWithReplacedObject
				};
			} else {
				let gridWithReplacedObject = JSON.parse(JSON.stringify(state.grid));
				gridWithReplacedObject[action.payload.x][action.payload.y] = {
					id: action.payload.asset.id,
					rotation: 0
				};
				return {
					...state,
					manipulationMode: true,
					selectedAsset: action.payload.asset,
					currentX: action.payload.x,
					currentY: action.payload.y,
					grid: gridWithReplacedObject
				};
			}
		case DESELECT_OBJECT:
			return {
				...state,
				manipulationMode: false,
				selectedAsset: "none",
				currentX: null,
				currentY: null
			};
		case ROTATE_OBJECT: {
			let gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: rotateCell(gridCopy, action.payload.x, action.payload.y)
			};
		}
		case REMOVE_OBJECT: {
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
		case UPDATE_GRID:
			if (state.selectedAsset === "none")
				return {
					...state
				};
			let gridCopy = JSON.parse(JSON.stringify(state.grid));
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
