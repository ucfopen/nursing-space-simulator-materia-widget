// Redux Actions
import { INIT_DATA } from "../actions";
import {
	DESELECT_ASSET,
	EDIT_ASSET,
	EDIT_STICKER,
	EXTEND_WALL,
	FILL_WALLS,
	INSERT_ASSET,
	REFRESH_GRID,
	REMOVE_ASSET,
	ROTATE_ASSET,
	SELECT_ASSET_TYPE,
	SELECT_ASSET,
	UPDATE_ASSET_POSITION
} from "../actions/grid_actions";
import {
	deleteItem,
	findValidExtends,
	getAdjacentSpaces,
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
		dragging: false,
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
				validX: null,
				validZ: null
			};
		}

		case EDIT_ASSET: {
			const gridCopy = deepCopy(state.grid);
			const { x, z } = action.payload;

			// force creation of stickers and update adjacent points
			let newGrid = updateStickers(gridCopy, x, z, true);
			return {
				...state,
				mode: "editAsset",
				grid: newGrid,
				selectedItem: getItem(newGrid, x, z)
			};
		}

		case EDIT_STICKER: {
			const gridCopy = deepCopy(state.grid);
			const { side, stickerTypes, direction, x, z } = action.payload;
			const stickers = getStickers(gridCopy, x, z);

			const currSticker = stickers[side];
			const stickerIndex = stickerTypes.indexOf(currSticker);
			const numTypes = stickerTypes.length;
			const newStickerIndex =
				(stickerIndex + direction + numTypes) % numTypes;
			const newSticker = stickerTypes[newStickerIndex];
			const newGrid = setSticker(
				gridCopy,
				x,
				z,
				side,
				newSticker
			)

			return {
				...state,
				grid: newGrid,
				selectedItem: getItem(newGrid, x, z)
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
				selectedAsset: null,
				selectedItem: null,
				validX: null,
				validZ: null
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

			if (!selectedAsset || selectedAsset.id === "pov_camera") {
				return state;
			}

			const { x, z } = action.payload;
			const gridCopy = deepCopy(state.grid);
			let newGrid,
				prevRotation = 180,
				prevStickers;

			if (state.currentX !== null && state.currentZ !== null) {
				prevRotation = getCellRotation(
					gridCopy,
					state.currentX,
					state.currentZ
				);
				if (HS_ASSETS[selectedAsset.id].category == "construction") {
					prevStickers = getStickers(gridCopy, state.currentX, state.currentZ, false);
				}
				newGrid = deleteItem(gridCopy, state.currentX, state.currentZ);
			}
			else {
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
					[validX, validZ] = findValidExtends(newGrid, x, z);
					return {
						...state,
						currentX: x,
						currentZ: z,
						dragging: false,
						grid: newGrid,
						mode: "extendWall",
						validX: validX,
						validZ: validZ
					};
				}
			}
			newGrid = insertItem(
				newGrid,
				selectedAsset.id,
				x,
				z,
				prevRotation,
				prevStickers
			)
			let selectedItem = getItem(newGrid, x, z);
			selectedItem.adj = getAdjacentSpaces(newGrid, x, z, selectedAsset);
			return {
				...state,
				currentX: x,
				currentZ: z,
				dragging: false,
				grid: newGrid,
				mode: "manipulation",
				selectedItem: selectedItem
			};
		}

		case REFRESH_GRID: {
			const gridCopy = deepCopy(state.grid);
			return {
				...state,
				dragging: false,
				grid: gridCopy
			};
		}

		case REMOVE_ASSET: {
			const gridCopy = deepCopy(state.grid);
			return {
				...state,
				currentX: null,
				currentZ: null,
				grid: deleteItem(gridCopy, action.payload.x, action.payload.z),
				mode: "none",
				selectedAsset: null,
				selectedItem: null
			};
		}

		case ROTATE_ASSET: {
			const gridCopy = deepCopy(state.grid);
			const { x, z } = action.payload;
			let newGrid = rotateCell(gridCopy, x, z);
			let selectedItem = getItem(newGrid, x, z);
			selectedItem.adj = getAdjacentSpaces(newGrid, x, z, state.selectedAsset);
			return {
				...state,
				grid: newGrid,
				selectedItem: selectedItem
			};
		}

		case SELECT_ASSET: {
			const gridCopy = deepCopy(state.grid);
			const { asset, dragging, x, z } = action.payload;

			let oldSelectedAsset = state.selectedAsset
				? { ...state.selectedAsset }
				: null;

			if (
				oldSelectedAsset &&
				oldSelectedAsset.id !== "pov_camera" &&
				oldSelectedAsset.id !== asset.id &&
				oldSelectedAsset.canReplace.includes(asset.category)
			) {
				const prevRotation = getCellRotation(gridCopy, x, z);
				let newGrid = insertItem(
					gridCopy,
					oldSelectedAsset.id,
					x,
					z,
					prevRotation
				);
				let selectedItem = getItem(newGrid, x, z);
				selectedItem.adj = getAdjacentSpaces(newGrid, x, z, asset);
				return {
					...state,
					currentX: x,
					currentZ: z,
					grid: newGrid,
					mode: "manipulation",
					selectedAsset: oldSelectedAsset,
					selectedItem: getItem(newGrid, x, z)
				};
			} else {
				let selectedItem = getItem(gridCopy, x, z);
				selectedItem.adj = getAdjacentSpaces(gridCopy, x, z, asset);
				return {
					...state,
					currentX: x,
					currentZ: z,
					dragging: dragging,
					mode: "manipulation",
					selectedAsset: asset,
					selectedItem: selectedItem
				};
			}
		}

		case SELECT_ASSET_TYPE: {
			return {
				...state,
				currentX: null,
				currentZ: null,
				mode: "assetTypeSelected",
				selectedAsset: action.payload,
				selectedItem: null
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
			let selectedItem = getItem(gridCopy, currentX, currentZ);
			let adjSide;
			let newGrid;

			if (selectedAsset.id && HS_ASSETS[selectedAsset.id].spanX == 2) {
				adjSide = 3 - ((currentRotation + 180) % 360) / 90;
			}

			switch (action.payload) {
				case "xRight":
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX + 1, currentZ, adjSide)) {
						newGrid = insertItem(
							newGrid,
							selectedAsset.id,
							currentX + 1,
							currentZ,
							currentRotation,
							prevStickers
						);
						selectedItem.adj = getAdjacentSpaces(newGrid, currentX + 1, currentZ, selectedAsset);
						return {
							...state,
							currentX: currentX + 1,
							grid: newGrid,
							selectedItem: selectedItem
						};
					}
					break;
				case "xLeft":
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX - 1, currentZ, adjSide)) {
						newGrid = insertItem(
							newGrid,
							selectedAsset.id,
							currentX - 1,
							currentZ,
							currentRotation,
							prevStickers
						);
						selectedItem.adj = getAdjacentSpaces(newGrid, currentX - 1, currentZ, selectedAsset);
						return {
							...state,
							currentX: currentX - 1,
							grid: newGrid,
							selectedItem: selectedItem
						};
					}
					break;
				case "zUp":
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX, currentZ - 1, adjSide)) {
						newGrid = insertItem(
							newGrid,
							selectedAsset.id,
							currentX,
							currentZ - 1,
							currentRotation,
							prevStickers
						);
						selectedItem.adj = getAdjacentSpaces(newGrid, currentX, currentZ - 1, selectedAsset);
						return {
							...state,
							currentZ: currentZ - 1,
							grid: newGrid,
							selectedItem: selectedItem
						};
					}
					break;
				case "zDown":
					newGrid = deleteItem(gridCopy, currentX, currentZ);
					if (isCellAvailable(gridCopy, currentX, currentZ + 1, adjSide)) {
						newGrid = insertItem(
							newGrid,
							selectedAsset.id,
							currentX,
							currentZ + 1,
							currentRotation,
							prevStickers
						);
						selectedItem.adj = getAdjacentSpaces(newGrid, currentX, currentZ + 1, selectedAsset);
						return {
							...state,
							currentZ: currentZ + 1,
							grid: newGrid,
							selectedItem: selectedItem
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
