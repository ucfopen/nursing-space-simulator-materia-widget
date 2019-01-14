import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import AssetControls from "../../src/js/components/ui/asset_controls";

// Variables consistent against all tests
const selectedAsset = {
	// # TODO this shouldn't have this title, requires changing many tests
	title: "Bed-1",
};
const wallAsset = {
	id: "wall-1"
};
const doorAsset = {
	id: "door-1"
};

const deselectMock = jest.fn();
const rotateMock = jest.fn();
const removeMock = jest.fn();

describe("Asset Controls Component", () => {
	it("renders asset controls", () => {
		const manipulationModeControlTree = renderer
			.create(
				<AssetControls
					mode={true}
					deselectAsset={deselectMock}
					rotateAsset={rotateMock}
					removeAsset={removeMock}
					selectedAsset={selectedAsset}
					currentX={1}
					currentZ={1}
				/>
			)
			.toJSON();

		expect(manipulationModeControlTree).toMatchSnapshot();

		const nonManipulationModeControlTree = renderer
			.create(
				<AssetControls
					mode={false}
					deselectAsset={deselectMock}
					rotateAsset={rotateMock}
					removeAsset={removeMock}
					selectedAsset={selectedAsset}
					currentX={1}
					currentZ={1}
				/>
			)
			.toJSON();

		expect(nonManipulationModeControlTree).toMatchSnapshot();

		expect(manipulationModeControlTree).not.toEqual(
			nonManipulationModeControlTree
		);
	});

	it("shows the correct controls when a bed is selected", () => {
		let controls = shallow(
			<AssetControls
				mode={"manipulation"}
				deselectAsset={deselectMock}
				rotateAsset={rotateMock}
				removeAsset={removeMock}
				selectedAsset={selectedAsset}
				currentX={1}
				currentZ={1}
			/>
		);
		expect(controls.find("#confirm").exists()).toBe(true);
		expect(controls.find("#rotate").exists()).toBe(true);
		expect(controls.find("#remove").exists()).toBe(true);
		expect(controls.find("#extendWall").exists()).toBe(false);
		expect(controls.find("#editAsset").exists()).toBe(false);
	});

	it("shows the correct controls when a wall is selected", () => {
		let controls = shallow(
			<AssetControls
				mode={"manipulation"}
				deselectAsset={deselectMock}
				rotateAsset={rotateMock}
				removeAsset={removeMock}
				selectedAsset={wallAsset}
				currentX={1}
				currentZ={1}
			/>
		);
		expect(controls.find("#confirm").exists()).toBe(true);
		expect(controls.find("#rotate").exists()).toBe(true);
		expect(controls.find("#remove").exists()).toBe(true);
		expect(controls.find("#extendWall").exists()).toBe(true);
		expect(controls.find("#editAsset").exists()).toBe(true);
	});

	it("shows the correct controls when a door is selected", () => {
		let controls = shallow(
			<AssetControls
				mode={"manipulation"}
				deselectAsset={deselectMock}
				rotateAsset={rotateMock}
				removeAsset={removeMock}
				selectedAsset={doorAsset}
				currentX={1}
				currentZ={1}
			/>
		);
		expect(controls.find("#confirm").exists()).toBe(true);
		expect(controls.find("#rotate").exists()).toBe(true);
		expect(controls.find("#remove").exists()).toBe(true);
		expect(controls.find("#extendWall").exists()).toBe(false);
		expect(controls.find("#editAsset").exists()).toBe(true);
	});

	it("calls correct methods when clicking manupulation mode buttons", () => {
		let manipulationModeAssetControls = shallow(
			<AssetControls
				mode={"manipulation"}
				deselectAsset={deselectMock}
				rotateAsset={rotateMock}
				removeAsset={removeMock}
				selectedAsset={selectedAsset}
				currentX={1}
				currentZ={1}
			/>
		);
		manipulationModeAssetControls.find("#confirm").simulate("click");
		manipulationModeAssetControls.find("#rotate").simulate("click");
		manipulationModeAssetControls.find("#remove").simulate("click");

		expect(deselectMock).toBeCalledTimes(1);
		expect(rotateMock).toBeCalledWith(1, 1);
		expect(removeMock).toBeCalledWith(1, 1);
	});

	it("calls correct methods while click while not in manipulation mode", () => {
		let nonManipulationModeAssetControls = shallow(
			<AssetControls
				mode={false}
				deselectAsset={deselectMock}
				rotateAsset={rotateMock}
				removeAsset={removeMock}
				selectedAsset={selectedAsset}
				currentX={1}
				currentZ={1}
			/>
		);

		nonManipulationModeAssetControls.find("#deselect").simulate("click");

		// Because deselect mock is global, it will be kept track of across all tests. Should be called twice by this point
		expect(deselectMock.mock.calls.length).toEqual(2);
	});
});
