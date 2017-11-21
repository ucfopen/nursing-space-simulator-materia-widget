import {
	rotateCell,
	deleteItem,
	insertItem,
	isCellAvailable,
	getCellRotation
} from "../grid";

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
		currentZ: null,
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
				currentZ: null
			};
		}

		case SELECT_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));

			let oldSelectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;

			if (
				oldSelectedAsset &&
				oldSelectedAsset.id !== "pov_camera" &&
				oldSelectedAsset.id !== action.payload.asset.id &&
				oldSelectedAsset.canReplace.includes(action.payload.asset.category)
			) {
				const prevRotation = getCellRotation(
					gridCopy,
					action.payload.x,
					action.payload.z
				);
				return {
					...state,
					manipulationMode: true,
					selectedAsset: oldSelectedAsset,
					currentX: action.payload.x,
					currentZ: action.payload.z,
					grid: insertItem(
						gridCopy,
						oldSelectedAsset.id,
						action.payload.x,
						action.payload.z,
						prevRotation
					)
				};
			} else {
				return {
					...state,
					manipulationMode: true,
					selectedAsset: action.payload.asset,
					currentX: action.payload.x,
					currentZ: action.payload.z
				};
			}
		}

		case DESELECT_ASSET: {
			return {
				...state,
				manipulationMode: false,
				selectedAsset: null,
				currentX: null,
				currentZ: null
			};
		}

		case ROTATE_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: rotateCell(gridCopy, action.payload.x, action.payload.z)
			};
		}

		case REMOVE_ASSET: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			return {
				...state,
				grid: deleteItem(gridCopy, action.payload.x, action.payload.z),
				manipulationMode: false,
				selectedAsset: null,
				currentX: null,
				currentZ: null
			};
		}

		case INSERT_ASSET: {
			const selectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;

			const gridCopy = JSON.parse(JSON.stringify(state.grid));

			if (
				!selectedAsset ||
				!isCellAvailable(gridCopy, action.payload.x, action.payload.z) ||
				selectedAsset.id === "pov_camera"
			) {
				return {
					...state
				};
			} else {
				let newGrid,
					prevRotation = 180;
				if (state.currentX !== null && state.currentZ !== null) {
					prevRotation = getCellRotation(
						gridCopy,
						state.currentX,
						state.currentZ
					);
					newGrid = deleteItem(gridCopy, state.currentX, state.currentZ);
				} else {
					newGrid = gridCopy;
				}
				return {
					...state,
					grid: insertItem(
						newGrid,
						selectedAsset.id,
						action.payload.x,
						action.payload.z,
						prevRotation
					),
					manipulationMode: true,
					currentX: action.payload.x,
					currentZ: action.payload.z
				};
			}
		}

		case UPDATE_ASSET_POSITION: {
			const selectedAsset = { ...state.selectedAsset };

			if (!selectedAsset || selectedAsset.id === "pov_camera") {
				return state;
			}

			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			const currentX = state.currentX;
			const currentZ = state.currentZ;
			const currentRotation = getCellRotation(gridCopy, currentX, currentZ);
			let newGrid;

			switch (action.payload) {
				case "xRight":
					if (isCellAvailable(gridCopy, currentX + 1, currentZ)) {
						newGrid = deleteItem(gridCopy, currentX, currentZ);
						return {
							...state,
							currentX: currentX + 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX + 1,
								currentZ,
								currentRotation
							)
						};
					}
					break;
				case "xLeft":
					if (isCellAvailable(gridCopy, currentX - 1, currentZ)) {
						newGrid = deleteItem(gridCopy, currentX, currentZ);
						return {
							...state,
							currentX: currentX - 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX - 1,
								currentZ,
								currentRotation
							)
						};
					}
					break;
				case "zUp":
					if (isCellAvailable(gridCopy, currentX, currentZ - 1)) {
						newGrid = deleteItem(gridCopy, currentX, currentZ);
						return {
							...state,
							currentZ: currentZ - 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX,
								currentZ - 1,
								currentRotation
							)
						};
					}
					break;
				case "zDown":
					if (isCellAvailable(gridCopy, currentX, currentZ + 1)) {
						newGrid = deleteItem(gridCopy, currentX, currentZ);
						return {
							...state,
							currentZ: currentZ + 1,
							grid: insertItem(
								newGrid,
								selectedAsset.id,
								currentX,
								currentZ + 1,
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
