import dataReducer from "../../src/js/reducers/dataReducer";

import { INIT_DATA } from "../../src/js/actions/";

describe("data reducer", () => {
	it("should return the inital state", () => {
		expect(
			dataReducer(
				// State being passed in
				undefined,
				// Action being passed in
				{}
			)
		).toEqual({});
	});

	it("should handle INIT_DATA", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];
		const categories = ["beds", "equipment", "walls", "people"];
		const assets = [
			{ id: "bed-1", category: "beds" },
			{ id: "wall-1", category: "0" }
		];

		expect(
			dataReducer(
				// State being passed in
				{},
				// Action being passed in
				{
					type: INIT_DATA,
					payload: {
						grid,
						categories,
						assets
					}
				}
			)
		).toEqual({
			categories,
			assets
		});
	});
});
