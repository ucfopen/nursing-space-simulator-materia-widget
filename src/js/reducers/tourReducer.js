// Redux Actions
import {
	DESELECT_ASSET,
	EDIT_ASSET,
	EXTEND_WALL,
	FILL_WALLS,
	INSERT_ASSET,
	SELECT_ASSET_TYPE,
	SELECT_ASSET
} from "../actions/grid_actions";
import { INIT_DATA } from "../actions/index";
import { START_TOUR_SECTION, END_TOUR, RESTART_TOUR } from "../actions/tour_actions";
import { SET_CATEGORY, TOGGLE_HELP_VISIBILITY } from "../actions/menu_actions";
import { TOGGLE_THIRD_PERSON } from "../actions/camera_actions";

import steps from "../steps";

export default function(
	state = {
		currentSteps: steps[0],
		runNextSet: false,
		stepCompletion: 0,
		tourRunning: true
	},
	action
) {
	switch (action.type) {
		case DESELECT_ASSET:
			if (state.tourRunning && state.stepCompletion === 12) {
				return {
					...state,
					runNextSet: true
				};
			}
			return state;

		case EDIT_ASSET:
			if (state.tourRunning && state.stepCompletion === 11) {
				return {
					...state,
					runNextSet: true
				};
			}
			return state;

		case END_TOUR:
			return {
				...state,
				tourRunning: false
			};

		case EXTEND_WALL:
			if (state.tourRunning && state.stepCompletion === 8) {
				return {
					...state,
					runNextSet: true
				};
			}
			return state;

		case FILL_WALLS:
			if (state.tourRunning && state.stepCompletion === 6) {
				return {
					...state,
					runNextSet: true
				};
			}
			if (state.tourRunning && state.stepCompletion === 9) {
				return {
					...state,
					runNextSet: true
				};
			}
			return state;

		case INIT_DATA:
			return {
				...state,
				runNextSet: true
			};

		case INSERT_ASSET:
			if (
				state.tourRunning &&
				state.stepCompletion === 2 &&
				action.payload.assetId === "bed-1"
			) {
				return {
					...state,
					runNextSet: true
				};
			}
			if (
				state.tourRunning &&
				state.stepCompletion === 14 &&
				action.payload.assetId === "pov_camera"
			) {
				return {
					...state,
					runNextSet: true
				};
			}
			if (
				state.tourRunning &&
				state.stepCompletion === 5 &&
				action.payload.assetId === "wall-1"
			) {
				return {
					...state,
					runNextSet: true
				};
			}
			return state;

		case RESTART_TOUR:
			return {
				...state,
				runNextSet: true,
				stepCompletion: 0,
				tourRunning: true
			};

		case SELECT_ASSET:
			if (state.tourRunning && state.stepCompletion === 7) {
				return {
					...state,
					runNextSet: true
				};
			}

			if (state.tourRunning && state.stepCompletion === 10) {
				return {
					...state,
					runNextSet: true
				};
			}
			return state;

		case SELECT_ASSET_TYPE:
			if (
				state.tourRunning &&
				action.payload.id == "bed-1" &&
				state.stepCompletion === 1
			) {
				return {
					...state,
					runNextSet: true
				};
			}
			if (
				state.tourRunning &&
				action.payload.id === "pov_camera" &&
				state.stepCompletion === 13
			) {
				return {
					...state,
					runNextSet: true
				};
			}
			if (
				state.tourRunning &&
				state.stepCompletion === 4 &&
				action.payload.id === "wall-1"
			) {
				return {
					...state,
					runNextSet: true
				};
			}
			return state;

		case SET_CATEGORY:
			if (
				state.tourRunning &&
				state.stepCompletion === 3 &&
				action.payload === "construction"
			)
				return {
					...state,
					runNextSet: true
				};
			return state;

		case START_TOUR_SECTION:
			return {
				...state,
				// steps is imported at top of file
				currentSteps: steps[state.stepCompletion],
				runNextSet: false,
				stepCompletion: state.stepCompletion + 1
			};

		case TOGGLE_HELP_VISIBILITY:
			if (state.tourRunning && state.stepCompletion === 16)
				return {
					...state,
					runNextSet: true
				};

		case TOGGLE_THIRD_PERSON:
			if (state.tourRunning && state.stepCompletion === 15)
				return {
					...state,
					runNextSet: true
				};
			return state;

		default:
			return state;
	}
}
