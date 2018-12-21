import * as actions from "../../src/js/actions";
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
				grid,
				categories: qset.options.categories,
				assets: qset.options.assets
			}
		};

		expect(actions.initData(qset)).toEqual(expectedAction);
	});
});
