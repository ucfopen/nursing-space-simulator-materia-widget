import { START_TOUR_SECTION } from "../actions/tour_actions";
import { SELECT_ASSET_TYPE, INSERT_ASSET } from "../actions/grid_actions";
import { INIT_DATA } from "../actions/index";

export default function(
	state = {
		tourRunning: true,
		steps: [],
		nextSteps: [],
		runNextSet: false,
		stepSetInQueue: "part1",
		stepCompletion: { 1: false, 2: false, 3: false, 4: false, 5: false }
	},
	action
) {
	switch (action.type) {
		case INIT_DATA:
			return {
				...state,
				runNextSet: true
			};

		case START_TOUR_SECTION:
			return {
				...state,
				steps: action.payload.steps,
				nextSteps: action.payload.nextSteps,
				stepSetInQueue: action.payload.stepSetInQueue,
				stepCompletion: action.payload.stepCompletion,
				runNextSet: false
			};

		case SELECT_ASSET_TYPE:
			if (
				state.tourRunning &&
				action.payload.id !== "pov_camera" &&
				JSON.stringify(state.stepCompletion) ===
					JSON.stringify({ 1: true, 2: false, 3: false, 4: false, 5: false })
			) {
				return {
					...state,
					runNextSet: true,
					stepSetInQueue: "clickInScene"
				};
			} else if (
				state.tourRunning &&
				action.payload.id === "pov_camera" &&
				JSON.stringify(state.stepCompletion) ===
					JSON.stringify({ 1: true, 2: true, 3: true, 4: false, 5: false })
			) {
				return {
					...state,
					runNextSet: true,
					stepSetInQueue: "clickFirstPersonViewer"
				};
			} else return state;

		case INSERT_ASSET:
			if (
				state.tourRunning &&
				JSON.stringify(state.stepCompletion) ===
					JSON.stringify({ 1: true, 2: true, 3: false, 4: false, 5: false }) &&
				action.payload.id !== "pov_camera"
			) {
				return {
					...state,
					runNextSet: true,
					stepSetInQueue: "part2"
				};
			} else return state;

		default:
			return state;
	}
}
