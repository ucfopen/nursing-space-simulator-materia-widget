import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import MovementControls from "../../src/js/components/ui/movement_controls";

describe("Movement Controls tests", () => {
	it("renders movement controls correctly", () => {
		const updateMock = jest.fn();
		const updateCameraPositionMock = jest.fn();

		const firstPersonMovementControlsTree = renderer
			.create(
				<MovementControls
					thirdPerson={true}
					update={updateMock}
					updateCameraPosition={updateCameraPositionMock}
				/>
			)
			.toJSON();

		expect(firstPersonMovementControlsTree).toMatchSnapshot();

		const thirdPersonMovementControlsTree = renderer
			.create(
				<MovementControls
					thirdPerson={false}
					update={updateMock}
					updateCameraPosition={updateCameraPositionMock}
				/>
			)
			.toJSON();

		expect(firstPersonMovementControlsTree).toMatchSnapshot();

		expect(firstPersonMovementControlsTree).not.toEqual(
			thirdPersonMovementControlsTree
		);
	});
});
