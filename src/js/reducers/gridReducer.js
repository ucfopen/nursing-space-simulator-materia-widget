import { rotateCell, deleteItem, insertItem, isCellAvailable } from "../grid";

import {
	SELECT_ASSET_TYPE,
	SELECT_ASSET,
	DESELECT_ASSET,
	ROTATE_ASSET,
	REMOVE_ASSET,
	INSERT_ASSET,
	UPDATE_ASSET_POSITION
} from "../actions/grid_actions";

import { INIT_DATA } from "../actions";

export default function(
	state = {
		currentX: null,
		currentY: null,
		manipulationMode: false,
		selectedAsset: null
	},
	action
) {
	switch (action.type) {
		case INIT_DATA: {
			return {
				...state,
				grid: action.payload.grid
			};
		}

		case SELECT_ASSET_TYPE: {
			return {
				...state,
				selectedAsset: action.payload,
				manipulationMode: false,
				currentX: null,
				currentY: null
			};
		}

		case SELECT_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));

			let oldSelectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;

			if (
				oldSelectedAsset &&
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
					manipulationMode: true,
					selectedAsset: action.payload.asset,
					currentX: action.payload.x,
					currentY: action.payload.y
				};
			}
		}

		case DESELECT_ASSET: {
			return {
				...state,
				manipulationMode: false,
				selectedAsset: null,
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
				selectedAsset: null,
				currentX: null,
				currentY: null
			};
		}

		case INSERT_ASSET: {
			const selectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			if (
				!selectedAsset ||
				!isCellAvailable(gridCopy, action.payload.x, action.payload.y)
			) {
				return {
					...state
				};
			} else {
				let newGrid =
					state.currentX !== null && state.currentY !== null
						? (newGrid = deleteItem(gridCopy, state.currentX, state.currentY))
						: (newGrid = gridCopy);
				return {
					...state,
					grid: insertItem(
						newGrid,
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
		case UPDATE_ASSET_POSITION: {
			const selectedAsset = { ...state.selectedAsset };
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			const currentX = state.currentX;
			const currentY = state.currentY;
			const currentRotation = gridCopy[currentX][currentY].rotation;
			let newGrid;

			switch (action.payload) {
				case "xUp":
					if (isCellAvailable(gridCopy, currentX + 1, currentY)) {
						newGrid = deleteItem(gridCopy, currentX, currentY);
						return {
							...state,
							currentX: currentX + 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX + 1,
								currentY,
								currentRotation
							)
						};
					}
					break;
				case "xDown":
					if (isCellAvailable(gridCopy, currentX - 1, currentY)) {
						newGrid = deleteItem(gridCopy, currentX, currentY);
						return {
							...state,
							currentX: currentX - 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX - 1,
								currentY,
								currentRotation
							)
						};
					}
					break;
				case "zUp":
					if (isCellAvailable(gridCopy, currentX, currentY - 1)) {
						newGrid = deleteItem(gridCopy, currentX, currentY);
						return {
							...state,
							currentY: currentY - 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX,
								currentY - 1,
								currentRotation
							)
						};
					}
					break;
				case "zDown":
					if (isCellAvailable(gridCopy, currentX, currentY + 1)) {
						newGrid = deleteItem(gridCopy, currentX, currentY);
						return {
							...state,
							currentY: currentY + 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX,
								currentY + 1,
								currentRotation
							)
						};
					}
					break;
			}
			return state;
		}
		default:
			return state;
	}
}
