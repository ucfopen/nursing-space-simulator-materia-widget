import { rotateCell, deleteItem, insertItem, isCellAvailable } from "../grid";

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
		case INIT_DATA: {
			return {
				...state,
				grid: action.payload.grid,
				categories: action.payload.categories,
				assets: action.payload.assets
			};
		}

		case SELECT_ASSET_TYPE: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: gridCopy,
				selectedAsset: action.payload,
				manipulationMode: false,
				currentX: null,
				currentY: null
			};
		}

		case SELECT_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));

			let oldSelectedAsset;
			if (state.selectedAsset === "none") oldSelectedAsset = "none";
			else oldSelectedAsset = { ...state.selectedAsset };

			if (
				oldSelectedAsset !== "none" &&
				oldSelectedAsset.id !== action.payload.asset.id &&
				oldSelectedAsset.canReplace.includes(action.payload.asset.category)
			) {
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
					grid: gridCopy,
					manipulationMode: true,
					selectedAsset: action.payload.asset,
					currentX: action.payload.x,
					currentY: action.payload.y
				};
			}
		}

		case DESELECT_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: gridCopy,
				manipulationMode: false,
				selectedAsset: "none",
				currentX: null,
				currentY: null
			};
		}

		case ROTATE_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: rotateCell(gridCopy, action.payload.x, action.payload.y)
			};
		}

		case REMOVE_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: deleteItem(gridCopy, action.payload.x, action.payload.y),
				manipulationMode: false,
				selectedAsset: "none",
				currentX: null,
				currentY: null
			};
		}

		case INSERT_ASSET: {
			const selectedAsset = { ...state.selectedAsset };
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			const gridCopy2 = JSON.parse(JSON.stringify(state.grid));
			if (
				selectedAsset === "none" ||
				!isCellAvailable(gridCopy, action.payload.x, action.payload.y)
			) {
				return {
					...state,
					grid: gridCopy
				};
			} else {
				return {
					...state,
					grid: insertItem(
						gridCopy,
						selectedAsset.id,
						action.payload.x,
						action.payload.y
					),
					manipulationMode: true,
					currentX: action.payload.x,
					currentY: action.payload.y
				};
			}
		}

		default: {
			return state;
		}
	}
}
