export const CAMERA_UPDATE_POSITION = "CAMERA_UPDATE_POSITION";
export const CAMERA_TOGGLE = "CAMERA_TOGGLE_TYPE";

export function updateCameraPosition(axisDirection) {
	return {
		type: CAMERA_UPDATE_POSITION,
		payload: axisDirection
	};
}

export function toggleCameraType() {
	return {
		type: CAMERA_TOGGLE
	};
}
