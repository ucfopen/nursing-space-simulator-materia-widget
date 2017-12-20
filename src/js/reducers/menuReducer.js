import { SET_CATEGORY, TOGGLE_MENU_VISIBILITY } from "../actions/menu_actions";

export default function(
	state = { currentCategory: "equipment", visible: true },
	action
) {
	switch (action.type) {
		case SET_CATEGORY:
			return { ...state, currentCategory: action.payload };

		case TOGGLE_MENU_VISIBILITY:
			return state.visible
				? { ...state, visible: false }
				: { ...state, visible: true };

		default:
			return state;
	}
}
