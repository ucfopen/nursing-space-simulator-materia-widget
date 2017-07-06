import * as actions from "../../src/js/actions/grid_actions";

describe("Grid Action Tests", () => {
	it("selectAssetType", () => {
		const asset = {
			testValue: "test"
		};
		const expectedAction = {
			type: actions.SELECT_ASSET_TYPE,
			payload: asset
		};
		expect(actions.selectAssetType(asset)).toEqual(expectedAction);
	});

	it("selectAsset", () => {
		const asset = {
			testValue: "test"
		};
		const expectedAction = {
			type: actions.SELECT_ASSET,
			payload: {
				asset,
				x: 5,
				y: 7
			}
		};
		expect(actions.selectAsset(asset, 5, 7)).toEqual(expectedAction);
	});

	it("deselectAsset", () => {
		const expectedAction = {
			type: actions.DESELECT_ASSET
		};
		expect(actions.deselectAsset()).toEqual(expectedAction);
	});

	it("rotateAsset", () => {
		const expectedAction = {
			type: actions.ROTATE_ASSET,
			payload: {
				x: 5,
				y: 7
			}
		};
		expect(actions.rotateAsset(5, 7)).toEqual(expectedAction);
	});

	it("removeAsset", () => {
		const expectedAction = {
			type: actions.REMOVE_ASSET,
			payload: {
				x: 5,
				y: 7
			}
		};
		expect(actions.removeAsset(5, 7)).toEqual(expectedAction);
	});

	it("insertAsset with no asset id", () => {
		const expectedAction = {
			type: actions.INSERT_ASSET,
			payload: {
				assetId: null,
				x: 5,
				y: 7
			}
		};
		expect(actions.insertAsset(5, 7)).toEqual(expectedAction);
	});

	it("insertAsset with asset id", () => {
		const expectedAction = {
			type: actions.INSERT_ASSET,
			payload: {
				assetId: "pov_camera",
				x: 5,
				y: 7
			}
		};
		expect(actions.insertAsset(5, 7, "pov_camera")).toEqual(expectedAction);
	});

	it("updateAssetPosition", () => {
		const expectedAction = {
			type: actions.UPDATE_ASSET_POSITION,
			payload: "xUp"
		};
		expect(actions.updateAssetPosition("xUp")).toEqual(expectedAction);
	});
});
