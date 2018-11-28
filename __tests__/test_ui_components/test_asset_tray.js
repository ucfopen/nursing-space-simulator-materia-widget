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
const currentCategory = "beds";
const categories = ["beds", "equipment", "walls", "people"];

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
				/>
			)
			.toJSON();

		expect(assetTrayTree).toMatchSnapshot();
	});

	it("toggles drawer correctly", () => {
		const assetTray = shallow(
			<AssetTray
				assets={assets}
				categories={categories}
				currentCategory={currentCategory}
				setCategory={setCategoryMock}
				selectAssetType={selectAssetTypeMock}
			/>
		);

		expect(assetTray.find(".drawer-toggle").text()).toEqual("[Close Menu]");
		assetTray.find(".drawer-toggle").simulate("click");
		expect(assetTray.find(".drawer-toggle").text()).toEqual("[Open Menu]");
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
