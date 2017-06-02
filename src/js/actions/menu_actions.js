export const TOGGLE_MENU_VISIBILITY = "toggle_menu_visibility"
export const SET_CATEGORY = "set_menu_category"

export function toggleMenuVisibility() {
  return {
    type: TOGGLE_MENU_VISIBILITY
  }
}

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: category
  }
}
