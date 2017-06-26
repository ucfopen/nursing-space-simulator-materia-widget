import menuReducer from "../src/js/reducers/menuReducer";
import * as actions from "../src/js/actions/menu_actions";

describe("menu reducer", () => {
	it("should return the inital state", () => {
		expect(
			menuReducer(
				// State being passed in
				undefined,
				// Action being passed in
				{}
			)
		).toEqual({
			visible: true,
			currentCategory: "beds"
		});
	});

	it("should handle TOGGLE_MENU_VISIBILITY", () => {
		let visible = true;

		expect(
			menuReducer(
				{ visible },
				{
					type: actions.TOGGLE_MENU_VISIBILITY
				}
			)
		).toEqual({
			visible: false
		});

		visible = false;

		expect(
			menuReducer(
				{ visible },
				{
					type: actions.TOGGLE_MENU_VISIBILITY
				}
			)
		).toEqual({
			visible: true
		});
	});

	it("should handle SET_CATEGORY", () => {
		let newCategory = "walls";

		expect(
			menuReducer(
				{},
				{
					type: actions.SET_CATEGORY,
					payload: newCategory
				}
			)
		).toEqual({
			currentCategory: "walls"
		});
	});
});
