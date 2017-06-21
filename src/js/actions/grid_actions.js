export const DELETE_ASSET = "DELETE_ASSET";
export const DESELECT_ASSET = "DESELECT_ASSET";
export const INSERT_ASSET = "INSERT_ASSET";
export const PLACE_ASSET = "PLACE_ASSET";
export const ROTATE_ASSET = "ROTATE_ASSET";
export const SELECT_ASSET = "SELECT_ASSET";
export const SELECT_ASSET_TYPE = "SELECT_ASSET_TYPE";

export function selectAssetType(asset) {
	return {
		type: SELECT_ASSET_TYPE,
		payload: asset
	};
}

export function selectAsset(asset, x, y) {
	return {
		type: SELECT_ASSET,
		payload: { asset, x, y }
	};
}

export function deselectAsset() {
	return {
		type: DESELECT_ASSET
	};
}

export function rotateAsset(asset, x, y) {
	return {
		type: ROTATE_ASSET,
		payload: { asset, x, y }
	};
}

export function removeAsset(x, y) {
	return {
		type: REMOVE_ASSET,
		payload: { x, y }
	};
}

export function insertAsset(x, y) {
	return {
		type: INSERT_ASSET,
		payload: {
			x,
			y
		}
	};
}
