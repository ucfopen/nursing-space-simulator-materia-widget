import assetData from "../../src/assets/assets.json";
import defaultData from "../../src/assets/default.json";
import * as actions from "../../src/js/actions";
import aframe from "aframe";
describe("Menu Action Tests", () => {
	it("initialize action", () => {
		// does not represent a qset to its fullest extent
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

		const expectedAction = {
			type: actions.INIT_DATA,
			payload: {
				grid: JSON.parse(defaultData.grid)
			}
		};

		expect(actions.initData(qset, assetData)).toEqual(expectedAction);
	});
});
