import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import FloorUnit from "../../src/js/components/assets/floor_unit";

const mockClick = jest.fn();

describe("FloorUnit tests", () => {
	it("renders FloorUnit correctly", () => {
		const floorUnitComponent = shallow(<FloorUnit />);

		expect(floorUnitComponent.node).toMatchSnapshot();
	});

	it("renders FloorUnit correctly when there is selected asset that spans 2 x", () => {
		const floorUnitComponent = shallow(
			<FloorUnit selectedAsset={{ spanX: 2 }} />
		);
		floorUnitComponent.setState({ active: true });

		expect(floorUnitComponent.node).toMatchSnapshot();
	});

	it("should run the onClick event when a tile click event is fired and mode is extendWall ", () => {
		const floorUnitComponent = shallow(
			<FloorUnit
				onClick={mockClick}
				thirdPerson={true}
				mode={"extendWall"}
				x={"justNeedHereToWork"}
				z={"justNeedHereToWork"}
			/>
		);
		// 1st is tile, 2nd is tile (for objects that span 2) or null
		floorUnitComponent.props().children[0].props.events.mouseup();
		expect(mockClick).toBeCalled();
	});

	it("should set active to true/false when tile mouseenter/mouseexit events are fired in third person", () => {
		const spy = jest
			.spyOn(FloorUnit.prototype, "isValidPlace")
			.mockReturnValue(true);

		const floorUnitComponent = shallow(
			<FloorUnit
				thirdPerson={true}
				onClick={mockClick}
				selectedAsset={"justNeedHereToWork"}
			/>
		);

		// need to run state()/props() to get updated state/props after manipulation
		// using just component.node... will not give updated values

		expect(floorUnitComponent.state().active).toBe(false);
		expect(floorUnitComponent.props().children[0].props.material).toEqual(
			"opacity: 0"
		);

		floorUnitComponent.props().children[0].props.events.mouseenter();

		expect(floorUnitComponent.state().active).toBe(true);
		expect(floorUnitComponent.props().children[0].props.material).toEqual(
			"color: green; opacity: 0.5;"
		);

		floorUnitComponent.props().children[0].props.events.mouseleave();

		expect(floorUnitComponent.state().active).toBe(false);
		expect(floorUnitComponent.props().children[0].props.material).toEqual(
			"opacity: 0"
		);

		spy.mockRestore();
	});

	it("should set active to false when tile mouseenter event is fired in first person", () => {
		const floorUnitComponent = shallow(
			<FloorUnit thirdPerson={false} onClick={mockClick} />
		);

		expect(floorUnitComponent.state().active).toBe(false);
		expect(floorUnitComponent.props().children[0].props.material).toEqual(
			"opacity: 0"
		);

		floorUnitComponent.props().children[0].props.events.mouseenter();

		expect(floorUnitComponent.state().active).toBe(false);
		expect(floorUnitComponent.props().children[0].props.material).toEqual(
			"opacity: 0"
		);
	});
});
