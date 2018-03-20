export const DESELECT_ASSET = "DESELECT_ASSET";
export function deselectAsset(restorePosition = false) {
	return {
		type: DESELECT_ASSET,
		payload: { restorePosition }
	};
}

export const EDIT_ASSET = "EDIT_ASSET";
export function editAsset(x, z) {
	return {
		type: EDIT_ASSET,
		payload: { x, z }
	};
}

export const EDIT_STICKER = "EDIT_STICKER";
export function editSticker(x, z, side, direction, stickerTypes) {
	return {
		type: EDIT_STICKER,
		payload: { direction, side, stickerTypes, x, z }
	};
}

export const EXTEND_WALL = "EXTEND_WALL";
export function extendWall(x, z) {
	return {
		type: EXTEND_WALL,
		payload: { x, z }
	};
}

export const FILL_WALLS = "FILL_WALLS";
export function fillWalls(x, z, extendX, extendZ, validX, validZ) {
	return {
		type: FILL_WALLS,
		payload: { extendX, extendZ, validX, validZ, x, z }
	};
}

export const INSERT_ASSET = "INSERT_ASSET";
export function insertAsset(x, z, assetId = null) {
	return {
		type: INSERT_ASSET,
		payload: { assetId, x, z }
	};
}

export const REFRESH_GRID = "REFRESH_GRID";
export function refreshGrid() {
	return { type: REFRESH_GRID };
}

export const REMOVE_ASSET = "REMOVE_ASSET";
export function removeAsset(x, z) {
	return {
		type: REMOVE_ASSET,
		payload: { x, z }
	};
}

export const ROTATE_ASSET = "ROTATE_ASSET";
export function rotateAsset(x, z) {
	return {
		type: ROTATE_ASSET,
		payload: { x, z }
	};
}

export const SELECT_ASSET = "SELECT_ASSET";
export function selectAsset(asset, x, z, dragging = null) {
	return {
		type: SELECT_ASSET,
		payload: { asset, x, z, dragging }
	};
}

export const SELECT_ASSET_TYPE = "SELECT_ASSET_TYPE";
export function selectAssetType(asset) {
	return {
		type: SELECT_ASSET_TYPE,
		payload: asset
	};
}

export const SET_DELETE_MODE = "SET_DELETE_MODE";
export function setDeleteMode() {
	return {
		type: SET_DELETE_MODE
	};
}

export const UPDATE_ASSET_POSITION = "UPDATE_ASSET_POSITION";
export function updateAssetPosition(axisDirection) {
	return {
		type: UPDATE_ASSET_POSITION,
		payload: axisDirection
	};
}

export const DELETE_MULTIPLE_ASSETS = "DELETE_MULTIPLE_ASSETS";
export function deleteMultipleAssets(x, y) {
	return {
		type: DELETE_MULTIPLE_ASSETS,
		payload: { x, y }
	};
}
