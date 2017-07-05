import * as actions from "../../src/js/actions";
import { loadGrid } from "../../src/js/grid";
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

		const grid = loadGrid(
			qset.options.gridLoader.content,
			qset.options.gridLoader.rows,
			qset.options.gridLoader.columns
		);

		const expectedAction = {
			type: actions.INIT_DATA,
			payload: {
				grid,
				categories: qset.options.categories,
				assets: qset.options.assets
			}
		};

		expect(actions.initData(qset)).toEqual(expectedAction);
	});
});
