import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import AssetTray from "../../src/js/components/ui/asset_tray";

// Constants used across all tests
const setCategoryMock = jest.fn();
const selectAssetTypeMock = jest.fn();

const assets = {
	bed: {
		category: "beds"
	},
	chair: {
		category: "equipment"
	}
};
const currentCategory = "construction";
const categories = ["beds", "equipment", "walls", "people"];
const isMenuVisible = true;
const selectedAsset = { id: "pov_camera" };

describe("Asset Tray tests", () => {
	it("renders asset tray", () => {
		const assetTrayTree = renderer
			.create(
				<AssetTray
					assets={assets}
					categories={categories}
					currentCategory={currentCategory}
					setCategory={setCategoryMock}
					selectAssetType={selectAssetTypeMock}
					selectedAsset={selectedAsset}
				/>
			)
			.toJSON();

		expect(assetTrayTree).toMatchSnapshot();
	});

	it("toggles drawer correctly", () => {
		const mockToggleMenu = jest.fn();
		const assetTray = shallow(
			<AssetTray
				assets={assets}
				categories={categories}
				currentCategory={currentCategory}
				setCategory={setCategoryMock}
				selectAssetType={selectAssetTypeMock}
				isMenuVisible={isMenuVisible}
				toggleMenu={mockToggleMenu}
			/>
		);

		expect(assetTray.find(".drawer-toggle").text()).toEqual("[Close Menu]");
		assetTray.find(".drawer-toggle").simulate("click");
		expect(mockToggleMenu).toHaveBeenCalled();
		assetTray
			.find("#UI-bottom-panel")
			.simulate("mousedown", { preventDefault: () => {} });
	});

	it("selects POV Camera correctly", () => {
		const assetTray = shallow(
			<AssetTray
				assets={assets}
				categories={categories}
				currentCategory={currentCategory}
				setCategory={setCategoryMock}
				selectAssetType={selectAssetTypeMock}
			/>
		);

		assetTray
			.find("button")
			.at(1)
			.simulate("click");

		expect(selectAssetTypeMock).toBeCalledWith({
			id: "pov_camera",
			title: "POV Camera"
		});
	});
});
