export const TOGGLE_THIRD_PERSON = "TOGGLE_THIRD_PERSON";
export function toggleThirdPerson() {
	return {
		type: TOGGLE_THIRD_PERSON
	};
}

export const CAMERA_UPDATE_POSITION = "CAMERA_UPDATE_POSITION";
export function updateCameraPosition(axisDirection) {
	return {
		type: CAMERA_UPDATE_POSITION,
		payload: axisDirection
	};
}
