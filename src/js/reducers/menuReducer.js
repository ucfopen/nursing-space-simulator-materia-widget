import {
	SET_CATEGORY,
	TOGGLE_HELP_VISIBILITY,
	TOGGLE_KEYBOARD_SHORTCUTS,
	TOGGLE_MENU_VISIBILITY
} from "../actions/menu_actions";

export default function(
	state = {
		currentCategory: "equipment",
		helpVisible: false,
		shortcutsEnabled: true,
		visible: true },
	action
) {
	switch (action.type) {
		case SET_CATEGORY:
			return { ...state, currentCategory: action.payload };

		case TOGGLE_HELP_VISIBILITY:
			return state.helpVisible
				? {...state, helpVisible: false}
				: {...state, helpVisible: true}

		case TOGGLE_KEYBOARD_SHORTCUTS:
			return state.shortcutsEnabled
				? {...state, shortcutsEnabled: false}
				: {...state, shortcutsEnabled: true}

		case TOGGLE_MENU_VISIBILITY:
			return state.visible
				? { ...state, visible: false }
				: { ...state, visible: true };

		default:
			return state;
	}
}
