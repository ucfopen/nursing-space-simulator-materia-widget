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
	SET_DELETE_MODE,
	SET_SELECT_MODE,
	UPDATE_ASSET_POSITION,
	DELETE_MULTIPLE_ASSETS,
	SELECT_MULTIPLE_ASSETS
} from "../actions/grid_actions";
import {
	arrangeItems,
	deleteItem,
	findValidExtends,
	getAdjacentSpaces,
	getCellRotation,
	getItem,
	getStickers,
	insertItem,
	insertWalls,
	isCellAvailable,
	massDelete,
	massSelect,
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
		firstX: null,
		firstY: null,
		mode: "none",
		multipleX: [],
		multipleZ: [],
		selectedAsset: null,
		selectedAssets: [],
		selectedItem: null,
		selectedItems: [],
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
				firstX: null,
				firstY: null,
				mode: "none",
				multipleX: [],
				multipleZ: [],
				selectedAsset: null,
				selectedAssets: [],
				selectedItem: null,
				selectedItems: [],
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
			const newGrid = setSticker(gridCopy, x, z, side, newSticker);

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
				multipleX: [],
				multipleZ: [],
				selectedAssets: [],
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

			if (
				!selectedAsset ||
				selectedAsset.id === "pov_camera" ||
				state.multipleX.length > 1
			) {
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
					prevStickers = getStickers(
						gridCopy,
						state.currentX,
						state.currentZ,
						false
					);
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
			);
			let selectedItem = getItem(newGrid, x, z);
			selectedItem.adj = getAdjacentSpaces(newGrid, x, z, selectedAsset);
			var multipleX = [x];
			var multipleZ = [z];
			var assetArray = [selectedAsset];
			var itemArray = [selectedItem];
			return {
				...state,
				currentX: x,
				currentZ: z,
				dragging: false,
				grid: newGrid,
				mode: "manipulation",
				multipleX: multipleX,
				multipleZ: multipleZ,
				selectedAssets: assetArray,
				selectedItem: selectedItem,
				selectedItems: itemArray
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
			let newGrid = gridCopy;
			if (state.multipleX.length > 0) {
				for (
					var counter = 0;
					counter < state.multipleX.length;
					counter++
				) {
					newGrid = deleteItem(
						newGrid,
						state.multipleX[counter],
						state.multipleZ[counter]
					);
				}
			} else {
				newGrid = deleteItem(
					gridCopy,
					action.payload.x,
					action.payload.z
				);
			}
			return {
				...state,
				currentX: null,
				currentZ: null,
				grid: newGrid,
				mode: "none",
				multipleX: [],
				multipleZ: [],
				selectedAsset: null,
				selectedAssets: [],
				selectedItem: null
			};
		}

		case ROTATE_ASSET: {
			const gridCopy = deepCopy(state.grid);
			const { x, z } = action.payload;
			if (state.multipleX.length > 0) {
				for (
					var counter = 0;
					counter < state.multipleX.length;
					counter++
				) {
					var newGrid = rotateCell(
						gridCopy,
						state.multipleX[counter],
						state.multipleZ[counter]
					);
					var selectedItem = getItem(
						newGrid,
						state.multipleX[counter],
						state.multipleZ[counter]
					);
					selectedItem.adj = getAdjacentSpaces(
						newGrid,
						state.multipleX[counter],
						state.multipleZ[counter],
						state.selectedAsset
					);
				}
			} else {
				var newGrid = rotateCell(gridCopy, x, z);
				var selectedItem = getItem(newGrid, x, z);
				selectedItem.adj = getAdjacentSpaces(
					newGrid,
					x,
					z,
					state.selectedAsset
				);
			}
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
			console.log(asset.id, oldSelectedAsset);
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
				let assetArray = state.selectedAssets;
				let itemArray = state.selectedItems;
				var multipleXArray = state.multipleX;
				var multipleZArray = state.multipleZ;
				var deselect = false;
				var currentX = x;
				var currentZ = z;
				var selectedAsset = asset;
				if (window.shiftKeyIsPressed == true) {
					for (
						var counter = 0;
						counter < multipleXArray.length;
						counter++
					) {
						if (
							multipleXArray[counter] == x &&
							multipleZArray[counter] == z
						) {
							multipleXArray.splice(counter, 1);
							multipleZArray.splice(counter, 1);
							assetArray.splice(counter, 1);
							deselect = true;
							if (multipleXArray.length == 0) {
								selectedAsset = null;
							} else if (multipleXArray.length == 1) {
								selectedAsset = assetArray[0];
							}
						}
					}
					if (!deselect) {
						multipleXArray.push(x);
						multipleZArray.push(z);
						assetArray.push(asset);
						itemArray.push(selectedItem);
					} else if (multipleXArray.length > 0) {
						currentX = multipleXArray[0];
						currentZ = multipleZArray[0];
					} else {
						currentX = null;
						currentZ = null;
					}
				} else {
					multipleXArray = [];
					multipleZArray = [];
					assetArray = [];
					assetArray.push(asset);
					itemArray.push(selectedItem);
					multipleXArray.push(x);
					multipleZArray.push(z);
				}
				return {
					...state,
					currentX: currentX,
					currentZ: currentZ,
					dragging: dragging,
					mode: "manipulation",
					multipleX: multipleXArray,
					multipleZ: multipleZArray,
					selectedAsset: selectedAsset,
					selectedAssets: assetArray,
					selectedItem: selectedItem,
					selectedItems: itemArray
				};
			}
		}

		case SELECT_ASSET_TYPE: {
			return {
				...state,
				currentX: null,
				currentZ: null,
				mode: "assetTypeSelected",
				multipleX: [],
				multipleZ: [],
				selectedAsset: action.payload,
				selectedItem: null
			};
		}

		case SET_DELETE_MODE: {
			return state.mode == "deleteMultiple"
				? { ...state, mode: "" }
				: {
						...state,
						currentX: null,
						currentZ: null,
						mode: "deleteMultiple",
						multipleX: [],
						multipleZ: [],
						selectedAsset: null,
						selectedItem: null
					};
		}

		case SET_SELECT_MODE: {
			return state.mode == "selectMultiple"
				? { ...state, mode: "" }
				: {
						...state,
						currentX: null,
						currentZ: null,
						mode: "selectMultiple",
						selectedAsset: null,
						selectedItem: null
					};
		}

		case DELETE_MULTIPLE_ASSETS: {
			if (state.firstX == null && state.firstY == null) {
				window.lastMouseCoords = {
					x: window.mouseCoords.x,
					y: window.mouseCoords.y
				};
				return {
					...state,
					firstX: action.payload.x,
					firstY: action.payload.y
				};
			}
			const gridCopy = deepCopy(state.grid);

			let positions = {
				xOne: state.firstX,
				yOne: state.firstY,
				xTwo: action.payload.x,
				yTwo: action.payload.y
			};

			let newGrid;

			if (
				positions.xOne > positions.xTwo &&
				positions.yOne > positions.yTwo
			) {
				newGrid = massDelete(
					positions.yTwo,
					positions.yOne,
					positions.xTwo,
					positions.xOne,
					positions.xTwo,
					gridCopy
				);
			} else if (positions.xOne > positions.xTwo) {
				newGrid = massDelete(
					positions.yOne,
					positions.yTwo,
					positions.xTwo,
					positions.xOne,
					positions.xTwo,
					gridCopy
				);
			} else if (positions.yOne > positions.yTwo) {
				newGrid = massDelete(
					positions.yTwo,
					positions.yOne,
					positions.xOne,
					positions.xTwo,
					positions.xOne,
					gridCopy
				);
			} else {
				newGrid = massDelete(
					positions.yOne,
					positions.yTwo,
					positions.xOne,
					positions.xTwo,
					positions.xOne,
					gridCopy
				);
			}

			window.lastMouseCoords = {
				x: null,
				y: null
			};

			return {
				...state,
				firstX: null,
				firstY: null,
				mode: "none",
				grid: newGrid
			};
		}

		case SELECT_MULTIPLE_ASSETS: {
			if (state.firstX == null && state.firstY == null) {
				window.lastMouseCoords = {
					x: window.mouseCoords.x,
					y: window.mouseCoords.y
				};
				return {
					...state,
					firstX: action.payload.x,
					firstY: action.payload.y
				};
			}
			const gridCopy = deepCopy(state.grid);

			let positions = {
				xOne: state.firstX,
				yOne: state.firstY,
				xTwo: action.payload.x,
				yTwo: action.payload.y
			};

			var gridPoints;

			if (
				positions.xOne > positions.xTwo &&
				positions.yOne > positions.yTwo
			) {
				gridPoints = massSelect(
					positions.yTwo,
					positions.yOne,
					positions.xTwo,
					positions.xOne,
					positions.xTwo,
					gridCopy
				);
			} else if (positions.xOne > positions.xTwo) {
				gridPoints = massSelect(
					positions.yOne,
					positions.yTwo,
					positions.xTwo,
					positions.xOne,
					positions.xTwo,
					gridCopy
				);
			} else if (positions.yOne > positions.yTwo) {
				gridPoints = massSelect(
					positions.yTwo,
					positions.yOne,
					positions.xOne,
					positions.xTwo,
					positions.xOne,
					gridCopy
				);
			} else {
				gridPoints = massSelect(
					positions.yOne,
					positions.yTwo,
					positions.xOne,
					positions.xTwo,
					positions.xOne,
					gridCopy
				);
			}
			var multipleZArray = gridPoints[0];
			var multipleXArray = gridPoints[1];

			window.lastMouseCoords = {
				x: null,
				y: null
			};
			return {
				...state,
				currentX: multipleXArray[0],
				currentZ: multipleZArray[0],
				firstX: null,
				firstY: null,
				mode: "none",
				grid: gridCopy,
				multipleX: multipleXArray,
				multipelZ: multipleZArray
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
			var multipleX = state.multipleX;
			var multipleZ = state.multipleZ;
			let assetArray = state.selectedAssets;
			let itemArray = state.selectedItems;
			var stickerHolder = [];
			var rotationHolder = [];
			var i = 0;
			var arrayLength = multipleX.length;
			let selectedItem = getItem(gridCopy, currentX, currentZ);
			let adjSide;
			let newGrid;
			var collision = false;

			for (i; i < arrayLength; i++) {
				stickerHolder.push(
					getStickers(gridCopy, multipleX[i], multipleZ[i])
				);

				rotationHolder.push(
					getCellRotation(gridCopy, multipleX[i], multipleZ[i])
				);

				if (
					assetArray[i].id == "desk" &&
					action.payload == "xLeft" &&
					rotationHolder[i] == 180
				) {
				}
			}
			i = 0;

			var arrangedItems = arrangeItems(
				multipleX,
				multipleZ,
				assetArray,
				itemArray,
				stickerHolder,
				rotationHolder,
				action.payload
			);

			multipleX = arrangedItems[0];
			multipleZ = arrangedItems[1];
			assetArray = arrangedItems[2];
			itemArray = arrangedItems[3];
			stickerHolder = arrangedItems[4];
			rotationHolder = arrangedItems[5];

			switch (action.payload) {
				case "xRight":
					for (i; i < arrayLength; i++) {
						adjSide = null;
						if (
							assetArray[i].id &&
							HS_ASSETS[assetArray[i].id].spanX == 2
						) {
							adjSide =
								3 - ((rotationHolder[i] + 180) % 360) / 90;
						}

						if (assetArray[i].id == "desk") {
							multipleX[i] += 1;
						}

						if (
							isCellAvailable(
								gridCopy,
								multipleX[i],
								multipleZ[i],
								adjSide,
								"xRight"
							)
						) {
							if (assetArray[i].id == "desk") {
								multipleX[i] -= 1;
							}
							newGrid = deleteItem(
								gridCopy,
								multipleX[i],
								multipleZ[i]
							);
							newGrid = insertItem(
								newGrid,
								assetArray[i].id,
								multipleX[i] + 1,
								multipleZ[i],
								rotationHolder[i],
								stickerHolder[i]
							);
							itemArray[i].adj = getAdjacentSpaces(
								newGrid,
								multipleX[i] + 1,
								multipleZ[i],
								assetArray[i]
							);
							multipleX[i] = multipleX[i] + 1;
						} else {
							if (assetArray[i].id == "desk") {
								multipleX[i] -= 1;
							}
							collision = true;
						}
					}
					if (collision) {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: gridCopy,
							multipleX: multipleX,
							multipleZ: multipleZ
						};
					} else {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: newGrid,
							multipleX: multipleX,
							multipleZ: multipleZ
						};
					}
					break;
				case "xLeft":
					for (i; i < arrayLength; i++) {
						adjSide = null;
						if (
							assetArray[i].id &&
							HS_ASSETS[assetArray[i].id].spanX == 2
						) {
							adjSide =
								3 - ((rotationHolder[i] + 180) % 360) / 90;
						}

						if (assetArray[i].id == "desk") {
							multipleX[i] -= 1;
						}

						if (
							isCellAvailable(
								gridCopy,
								multipleX[i] - 1,
								multipleZ[i],
								adjSide,
								"xLeft"
							)
						) {
							if (assetArray[i].id == "desk") {
								multipleX[i] += 1;
							}
							newGrid = deleteItem(
								gridCopy,
								multipleX[i],
								multipleZ[i]
							);
							newGrid = insertItem(
								newGrid,
								assetArray[i].id,
								multipleX[i] - 1,
								multipleZ[i],
								rotationHolder[i],
								stickerHolder[i]
							);
							itemArray[i].adj = getAdjacentSpaces(
								newGrid,
								multipleX[i] - 1,
								multipleZ[i],
								assetArray[i]
							);
							multipleX[i] = multipleX[i] - 1;
						} else {
							if (assetArray[i].id == "desk") {
								multipleX[i] += 1;
							}
							collision = true;
						}
					}
					if (collision) {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: gridCopy,
							multipleX: multipleX,
							multipleZ: multipleZ
						};
					} else {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: newGrid,
							multipleX: multipleX,
							multipleZ: multipleZ
						};
					}
					break;
				case "zUp":
					for (i; i < arrayLength; i++) {
						adjSide = null;
						if (
							assetArray[i].id &&
							HS_ASSETS[assetArray[i].id].spanX == 2
						) {
							adjSide =
								3 - ((rotationHolder[i] + 180) % 360) / 90;
						}
						if (
							isCellAvailable(
								gridCopy,
								multipleX[i],
								multipleZ[i] - 1,
								adjSide,
								"zUp",
								rotationHolder[i]
							)
						) {
							newGrid = deleteItem(
								gridCopy,
								multipleX[i],
								multipleZ[i]
							);
							newGrid = insertItem(
								newGrid,
								assetArray[i].id,
								multipleX[i],
								multipleZ[i] - 1,
								rotationHolder[i],
								stickerHolder[i]
							);
							itemArray[i].adj = getAdjacentSpaces(
								newGrid,
								multipleX[i],
								multipleZ[i] - 1,
								assetArray[i]
							);
							multipleZ[i] = multipleZ[i] - 1;
						} else {
							collision = true;
						}
					}
					if (collision) {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: gridCopy,
							multipleX: multipleX,
							multipleZ: multipleZ
						};
					} else {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: newGrid,
							multipleX: multipleX,
							multipleZ: multipleZ
						};
					}
					break;
				case "zDown":
					for (i; i < arrayLength; i++) {
						adjSide = null;
						if (
							assetArray[i].id &&
							HS_ASSETS[assetArray[i].id].spanX == 2
						) {
							adjSide =
								3 - ((rotationHolder[i] + 180) % 360) / 90;
						}
						if (assetArray[i].id == "desk") {
								multipleX[i] += 1;
							}
						if (
							isCellAvailable(
								gridCopy,
								multipleX[i],
								multipleZ[i],
								adjSide,
								"zDown",
								rotationHolder[i]
							)
						) {
							if (assetArray[i].id == "desk") {
								multipleX[i] -= 1;
							}
							newGrid = deleteItem(
								gridCopy,
								multipleX[i],
								multipleZ[i]
							);
							newGrid = insertItem(
								newGrid,
								assetArray[i].id,
								multipleX[i],
								multipleZ[i] + 1,
								rotationHolder[i],
								stickerHolder[i]
							);
							itemArray[i].adj = getAdjacentSpaces(
								newGrid,
								multipleX[i],
								multipleZ[i] + 1,
								assetArray[i]
							);
							multipleZ[i] = multipleZ[i] + 1;
						} else {
							if (assetArray[i].id == "desk") {
								multipleX[i] -= 1;
							}
							collision = true;
						}
					}
					if (collision) {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: gridCopy,
							multipleX: multipleX,
							multipleZ: multipleZ
						};
					} else {
						return {
							...state,
							currentX: multipleX[arrayLength - 1],
							currentZ: multipleZ[arrayLength - 1],
							grid: newGrid,
							multipleX: multipleX,
							multipleZ: multipleZ
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
