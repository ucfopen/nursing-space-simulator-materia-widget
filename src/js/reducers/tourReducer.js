import { START_TOUR_SECTION } from "../actions/tour_actions";

export default function(state = { running: false, steps: [] }, action) {
	switch (action.type) {
		case START_TOUR_SECTION:
			return { running: true, steps: action.payload.steps };
		default:
			return state;
	}
}
