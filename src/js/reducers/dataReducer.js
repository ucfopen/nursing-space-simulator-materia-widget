import { INIT_DATA } from "../actions"
import { UPDATE_GRID, UPDATE_GRID_NULL } from "../actions/placement_actions"

//UPDATE_GRID_NULL should be reworked for initial data

export default function(state = {}, action) {
  switch (action.type) {
    case INIT_DATA:
      return {
        ...state,
        categories: action.payload.categories,
        assets: action.payload.assets
      }
    default:
      return state
  }
}
