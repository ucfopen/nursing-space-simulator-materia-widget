import ConnectedVRScene, { VRScene } from "../../src/js/components/vr_scene";
import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import reducers from "../../src/js/reducers";
import { initData } from "../../src/js/actions/";
import qset from "../custom_test_utilities/mock_qset";
import { jsdom } from "jsdom";

const position = { x: 0, y: 0, z: 0 };
const assets = {
	bed: {
		id: "bed-1",
		category: "beds",
		objSrc: "url/to/obj",
		mtlSrc: "url/to/mtl"
	},
	chair: {
		id: "chair",
		category: "equipment",
		objSrc: "url/to/obj",
		mtlSrc: "url/to/mtl"
	},
	wall: {
		id: "chair",
		category: "equipment"
	}
};
const grid = [
	["0", "0", "0"],
	["0", { id: "bed", rotation: 180 }, "0"],
	["0", "0", "0"]
];

const propsInVRScene = [
	"qset",
	"position",
	"thirdPerson",
	"assets",
	"grid",
	"currentX",
	"currentY",
	"insertAsset",
	"selectAsset",
	"store",
	"storeSubscription"
];

const insertAsset = jest.fn();
const selectAsset = jest.fn();

describe("VR Scene Tests", () => {
	it("should display loading if no props are passed in", () => {
		const vrSceneTree = renderer.create(<VRScene />).toJSON();
		expect(vrSceneTree).toMatchSnapshot();
	});

	it("should display loading when no position is passed in", () => {
		const vrSceneTree = renderer
			.create(<VRScene grid={grid} assets={assets} />)
			.toJSON();
		expect(vrSceneTree).toMatchSnapshot();
	});

	it("should display loading when no assets are passed in", () => {
		const vrSceneTree = renderer
			.create(<VRScene grid={grid} position={position} />)
			.toJSON();
		expect(vrSceneTree).toMatchSnapshot();
	});

	it("should display the scene when all props are passed in", () => {
		const vrSceneTree = renderer
			.create(
				<VRScene
					grid={grid}
					assets={assets}
					position={position}
					selectAsset={selectAsset}
					insertAsset={insertAsset}
					currentX={0}
					currentY={0}
					thirdPerson={false}
				/>
			)
			.toJSON();
		expect(vrSceneTree).toMatchSnapshot();
	});

	it("should not render ceiling when in third person", () => {
		const vrSceneTree = renderer
			.create(
				<VRScene
					grid={grid}
					assets={assets}
					position={position}
					selectAsset={selectAsset}
					insertAsset={insertAsset}
					currentX={1}
					currentY={1}
					thirdPerson={true}
				/>
			)
			.toJSON();
		expect(vrSceneTree).toMatchSnapshot();
	});

	it("should render connected VRScene with props", () => {
		const store = createStore(reducers);

		// A manual dispatch is required since a single component is being tested
		store.dispatch(initData(qset));

		const connectedVRSceneComponent = shallow(
			<ConnectedVRScene store={store} qset={qset} />
		);

		const propsToBeTested = connectedVRSceneComponent.props();

		Object.keys(propsToBeTested).map(prop => {
			expect(propsInVRScene.includes(prop)).toBe(true);
			expect(propsToBeTested[prop]).not.toBe(undefined);
		});
	});
});
