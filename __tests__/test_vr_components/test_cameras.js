import React from "react";
import renderer from "react-test-renderer";
import { Entity } from "aframe-react";
import Aframe from "aframe";

import CameraFP from "../../src/js/components/assets/camera_fp";
import CameraTP from "../../src/js/components/assets/camera_tp";

describe("Camera tests", () => {
	it("renders CameraFP correctly", () => {
		const cameraFPTree = renderer
			.create(<CameraFP position={{ x: 0, y: 0, z: 0 }} active={true} />)
			.toJSON();

		expect(cameraFPTree).toMatchSnapshot();
	});

	it("renders CameraTP correctly", () => {
		const cameraTPTree = renderer
			.create(<CameraTP position={{ x: 0, y: 0, z: 0 }} active={true} />)
			.toJSON();

		expect(cameraTPTree).toMatchSnapshot();
	});
});
