import gridReducer from "../src/js/reducers/gridReducer";
import * as actions from "../src/js/actions/grid_actions";
import { INIT_DATA } from "../src/js/actions/";
import { deleteItem, insertItem, rotateCell } from "../src/js/grid";

describe("grid reducer", () => {
	it("should return the inital state", () => {
		expect(
			gridReducer(
				// State being passed in
				undefined,
				// Action being passed in
				{}
			)
		).toEqual({
			manipulationMode: false,
			selectedAsset: null
		});
	});

	it("should handle INIT_DATA", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];
		const categories = ["beds", "equipment", "walls", "people"];
		const assets = [
			{ id: "bed-1", category: "beds" },
			{ id: "wall-1", category: "0" }
		];

		expect(
			gridReducer(
				// State being passed in
				[],
				// Action being passed in
				{
					type: INIT_DATA,
					payload: {
						grid: grid,
						categories: categories,
						assets: assets
					}
				}
			)
		).toEqual({
			grid
		});
	});

	it("should handle SELECT_ASSET_TYPE", () => {
		const asset = {
			testValue: "test"
		};
		expect(
			gridReducer(
				// State being passed in
				[],
				// Action being passed in
				{
					type: actions.SELECT_ASSET_TYPE,
					payload: asset
				}
			)
		).toEqual({
			selectedAsset: asset,
			manipulationMode: false,
			currentX: null,
			currentY: null
		});
	});

	it("should handle SELECT_ASSET", () => {
		let currentlySelectedAsset = {
			id: "wall-1",
			category: "walls",
			canReplace: ["walls"]
		};

		let assetBeingSelected = {
			id: "wall-tv",
			category: "walls",
			canReplace: ["walls"]
		};

		let grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];
		let x = 0,
			y = 0;

		// If the currently selected asset can replace the asset being selected, replace the asset being selected
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset: currentlySelectedAsset, grid },
				// Action being passed in
				{
					type: actions.SELECT_ASSET,
					payload: {
						asset: assetBeingSelected,
						x,
						y
					}
				}
			)
		).toEqual({
			manipulationMode: true,
			selectedAsset: currentlySelectedAsset,
			currentX: x,
			currentY: y,
			grid: insertItem(
				JSON.parse(JSON.stringify(grid)),
				currentlySelectedAsset.id,
				x,
				y
			)
		});

		// If the currently selected asset is null, the asset being selected should be set to selected asset
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset: null, grid },
				// Action being passed in
				{
					type: actions.SELECT_ASSET,
					payload: {
						asset: assetBeingSelected,
						x,
						y
					}
				}
			)
		).toEqual({
			grid: grid,
			manipulationMode: true,
			selectedAsset: assetBeingSelected,
			currentX: x,
			currentY: y
		});

		assetBeingSelected = currentlySelectedAsset;

		// If the currently selected asset is equal to the asset being selected, the asset being selected should be set to selected asset
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset: currentlySelectedAsset, grid },
				// Action being passed in
				{
					type: actions.SELECT_ASSET,
					payload: {
						asset: assetBeingSelected,
						x,
						y
					}
				}
			)
		).toEqual({
			grid: grid,
			manipulationMode: true,
			selectedAsset: assetBeingSelected,
			currentX: x,
			currentY: y
		});

		currentlySelectedAsset = {
			id: "bed-1",
			category: "beds",
			canReplace: ["beds"]
		};

		// If the currently selected asset cannot replace the asset being selected, the asset being selected should be set to selected asset
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset: currentlySelectedAsset, grid },
				// Action being passed in
				{
					type: actions.SELECT_ASSET,
					payload: {
						asset: assetBeingSelected,
						x,
						y
					}
				}
			)
		).toEqual({
			grid: grid,
			manipulationMode: true,
			selectedAsset: assetBeingSelected,
			currentX: x,
			currentY: y
		});
	});

	it("should handle DESELECT_ASSET", () => {
		expect(
			gridReducer(
				// State being passed in
				[],
				// Action being passed in
				{
					type: actions.DESELECT_ASSET
				}
			)
		).toEqual({
			manipulationMode: false,
			selectedAsset: null,
			currentX: null,
			currentY: null
		});
	});

	it("should handle ROTATE_ASSET", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];
		const x = 0,
			y = 1;
		expect(
			gridReducer(
				// State being passed in
				{ grid: grid },
				// Action being passed in
				{
					type: actions.ROTATE_ASSET,
					payload: {
						x,
						y
					}
				}
			)
		).toEqual({
			grid: rotateCell(JSON.parse(JSON.stringify(grid)), x, y)
		});
	});

	it("should handle REMOVE_ASSET", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];

		const x = 0,
			y = 1;

		expect(
			gridReducer(
				// State being passed in
				{ grid: grid },
				// Action being passed in
				{
					type: actions.REMOVE_ASSET,
					payload: {
						x,
						y
					}
				}
			)
		).toEqual({
			grid: deleteItem(JSON.parse(JSON.stringify(grid)), x, y),
			manipulationMode: false,
			selectedAsset: null,
			currentX: null,
			currentY: null
		});
	});

	it("should handle INSERT_ASSET", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];

		let selectedAsset = null;

		let x = 1,
			y = 1;

		// If the selected asset is null, return the previous state
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset, grid },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x,
						y
					}
				}
			)
		).toEqual({
			selectedAsset: null,
			grid
		});

		selectedAsset = {
			id: "wall-1"
		};

		// If an asset is selected and the cell to be inserted is not occupied, insert and select the item
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset, grid },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x,
						y
					}
				}
			)
		).toEqual({
			grid: insertItem(
				JSON.parse(JSON.stringify(grid)),
				selectedAsset.id,
				x,
				y
			),
			selectedAsset,
			manipulationMode: true,
			currentX: x,
			currentY: y
		});

		x = 0;
		y = 1;

		// If the cell to be inserted to is occupied, return the previous state
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset, grid },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x,
						y
					}
				}
			)
		).toEqual({
			grid,
			selectedAsset
		});
	});
});
