import React from "react";
import renderer from "react-test-renderer";
import { Entity } from "aframe-react";
import Aframe from "aframe";

import FloorUnit from "../../src/js/components/assets/floor_unit";

describe("FloorUnit tests", () => {
	it("renders FloorUnit correctly", () => {
		const mockClick = jest.fn();

		const floorUnitTree = renderer
			.create(<FloorUnit onClick={mockClick} />)
			.toJSON();

		expect(floorUnitTree).toMatchSnapshot();
	});
});
