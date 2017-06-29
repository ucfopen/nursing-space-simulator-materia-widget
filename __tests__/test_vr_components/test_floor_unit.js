import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import { Entity } from "aframe-react";
import Aframe from "aframe";

import FloorUnit from "../../src/js/components/assets/floor_unit";

const mockClick = jest.fn();

describe("FloorUnit tests", () => {
	it("renders FloorUnit correctly", () => {
		const floorUnitTree = renderer
			.create(<FloorUnit onClick={mockClick} />)
			.toJSON();

		expect(floorUnitTree).toMatchSnapshot();
	});

	it("should run the onClick event when a tile click event is fired", () => {
		const floorUnitComponent = shallow(<FloorUnit onClick={mockClick} />);

		// enyme's simulate("click")" does not fire correctly on this aframe component
		floorUnitComponent.props().events.click();
		expect(mockClick).toBeCalled();
	});

	it("should set active to true/false when tile mouseenter/mouseexit events are fired", () => {
		const floorUnitComponent = shallow(<FloorUnit onClick={mockClick} />);

		// enyme's simulate("mouseEnter"/"mouseleave")" does not fire correctly on this aframe component
		expect(floorUnitComponent.state().active).toBe(false);
		expect(floorUnitComponent.props().material).toEqual("color: white");

		floorUnitComponent.props().events.mouseenter();

		expect(floorUnitComponent.state().active).toBe(true);
		expect(floorUnitComponent.props().material).toEqual("color: red");

		floorUnitComponent.props().events.mouseleave();

		expect(floorUnitComponent.state().active).toBe(false);
		expect(floorUnitComponent.props().material).toEqual("color: white");
	});
});
