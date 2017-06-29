import { START_TOUR_SECTION } from "../actions/tour_actions";
import { SELECT_ASSET_TYPE } from "../actions/grid_actions";
import { INIT_DATA } from "../actions/index";

export default function(
	state = {
		steps: [],
		vrSceneClicked: false,
		vrSceneHaveEnteredFirstPerson: false,
		currentStepSet: 0,
		runNextSet: false
	},
	action
) {
	switch (action.type) {
		case INIT_DATA:
			return { ...state, runNextSet: true };
		case START_TOUR_SECTION:
			return {
				...state,
				steps: action.payload.steps,
				currentStepSet: (state.currentStepSet += 1),
				runNextSet: false
			};
		case SELECT_ASSET_TYPE:
			if (
				state.vrSceneClicked === false &&
				action.payload.id !== "pov_camera"
			) {
				return {
					...state,
					vrSceneClicked: true,
					steps: action.payload.steps,
					runNextSet: true,
					currentStepSet: (state.currentStepSet += 1)
				};
			} else return state;
		default:
			return state;
	}
}
