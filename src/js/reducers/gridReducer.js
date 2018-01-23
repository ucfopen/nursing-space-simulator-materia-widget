// Redux Actions
import { INIT_DATA } from "../actions";
import {
	DESELECT_ASSET,
	EDIT_ASSET,
	EDIT_STICKER,
	EXTEND_WALL,
	FILL_WALLS,
	INSERT_ASSET,
	REMOVE_ASSET,
	ROTATE_ASSET,
	SELECT_ASSET_TYPE,
	SELECT_ASSET,
	UPDATE_ASSET_POSITION
} from "../actions/grid_actions";
import {
	deleteItem,
	findValidExtends,
	getCellRotation,
	getItem,
	getStickers,
	insertItem,
	insertWalls,
	isCellAvailable,
	rotateCell,
	setSticker,
	updateStickers
} from "../grid";

// Utilities
import { deepCopy } from "../utils";

export default function(
	state = {
		currentX: null,
		currentZ: null,
		mode: "none",
		selectedAsset: null,
		selectedItem: null,
		validX: null,
		validZ: null,
		ready: false
	},
	action
) {
	switch (action.type) {
		case DESELECT_ASSET: {
			return {
				...state,
				currentX: null,
				currentZ: null,
				mode: "none",
				selectedAsset: null,
				selectedItem: null,
			};
		}

		case EDIT_ASSET: {
			const gridCopy = deepCopy(state.grid);

			// force creation of stickers and update adjacent points
			let newGrid = updateStickers(gridCopy, action.payload.x, action.payload.z, true);
			return {
				...state,
				mode: "editAsset",
				selectedItem: getItem(
					newGrid,
					action.payload.x,
					action.payload.z
				),
				grid: newGrid
			};
		}

		case EDIT_STICKER: {
			const gridCopy = deepCopy(state.grid);
			const stickers = getStickers(
				gridCopy,
				action.payload.x,
				action.payload.z
			);

			const currSticker = stickers[action.payload.side];
			const stickerIndex = action.payload.stickerTypes.indexOf(currSticker);
			const numTypes = action.payload.stickerTypes.length;
			const newStickerIndex =
				(stickerIndex + action.payload.direction + numTypes) % numTypes;
			const newSticker = action.payload.stickerTypes[newStickerIndex];
			const newGrid = setSticker(
				gridCopy,
				action.payload.x,
				action.payload.z,
				action.payload.side,
				newSticker
			)

			return {
				...state,
				grid: newGrid,
				selectedItem: getItem(
					newGrid,
					action.payload.x,
					action.payload.z
				)
			};
		}

		case EXTEND_WALL: {
			const gridCopy = deepCopy(state.grid);
			let validX, validZ;
			[validX, validZ] = findValidExtends(
				gridCopy,
				state.currentX,
				state.currentZ
			);
			return {
				...state,
				currentX: state.currentX,
				currentZ: state.currentZ,
				mode: "extendWall",
				validX: validX,
				validZ: validZ
			};
		}

		case FILL_WALLS: {
			const gridCopy = deepCopy(state.grid);
			const endX = action.payload.x;
			const endZ = action.payload.z;
			const startX = action.payload.extendX;
			const startZ = action.payload.extendZ;

			// Fill validity should be checked before (in vr_scene)
			let newGrid = insertWalls(gridCopy, startX, startZ, endX, endZ);

			return {
				...state,
				currentX: null,
				currentZ: null,
				grid: newGrid,
				mode: "none",
				selectedAsset: null
			};
		}

		case INIT_DATA: {
			return {
				...state,
				grid: action.payload.grid,
				ready: true
			};
		}

		case INSERT_ASSET: {
			const selectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;

			const { x, z } = action.payload;

			const gridCopy = deepCopy(state.grid);

			if (
				!selectedAsset ||
				!isCellAvailable(gridCopy, x, z) ||
				selectedAsset.id === "pov_camera"
			) {
				return {
					...state,
					grid: gridCopy
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
					if (["wall-1", "door-1", "window"].includes(selectedAsset.id)) {
						prevStickers = getStickers(gridCopy, state.currentX, state.currentZ, false);
					}
					newGrid = deleteItem(gridCopy, state.currentX, state.currentZ);
				} else {
					newGrid = gridCopy;
					if (selectedAsset.id == "wall-1") {
						let validX, validZ;
						newGrid = insertItem(
							newGrid,
							selectedAsset.id,
							x,
							z,
							prevRotation
						);
						[validX, validZ] = findValidExtends(
							newGrid,
							x,
							z
						);
						return {
							...state,
							currentX: x,
							currentZ: z,
							grid: newGrid,
							mode: "extendWall",
							validX: validX,
							validZ: validZ
						};
					}
				}
				// need to check other adjacent spaces for larger objects
				if (["bed-1"].includes(selectedAsset.id)) {
					const adjSide = 3 - ((prevRotation + 180) % 360) / 90;
					if (!isCellAvailable(newGrid, x, z, adjSide)) {
						return {
							...state,
							grid: deepCopy(state.grid)
						};
					}
				}
				return {
					...state,
					currentX: x,
					currentZ: z,
					grid: insertItem(
						newGrid,
						selectedAsset.id,
						x,
						z,
						prevRotation,
						prevStickers
					),
					mode: "manipulation"
				};
			}
		}

		case REMOVE_ASSET: {
			const gridCopy = deepCopy(state.grid);
			return {
				...state,
				currentX: null,
				currentZ: null,
				grid: deleteItem(gridCopy, action.payload.x, action.payload.z),
				mode: "none",
				selectedAsset: null
			};
		}

		case ROTATE_ASSET: {
			const gridCopy = deepCopy(state.grid);
			return {
				...state,
				grid: rotateCell(gridCopy, action.payload.x, action.payload.z)
			};
		}

		case SELECT_ASSET: {
			const gridCopy = deepCopy(state.grid);

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
					currentX: action.payload.x,
					currentZ: action.payload.z,
					grid: insertItem(
						gridCopy,
						oldSelectedAsset.id,
						action.payload.x,
						action.payload.z,
						prevRotation
					),
					mode: "manipulation",
					selectedAsset: oldSelectedAsset
				};
			} else {
				return {
					...state,
					currentX: action.payload.x,
					currentZ: action.payload.z,
					mode: "manipulation",
					selectedAsset: action.payload.asset
				};
			}
		}

		case SELECT_ASSET_TYPE: {
			let oldSelectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;
			// If the same asset type is clicked again, deselect it.
			if (
				oldSelectedAsset &&
				action.payload &&
				oldSelectedAsset.id == action.payload.id
			)
				return {
					...state,
					currentX: null,
					currentZ: null,
					mode: "assetTypeSelected",
					selectedAsset: null
				};
			else
				return {
					...state,
					currentX: null,
					currentZ: null,
					mode: "assetTypeSelected",
					selectedAsset: action.payload
				};
		}

		case UPDATE_ASSET_POSITION: {
			const selectedAsset = { ...state.selectedAsset };

			if (!selectedAsset || selectedAsset.id === "pov_camera") {
				return state;
			}

			const gridCopy = deepCopy(state.grid);
			const currentX = state.currentX;
			const currentZ = state.currentZ;
			const currentRotation = getCellRotation(gridCopy, currentX, currentZ);
			const prevStickers = getStickers(gridCopy, currentX, currentZ);
			let adjSide;
			let newGrid;

			if (["bed-1"].includes(selectedAsset.id)) {
				adjSide = 3 - ((currentRotation + 180) % 360) / 90;
			}

			switch (action.payload) {
				case "xRight":
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX + 1, currentZ, adjSide)) {
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
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX - 1, currentZ, adjSide)) {
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
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX, currentZ - 1, adjSide)) {
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
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX, currentZ + 1, adjSide)) {
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

		default:
			return state;
	}
}
