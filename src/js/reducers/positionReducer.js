import {
	CAMERA_UPDATE_POSITION,
	TOGGLE_THIRD_PERSON
} from "../actions/camera_actions";

import { INSERT_ASSET } from "../actions/grid_actions";

export default function(
	state = { x: 2.5, y: 18, z: 14, thirdPerson: true },
	action
) {
	switch (action.type) {
		case CAMERA_UPDATE_POSITION:
			switch (action.payload) {
				case "xUp":
					return { ...state, x: state.x + 1 };
				case "xDown":
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
			return { ...state, x: 2.5, y: 18, z: 14, thirdPerson: true };
		case INSERT_ASSET:
			if (action.payload.assetId === "pov_camera") {
				return {
					...state,
					x: action.payload.x,
					y: 1,
					z: action.payload.y,
					thirdPerson: false
				};
			}
			return state;
		default:
			return state;
	}
}
