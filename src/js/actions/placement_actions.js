export const SELECT_ASSET_TYPE = "select_asset_type"
export const UPDATE_GRID = "update_grid"
export const UPDATE_GRID_NULL = "update_grid_null"
export const SELECT_OBJECT = "select_object"
export const DESELECT_OBJECT = "deselect_object"
export const ROTATE_OBJECT = "rotate_object"
export const REMOVE_OBJECT = "remove_object"

export function selectAssetType(asset) {
  return {
    type: SELECT_ASSET_TYPE,
    payload: asset
  }
}

export function selectObject(asset, x, y) {
  return {
    type: SELECT_OBJECT,
    payload: { asset, x, y }
  }
}

export function deselectObject() {
  return {
    type: DESELECT_OBJECT
  }
}

export function rotateObject(asset, x, y) {
  return {
    type: ROTATE_OBJECT,
    payload: { asset, x, y }
  }
}

export function removeObject(x, y) {
  return {
    type: REMOVE_OBJECT
  }
}

export function updateGrid(x, y, asset) {
  if (asset)
    return {
      type: UPDATE_GRID,
      payload: {
        x,
        y,
        asset
      }
    }
  else
    return {
      type: UPDATE_GRID_NULL
    }
}
