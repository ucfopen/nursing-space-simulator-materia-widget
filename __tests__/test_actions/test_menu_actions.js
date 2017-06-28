import * as actions from "../../src/js/actions/menu_actions";

describe("Menu Action Tests", () => {
	it("toggleMenuVisibility", () => {
		const expectedAction = {
			type: actions.TOGGLE_MENU_VISIBILITY
		};
		expect(actions.toggleMenuVisibility()).toEqual(expectedAction);
	});

	it("setCategory", () => {
		const expectedAction = {
			type: actions.SET_CATEGORY,
			payload: "walls"
		};
		expect(actions.setCategory("walls")).toEqual(expectedAction);
	});
});
