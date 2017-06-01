import { POSITION_UPDATE } from "../actions/camera_actions"

export default function(state = { x: 2.5, y: 18, z: 14 }, action) {
  // const command = Object.keys(action.payload).reduce(
  //   (a,b) => a.concat(b)
  // )
  switch (action.type) {
    case POSITION_UPDATE:
      switch (action.payload) {
        case "xUp":
          return { ...state, x: state.x + 1 }
        case "xDown":
          return { ...state, x: state.x - 1 }
        case "yUp":
          return { ...state, y: state.y + 1 }
        case "yDown":
          return { ...state, y: state.y - 1 }
        case "zUp":
          return { ...state, z: state.z - 1 }
        case "zDown":
          return { ...state, z: state.z + 1 }
        case "reset":
          return { ...state, y: 2 }
      }
    default:
      return state
  }
}
