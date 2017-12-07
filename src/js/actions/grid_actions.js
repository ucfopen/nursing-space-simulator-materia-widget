export const DELETE_ASSET = "DELETE_ASSET";
export const DESELECT_ASSET = "DESELECT_ASSET";
export const INSERT_ASSET = "INSERT_ASSET";
export const PLACE_ASSET = "PLACE_ASSET";
export const ROTATE_ASSET = "ROTATE_ASSET";
export const SELECT_ASSET = "SELECT_ASSET";
export const SELECT_ASSET_TYPE = "SELECT_ASSET_TYPE";
export const REMOVE_ASSET = "REMOVE_ASSET";
export const UPDATE_ASSET_POSITION = "UPDATE_ASSET_POSITION";
export const EXTEND_WALL = "EXTEND_WALL";
export const FILL_WALLS = "FILL_WALLS";

export function selectAssetType(asset) {
	return {
		type: SELECT_ASSET_TYPE,
		payload: asset
	};
}

export function selectAsset(asset, x, z) {
	return {
		type: SELECT_ASSET,
		payload: { asset, x, z }
	};
}

export function deselectAsset() {
	return {
		type: DESELECT_ASSET
	};
}

export function rotateAsset(x, z) {
	return {
		type: ROTATE_ASSET,
		payload: { x, z }
	};
}

export function removeAsset(x, z) {
	return {
		type: REMOVE_ASSET,
		payload: { x, z }
	};
}

export function insertAsset(x, z, assetId = null) {
	return {
		type: INSERT_ASSET,
		payload: { assetId, x, z }
	};
}

export function updateAssetPosition(axisDirection) {
	return {
		type: UPDATE_ASSET_POSITION,
		payload: axisDirection
	};
}

export function extendWall(x, z) {
	return {
		type: EXTEND_WALL,
		payload: { x, z }
	};
}

export function fillWalls(x, z, assetId = null, extendX, extendZ, validX, validZ) {
	return {
		type: FILL_WALLS,
		payload: { assetId, x, z, extendX, extendZ, validX, validZ }
	};
}
