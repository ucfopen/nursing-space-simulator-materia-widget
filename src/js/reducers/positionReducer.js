// Redux Actions
import {
	CAMERA_UPDATE_POSITION,
	TOGGLE_THIRD_PERSON
} from "../actions/camera_actions";

import {
	INSERT_ASSET,
	DESELECT_ASSET,
	EDIT_ASSET
} from "../actions/grid_actions";

export default function(
	state = {
		prevX: 14.5,
		prevY: 18,
		prevZ: 9,
		thirdPerson: true,
		x: 14.5,
		y: 18,
		z: 9
	},
	action
) {
	switch (action.type) {
		case CAMERA_UPDATE_POSITION:
			switch (action.payload) {
				case "xRight":
					return { ...state, x: state.x + 1, prevX: state.x };
				case "xLeft":
					return { ...state, x: state.x - 1, prevX: state.x };
				case "yUp":
					return { ...state, y: state.y + 1, prevY: state.y };
				case "yDown":
					return { ...state, y: state.y - 1, prevY: state.y };
				case "zUp":
					return { ...state, z: state.z - 1, prevZ: state.z };
				case "zDown":
					return { ...state, z: state.z + 1, prevZ: state.x };
				case "reset":
					return {
						...state,
						x: 14.5,
						y: 18,
						z: 9,
						prevX: state.x,
						prevY: state.y,
						prevZ: state.z
					};
			}

		case DESELECT_ASSET:
			// Go back to the previous camera location
			if (action.payload.restorePosition)
				return {
					...state,
					thirdPerson: true,
					x: state.prevX,
					y: state.prevY,
					z: state.prevZ
				};
			return state;

		case EDIT_ASSET:
			return {
				...state,
				x: action.payload.x,
				y: 6.5,
				z: action.payload.z
			};

		case INSERT_ASSET:
			if (action.payload.assetId === "pov_camera") {
				return {
					...state,
					thirdPerson: false,
					x: action.payload.x,
					y: 1,
					z: action.payload.z
				};
			}
			return state;

		case TOGGLE_THIRD_PERSON:
			return {
				...state,
				thirdPerson: true,
				x: state.prevX,
				y: state.prevY,
				z: state.prevZ
			};

		default:
			return state;
	}
}
