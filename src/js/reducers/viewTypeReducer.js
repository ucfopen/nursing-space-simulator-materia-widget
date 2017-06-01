import { CAMERA_TOGGLE } from "../actions/camera_actions"

export default function(state = true, action) {
  // const command = Object.keys(action.payload).reduce(
  //   (a,b) => a.concat(b)
  // )
  switch (action.type) {
    case CAMERA_TOGGLE:
      return state ? false : true
    default:
      return state
  }
}
