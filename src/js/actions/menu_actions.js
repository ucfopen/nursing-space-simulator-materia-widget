export const SET_CATEGORY = "SET_MENU_CATEGORY";
export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		payload: category
	};
}

export const TOGGLE_MENU_VISIBILITY = "TOGGLE_MENU_VISIBILITY";
export function toggleMenuVisibility() {
	return {
		type: TOGGLE_MENU_VISIBILITY
	};
}
