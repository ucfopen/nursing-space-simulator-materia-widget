export const POSITION_UPDATE = "position_update"
export const CAMERA_TOGGLE = "camera_toggle_type"

export function updatePosition(axisDirection) {
  return {
    type: POSITION_UPDATE,
    payload: axisDirection
  }
}

export function toggleCameraType() {
  return {
    type: CAMERA_TOGGLE
  }
}
