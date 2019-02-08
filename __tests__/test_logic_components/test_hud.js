import ConnectedHud, { HUD } from "../../src/js/components/hud";
import React from "react";
import { Provider } from "react-redux";
import { mount, shallow, render } from "enzyme";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import reducers from "../../src/js/reducers";
import { initData } from "../../src/js/actions/";
import assetData from "../../src/assets/assets.json";

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
const selectAssetTypeMock = jest.fn();
const setCategoryMock = jest.fn();
const toggleThirdPersonMock = jest.fn();
const toggleMenuVisibilityMock = jest.fn();
const deselectAssetMock = jest.fn();
const restartTourMock = jest.fn();
const toggleHelpVisibilityMock = jest.fn();
jest.mock("../../src/js/components/ui/keyboard_controls.js");
jest.mock("../../src/js/actions/grid_actions.js");
jest.mock("../../src/js/actions/menu_actions.js");
describe("HUD tests", () => {
	it("Should render loading when no props are passed in", () => {
		const hudTree = renderer.create(<HUD />).toJSON();
		expect(hudTree).toBeNull();
	});

	it("should checkSelectAssetType", () => {
		const hud = mount(
			<HUD
				categories={categories}
				assets={assets}
				updateAssetPosition={updateAssetPositionMock}
				updateCameraPosition={updateCameraPositionMock}
				thirdPerson={false}
				selectedAsset={false}
				selectAssetType={selectAssetTypeMock}
				setCategory={setCategoryMock}
				toggleThirdPerson={toggleThirdPersonMock}
				isTooltipTemporary={true}
				mode={"editAsset"}
				thirdPerson={true}
				toggleMenuVisibility={() => {}}
				ready={true}
			/>
		);
		const findTray = hud.find("#vr-viewer-mode").simulate("click");
		// expect(findTray.html()).toBe(true);

		expect(selectAssetTypeMock).toBeCalled();
	});

	it("should check asset types when asset ids match", () => {
		const hud = mount(
			<HUD
				categories={categories}
				assets={assets}
				updateAssetPosition={updateAssetPositionMock}
				updateCameraPosition={updateCameraPositionMock}
				thirdPerson={false}
				deselectAsset={deselectAssetMock}
				selectedAsset={{id:"pov_camera"}}
				selectedItem={{rotation:0}}
				selectAssetType={selectAssetTypeMock}
				setCategory={setCategoryMock}
				toggleThirdPerson={toggleThirdPersonMock}
				isTooltipTemporary={true}
				mode={"editAsset"}
				thirdPerson={true}
				toggleMenuVisibility={() => {}}
				ready={true}
			/>
		);
		const findTray = hud.find("#vr-viewer-mode").simulate("click");
		// expect(findTray.html()).toBe(true);

		expect(deselectAssetMock).toBeCalled();
	});

	it.only("should restart the tour", () => {
		const hud = mount(
			<HUD
				helpVisible={true}
				selectAssetType={selectAssetTypeMock}
				setCategory={setCategoryMock}
				toggleHelpVisibility={toggleHelpVisibilityMock}
				restartTour={restartTourMock}
				mode={"editAsset"}
				thirdPerson={true}
				toggleMenuVisibility={() => {}}
				ready={true}
			/>
		);
		const findRestartButton = hud.find("#help-pane a").simulate("click");

		expect(restartTourMock).toBeCalled();
	});

	it.only("should restart the tour when helpVisible == false", () => {
		const hud = mount(
			<HUD
				helpVisible={false}
				selectAssetType={selectAssetTypeMock}
				setCategory={setCategoryMock}
				toggleHelpVisibility={toggleHelpVisibilityMock}
				restartTour={restartTourMock}
				mode={"editAsset"}
				thirdPerson={true}
				toggleMenuVisibility={() => {}}
				ready={true}
			/>
		);
		// const findButton = hud.find(".drawer-toggle").simulate("click");
		// const findTray = hud.find("#tray-div");
		// expect(findTray.html()).toBe(true);

		expect(restartTourMock).toBeCalled();
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
				toggleThirdPerson={toggleThirdPersonMock}
				isTooltipTemporary={true}
				mode={"editAsset"}
				ready={true}
			/>
		);
		hud.find("#back").simulate("click");

		expect(toggleThirdPersonMock).toBeCalled();
	});

	it("should render third person correctly with selected asset", () => {
		const store = createStore(reducers);
		const hudTree = renderer
			.create(
				<Provider store={store}>
					<HUD
						categories={categories}
						assets={assets}
						updateAssetPosition={updateAssetPositionMock}
						updateCameraPosition={updateCameraPositionMock}
						thirdPerson={true}
						toggleMenuVisibility={toggleMenuVisibilityMock}
						selectedAsset={selectedAsset}
						selectAssetType={selectAssetTypeMock}
						setCategory={setCategoryMock}
						ready={true}
					/>
				</Provider>
			)
			.toJSON();
		expect(hudTree).toMatchSnapshot();
	});

	it("should render third person correctly without selected asset", () => {
		const store = createStore(reducers);
		const hudTree = renderer
			.create(
				<Provider store={store}>
					<HUD
						categories={categories}
						assets={assets}
						updateAssetPosition={updateAssetPositionMock}
						updateCameraPosition={updateCameraPositionMock}
						thirdPerson={true}
						toggleMenuVisibility={toggleMenuVisibilityMock}
						selectedAsset={null}
						selectAssetType={selectAssetTypeMock}
						setCategory={setCategoryMock}
						mode={"editAsset"}
						ready={true}
					/>
				</Provider>
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
		store.dispatch(initData(qset, assetData));
		const connectedHudComponent = shallow(<ConnectedHud store={store} />);
		const hud = connectedHudComponent.find(HUD);

		Object.keys(hud.props()).map(prop => {
			expect(hud.props()[prop]).not.toBe(undefined);
		});
	});
});
