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
					return { ...state, x: state.x + 2, prevX: state.x + 2 };
				case "xLeft":
					return { ...state, x: state.x - 2, prevX: state.x - 2 };
				case "yUp": {
					const boundedY = state.y < 30 ? state.y + 2 : state.y;
					return {
						...state,
						y: boundedY,
						prevY: boundedY
					};
				}
				case "yDown": {
					const boundedY = state.y > 2 ? state.y - 2 : state.y;
					return {
						...state,
						y: boundedY,
						prevY: boundedY
					};
				}
				case "zUp":
					return { ...state, z: state.z - 2, prevZ: state.z - 2 };
				case "zDown":
					return { ...state, z: state.z + 2, prevZ: state.z + 2 };
				case "reset":
					return {
						...state,
						x: 14.5,
						y: 18,
						z: 9,
						prevX: 14.5,
						prevY: 18,
						prevZ: 9
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
				thirdPerson: !state.thirdPerson,
				x: state.prevX,
				y: state.prevY,
				z: state.prevZ
			};

		default:
			return state;
	}
}
