import * as actions from "../../src/js/actions/camera_actions";

describe("Camera Action Tests", () => {
	it("updatePosition", () => {
		const expectedAction = {
			type: actions.CAMERA_UPDATE_POSITION,
			payload: "xUp"
		};
		expect(actions.updateCameraPosition("xUp")).toEqual(expectedAction);
	});

	it("toggleThirdPerson", () => {
		const expectedAction = {
			type: actions.TOGGLE_THIRD_PERSON
		};
		expect(actions.toggleThirdPerson()).toEqual(expectedAction);
	});
});
