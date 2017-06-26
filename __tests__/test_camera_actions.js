import * as actions from "../src/js/actions/camera_actions";

describe("Camera Action Tests", () => {
	it("updatePosition", () => {
		const expectedAction = {
			type: actions.POSITION_UPDATE,
			payload: "xUp"
		};
		expect(actions.updatePosition("xUp")).toEqual(expectedAction);
	});

	it("cameraToggle", () => {
		const expectedAction = {
			type: actions.CAMERA_TOGGLE
		};
		expect(actions.toggleCameraType()).toEqual(expectedAction);
	});
});
