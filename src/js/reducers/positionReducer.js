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
import { getCurrentPosition } from "../components/ui/keyboard_controls"

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
		case CAMERA_UPDATE_POSITION: {
			const pos = getCurrentPosition() || state;
			switch (action.payload) {
				case "xRight":
					return {
						...state,
						x: pos.x + 2,
						z: pos.z
					};
				case "xLeft":
					return {
						...state,
						x: pos.x - 2,
						z: pos.z
					};
				case "yUp": {
					const boundedY = state.y < 30 ? state.y + 2 : state.y;
					return {
						...state,
						x: pos.x,
						y: boundedY,
						z: pos.z
					};
				}
				case "yDown": {
					const boundedY = state.y > 5 ? state.y - 2 : state.y;
					return {
						...state,
						x: pos.x,
						y: boundedY,
						z: pos.z
					};
				}
				case "zUp":
					return {
						...state,
						x: pos.x,
						z: pos.z - 2
					};
				case "zDown":
					return {
						...state,
						x: pos.x,
						z: state.z + 2
					};
				case "reset":
					// math.random to force it to update
					return {
						...state,
						x: 14.5,
						y: 18 + Math.random() * 0.00001,
						z: 9
					};
			}
		}

		case DESELECT_ASSET: {
			// Go back to the previous camera location
			if (action.payload.restorePosition)
				return {
					...state,
					thirdPerson: true,
					x: state.prevX,
					y: state.prevY,
					z: state.prevZ
				};
			const pos = getCurrentPosition() || state;
			return {
				...state,
				x: pos.x,
				y: pos.y,
				z: pos.z
			}
		}

		case EDIT_ASSET:
			return {
				...state,
				prevX: state.x,
				prevY: state.y,
				prevZ: state.z,
				x: action.payload.x,
				y: 6.5,
				z: action.payload.z
			};

		case INSERT_ASSET: {
			if (action.payload.assetId === "pov_camera") {
				return {
					...state,
					thirdPerson: false,
					prevX: state.x,
					prevY: state.y,
					prevZ: state.z,
					x: action.payload.x,
					y: 1,
					z: action.payload.z
				};
			}
			const pos = getCurrentPosition() || state;
			return {
				...state,
				x: pos.x,
				y: pos.y,
				z: pos.z
			}
		}

		case TOGGLE_THIRD_PERSON:
			return {
				...state,
				thirdPerson: !state.thirdPerson,
				x: state.prevX,
				y: state.prevY,
				z: state.prevZ
			};

		default: {
			const pos = getCurrentPosition() || state;
			return {
				...state,
				x: pos.x,
				y: pos.y,
				z: pos.z
			}
		}
	}
}
