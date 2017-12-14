import {
	rotateCell,
	deleteItem,
	insertItem,
	isCellAvailable,
	getCellRotation,
	findValidExtends,
	insertWalls,
	getStickers,
	setSticker
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
	FILL_WALLS,
	EDIT_ASSET,
	EDIT_STICKER
} from "../actions/grid_actions";

import { INIT_DATA } from "../actions";

export default function(
	state = {
		currentX: null,
		currentZ: null,
		mode: "none",
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
					mode: "none",
					selectedAsset: null,
					currentX: null,
					currentZ: null
				};
			else
				return {
					...state,
					mode: "none",
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
					mode: "manipulation",
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
					mode: "manipulation",
					selectedAsset: action.payload.asset,
					currentX: action.payload.x,
					currentZ: action.payload.z
				};
			}
		}

		case DESELECT_ASSET: {
			return {
				...state,
				mode: "none",
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
				mode: "none",
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
					prevRotation = 180,
					prevStickers;
				if (state.currentX !== null && state.currentZ !== null) {
					prevRotation = getCellRotation(
						gridCopy,
						state.currentX,
						state.currentZ
					);
					prevStickers = getStickers(
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
							mode: "extendWall",
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
						prevRotation,
						prevStickers
					),
					mode: "manipulation",
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
			const prevStickers = getStickers(
				gridCopy,
				state.currentX,
				state.currentZ
			);
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
								currentRotation,
								prevStickers
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
								currentRotation,
								prevStickers
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
								currentRotation,
								prevStickers
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
								currentRotation,
								prevStickers
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
				mode: "extendWall",
				currentX: state.currentX,
				currentZ: state.currentZ,
				validZ: validZ,
				validX: validX
			};
		}

		case FILL_WALLS: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			const endX = action.payload.x;
			const endZ = action.payload.z;
			const startX = action.payload.extendX;
			const startZ = action.payload.extendZ;
			let newGrid;

			let validFill = (
				startX == endX && action.payload.validZ.includes(endZ) ||
				startZ == endZ && action.payload.validX.includes(endX)
			)

			if (validFill)
				newGrid = insertWalls(gridCopy, startX, startZ, endX, endZ);
			else
			{
				console.log("can't fill here");
				newGrid = gridCopy;
			}
			return {
				...state,
				mode: "none",
				selectedAsset: null,
				currentX: null,
				currentZ: null,
				grid: newGrid
			};
		}

		case EDIT_ASSET: {
			return {
				...state,
				mode: "editAsset"
			};
		}

		case EDIT_STICKER: {
			const gridCopy = JSON.parse(JSON.stringify(state.grid));
			const stickers = getStickers(gridCopy, action.payload.x, action.payload.z);

			const currSticker = stickers[action.payload.side];
			const stickerIndex = action.payload.stickerTypes.indexOf(currSticker);
			const numTypes = action.payload.stickerTypes.length;
			const newStickerIndex = (stickerIndex + action.payload.direction + numTypes) % numTypes;
			const newSticker = action.payload.stickerTypes[newStickerIndex];

			return {
				...state,
				grid: setSticker(
					gridCopy,
					action.payload.x,
					action.payload.z,
					action.payload.side,
					newSticker
				)
			}
		}

		default:
			return state;
	}
}
