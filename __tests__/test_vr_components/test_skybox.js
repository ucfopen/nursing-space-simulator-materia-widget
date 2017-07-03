import React from "react";
import renderer from "react-test-renderer";
import { Entity } from "aframe-react";
import Aframe from "aframe";

import Skybox from "../../src/js/components/assets/skybox";

describe("Skybox tests", () => {
	it("renders skybox correctly", () => {
		const skyboxTree = renderer.create(<Skybox />).toJSON();

		expect(skyboxTree).toMatchSnapshot();
	});
});
