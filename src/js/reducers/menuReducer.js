import { TOGGLE_MENU_VISIBILITY, SET_CATEGORY } from "../actions/menu_actions";

export default function(
	state = { visible: true, currentCategory: "beds" },
	action
) {
	switch (action.type) {
		case TOGGLE_MENU_VISIBILITY:
			return state.visible
				? { ...state, visible: false }
				: { ...state, visible: true };
		case SET_CATEGORY:
			return { ...state, currentCategory: action.payload };
		default:
			return state;
	}
}
