import * as actions from "../../src/js/actions/tour_actions";

describe("Tour Action Tests", () => {
	it("startTourSection", () => {
		const expectedAction = {
			type: actions.START_TOUR_SECTION
		};
		expect(actions.startTourSection()).toEqual(expectedAction);
	});

	it("endTour", () => {
		const expectedAction = {
			type: actions.END_TOUR
		};
		expect(actions.endTour()).toEqual(expectedAction);
	});
});
