import {
	CAMERA_UPDATE_POSITION,
	TOGGLE_THIRD_PERSON,
} from "../actions/camera_actions";

import {
	INSERT_ASSET,
	EDIT_ASSET,
	DESELECT_ASSET
} from "../actions/grid_actions";

export default function(
	state = { x: 14.5, y: 18, z: 9, thirdPerson: true },
	action
) {
	switch (action.type) {
		case CAMERA_UPDATE_POSITION:
			switch (action.payload) {
				case "xRight":
					return { ...state, x: state.x + 1 };
				case "xLeft":
					return { ...state, x: state.x - 1 };
				case "yUp":
					return { ...state, y: state.y + 1 };
				case "yDown":
					return { ...state, y: state.y - 1 };
				case "zUp":
					return { ...state, z: state.z - 1 };
				case "zDown":
					return { ...state, z: state.z + 1 };
				case "reset":
					return { ...state, y: 2 };
			}
		case TOGGLE_THIRD_PERSON:
			return { ...state, x: 14.5, y: 18, z: 9, thirdPerson: true };
		case INSERT_ASSET:
			if (action.payload.assetId === "pov_camera") {
				return {
					...state,
					x: action.payload.x,
					y: 1,
					z: action.payload.z,
					thirdPerson: false
				};
			}
			return state;
		case EDIT_ASSET:
			return {
				...state,
				x: action.payload.x,
				y: 6.5,
				z: action.payload.z
			};
		case DESELECT_ASSET:
			if (action.payload.reset)
				return { ...state, x: 14.5, y: 18, z: 9, thirdPerson: true };
			return state;
		default:
			return state;
	}
}
