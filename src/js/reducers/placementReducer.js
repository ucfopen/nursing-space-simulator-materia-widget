import {
  SELECT_ASSET_TYPE,
  SELECT_OBJECT,
  DESELECT_OBJECT,
  ROTATE_OBJECT,
  REMOVE_OBJECT,
  UPDATE_GRID,
  UPDATE_GRID_NULL
} from "../actions/placement_actions"

import { INIT_DATA } from "../actions"

export default function(
  state = { manipulationMode: false, selectedAsset: null },
  action
) {
  switch (action.type) {
    case INIT_DATA:
      return { ...state, grid: action.payload.grid }
    case SELECT_ASSET_TYPE:
      return { ...state, selectedAsset: action.payload }
    case SELECT_OBJECT:
      return {
        ...state,
        selectedAsset: action.payload.asset,
        manipulationMode: true,
        currentX: action.payload.x,
        currentY: action.payload.y
      }
    case DESELECT_OBJECT:
      return {
        ...state,
        manipulationMode: false,
        currentX: null,
        currentY: null
      }
    case ROTATE_OBJECT: {
      let gridWithRotation = [...state.grid]
      const currentRotation =
        gridWithRotation[action.payload.x][action.payload.y].rotation
      gridWithRotation[action.payload.x][action.payload.y] = {
        id: action.payload.asset.id,
        rotation: (currentRotation + 90) % 360
      }
      return { ...state, grid: gridWithRotation }
    }
    case REMOVE_OBJECT: {
      let gridWithObjectRemoved = [...state.grid]
      gridWithObjectRemoved[action.payload.x][action.payload.y] = "0"
      return {
        ...state,
        grid: gridWithObjectRemoved,
        manipulationMode: false
      }
    }
    case UPDATE_GRID:
      let updatedGrid = [...state.grid]
      updatedGrid[action.payload.x][action.payload.y] = {
        id: action.payload.asset.id,
        rotation: 0
      }
      return { ...state, grid: updatedGrid }
    case UPDATE_GRID_NULL:
      return state
    default:
      return state
  }
}
