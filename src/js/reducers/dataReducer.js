import { INIT_DATA } from "../actions"

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
