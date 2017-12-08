import {
	rotateCell,
	deleteItem,
	insertItem,
	isCellAvailable,
	getCellRotation,
	findValidExtends
} from "../grid";

import {
	SELECT_ASSET_TYPE,
	SELECT_ASSET,
	DESELECT_ASSET,
	ROTATE_ASSET,
	REMOVE_ASSET,
	INSERT_ASSET,
	UPDATE_ASSET_POSITION,
	EXTEND_WALL,
	FILL_WALLS
} from "../actions/grid_actions";

import { INIT_DATA } from "../actions";

export default function(
	state = {
		currentX: null,
		currentZ: null,
		extendWallMode: false,
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
			let oldSelectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;
			// If the same asset type is clicked again, deselect it.
			if (oldSelectedAsset && action.payload && oldSelectedAsset.id == action.payload.id)
				return {
					...state,
					manipulationMode: false,
					extendWallMode: false,
					selectedAsset: null,
					currentX: null,
					currentZ: null
				};
			else
				return {
					...state,
					manipulationMode: false,
					extendWallMode: false,
					selectedAsset: action.payload,
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
					extendWallMode: false,
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
					extendWallMode: false,
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
				extendWallMode: false,
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
				extendWallMode: false,
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
					if (selectedAsset.id == "wall-1")
					{
						let validX, validZ;
						newGrid = insertItem(
							newGrid,
							selectedAsset.id,
							action.payload.x,
							action.payload.z,
							prevRotation
						);
						[validX, validZ] = findValidExtends(newGrid, action.payload.x, action.payload.z);
						return {
							...state,
							grid: newGrid,
							extendWallMode: true,
							manipulationMode: true,
							currentX: action.payload.x,
							currentZ: action.payload.z,
							validZ: validZ,
							validX: validX
						};
					}
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
					extendWallMode: false,
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
							extendWallMode: false,
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
							extendWallMode: false,
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
							extendWallMode: false,
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
							extendWallMode: false,
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

		case EXTEND_WALL: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			let validX, validZ;
			[validX, validZ] = findValidExtends(gridCopy, state.currentX, state.currentZ);
			return {
				...state,
				extendWallMode: true,
				manipulationMode: true,
				currentX: state.currentX,
				currentZ: state.currentZ,
				validZ: validZ,
				validX: validX
			};
		}

		case FILL_WALLS: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			const extendX = action.payload.extendX;
			const extendZ = action.payload.extendZ;
			let newGrid = gridCopy;
			let validFill = false;

			if (action.payload.x == extendX &&
				action.payload.validZ.includes(action.payload.z))
					validFill = true;
			if (action.payload.z == extendZ &&
				action.payload.validX.includes(action.payload.x))
					validFill = true;

			if (validFill)
			{
				// If moving in the Z direction
				if (action.payload.x == extendX)
				{
					let x = action.payload.x;
					let z = Math.min(action.payload.z, extendZ);
					let end = Math.max(action.payload.z, extendZ);
					while (z <= end)
					{
						newGrid = insertItem(newGrid, "wall-1", x, z, 0);
						z++;
					}
				}
				else
				{
					let z = action.payload.z;
					let x = Math.min(action.payload.x, extendX);
					let end = Math.max(action.payload.x, extendX);
					while (x <= end)
					{
						newGrid = insertItem(newGrid, "wall-1", x, z, 0);
						x++;
					}
				}

			}
			else
			{
				console.log("can't fill here");
			}
			return {
				...state,
				manipulationMode: false,
				extendWallMode: false,
				selectedAsset: null,
				currentX: null,
				currentZ: null,
				grid: newGrid
			};
		}

		default:
			return state;
	}
}
