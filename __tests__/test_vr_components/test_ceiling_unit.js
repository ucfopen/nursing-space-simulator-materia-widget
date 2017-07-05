import React from "react";
import renderer from "react-test-renderer";
import { Entity } from "aframe-react";
import Aframe from "aframe";

import CeilingUnit from "../../src/js/components/assets/ceiling_unit";

describe("CeilingUnit tests", () => {
	it("renders CeilingUnit correctly", () => {
		const mockClick = jest.fn();

		const ceilingUnitTree = renderer
			.create(<CeilingUnit x={1} y={1} />)
			.toJSON();

		expect(ceilingUnitTree).toMatchSnapshot();
	});
});
