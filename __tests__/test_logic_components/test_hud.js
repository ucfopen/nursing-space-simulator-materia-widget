import ConnectedHud, { HUD } from "../../src/js/components/hud";
import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import reducers from "../../src/js/reducers";
import { initData } from "../../src/js/actions/";

// Constants used across all tests
const categories = ["beds", "equipment", "walls", "people"];
const assets = {
	bed: {
		id: "bed-1",
		category: "beds"
	},
	chair: {
		id: "chair",
		category: "equipment"
	}
};
const selectedAsset = {
	id: "bed-1",
	category: "beds"
};
const updateAssetPositionMock = jest.fn();
const updateCameraPositionMock = jest.fn();
const toggleCameraType = jest.fn();
const selectAssetTypeMock = jest.fn();
const setCategoryMock = jest.fn();
const toggleCameraTypeMock = jest.fn();

describe("HUD tests", () => {
	it("Should render loading when no props are passed in", () => {
		const hudTree = renderer.create(<HUD />).toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("Should render loading when asset prop is not passed in", () => {
		const hudTree = renderer
			.create(
				<HUD
					categories={categories}
					updateAssetPosition={updateAssetPositionMock}
					updateCameraPosition={updateCameraPositionMock}
				/>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("Should render loading when asset prop is not passed in", () => {
		const hudTree = renderer
			.create(
				<HUD
					categories={categories}
					assets={assets}
					updateCameraPosition={updateCameraPositionMock}
				/>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("Should render loading when asset prop is not passed in", () => {
		const hudTree = renderer
			.create(
				<HUD
					categories={categories}
					assets={assets}
					updateAssetPosition={updateAssetPositionMock}
				/>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("Should render loading when asset prop is not passed in", () => {
		const hudTree = renderer
			.create(
				<HUD
					assets={assets}
					updateAssetPosition={updateAssetPositionMock}
					updateCameraPosition={updateCameraPositionMock}
				/>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("Should render loading when asset prop is not passed in", () => {
		const hudTree = renderer
			.create(
				<HUD
					categories={categories}
					assets={assets}
					updateAssetPosition={updateAssetPositionMock}
					updateCameraPosition={updateCameraPositionMock}
				/>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("should execute toggle camera type when the back third person button is pressed", () => {
		const hud = shallow(
			<HUD
				categories={categories}
				assets={assets}
				updateAssetPosition={updateAssetPositionMock}
				updateCameraPosition={updateCameraPositionMock}
				thirdPerson={false}
				selectedAsset={selectedAsset}
				selectAssetType={selectAssetTypeMock}
				setCategory={setCategoryMock}
				toggleCameraType={toggleCameraTypeMock}
			/>
		);

		hud.find("#back").simulate("click");

		expect(toggleCameraTypeMock).toBeCalled();
	});

	/*it("Should use updateAssetPosition when an asset is selected", () => {
		const hud = shallow(
			<HUD
				categories={categories}
				assets={assets}
				selectedAsset={selectedAsset}
				updateAssetPosition={updateAssetPositionMock}
				updateCameraPosition={updateCameraPositionMock}
			/>
		);
		expect(hud.update).toBe(update);
	});*/

	it("should render third person correctly with selected asset", () => {
		const hudTree = renderer
			.create(
				<HUD
					categories={categories}
					assets={assets}
					updateAssetPosition={updateAssetPositionMock}
					updateCameraPosition={updateCameraPositionMock}
					thirdPerson={true}
					selectedAsset={selectedAsset}
					selectAssetType={selectAssetTypeMock}
					setCategory={setCategoryMock}
				/>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("should render third person correctly without selected asset", () => {
		const hudTree = renderer
			.create(
				<HUD
					categories={categories}
					assets={assets}
					updateAssetPosition={updateAssetPositionMock}
					updateCameraPosition={updateCameraPositionMock}
					thirdPerson={true}
					selectedAsset={null}
					selectAssetType={selectAssetTypeMock}
					setCategory={setCategoryMock}
				/>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("should render connected component using app", () => {
		const qset = {
			options: {
				gridLoader: {
					columns: 2,
					content: "0 0 0 0",
					rows: 2
				},
				categories: ["beds", "equipment", "walls"],
				assets: [
					{
						id: "test-asset"
					}
				]
			}
		};
		const store = createStore(reducers);
		store.dispatch(initData(qset));
		// console.log(connectedAppComponent.debug());
		const connectedHudComponent = mount(<ConnectedHud store={store} />),
			hud = connectedHudComponent.find(HUD);

		Object.keys(hud.props()).map(prop => {
			expect(hud.props()[prop]).not.toBe(undefined);
		});
	});
});
