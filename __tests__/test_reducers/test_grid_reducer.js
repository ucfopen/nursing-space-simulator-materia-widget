import gridReducer from "../../src/js/reducers/gridReducer";
import * as actions from "../../src/js/actions/grid_actions";
import { INIT_DATA } from "../../src/js/actions/";
import { deleteItem, insertItem, rotateCell } from "../../src/js/grid";

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
			selectedAsset: null,
			currentX: null,
			currentY: null
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

	it("should handle UPDATE_ASSET_POSITION", () => {
		const grid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "0"]
		];

		let selectedAsset = {
			id: "bed-1"
		};

		const x = 1,
			y = 1;

		let direction = null;
		let newGrid;

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentY: y, selectedAsset },
				// Action being passed it
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: direction
				}
			)
		).toEqual({
			grid: grid,
			currentX: x,
			currentY: y,
			selectedAsset
		});

		direction = "xUp";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, y);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentY: y, selectedAsset },
				// Action being passed it
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: direction
				}
			)
		).toEqual({
			grid: insertItem(
				newGrid,
				selectedAsset.id,
				x + 1,
				y,
				grid[x][y].rotation
			),
			currentX: x + 1,
			currentY: y,
			selectedAsset
		});

		direction = "xDown";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, y);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentY: y, selectedAsset },
				// Action being passed it
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: direction
				}
			)
		).toEqual({
			grid: insertItem(
				newGrid,
				selectedAsset.id,
				x - 1,
				y,
				grid[x][y].rotation
			),
			currentX: x - 1,
			currentY: y,
			selectedAsset
		});

		direction = "zUp";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, y);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentY: y, selectedAsset },
				// Action being passed it
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: direction
				}
			)
		).toEqual({
			grid: insertItem(
				newGrid,
				selectedAsset.id,
				x,
				y - 1,
				grid[x][y].rotation
			),
			currentX: x,
			currentY: y - 1,
			selectedAsset
		});

		direction = "zDown";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, y);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentY: y, selectedAsset },
				// Action being passed it
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: direction
				}
			)
		).toEqual({
			grid: insertItem(
				newGrid,
				selectedAsset.id,
				x,
				y + 1,
				grid[x][y].rotation
			),
			currentX: x,
			currentY: y + 1,
			selectedAsset
		});

		// Given the constant test grid, these are possible invalid moves that should not change the state
		let invalidMovements = [
			{
				direction: "xUp",
				x: 0,
				y: 1
			},
			{
				direction: "xDown",
				x: 2,
				y: 1
			},
			{
				direction: "zUp",
				x: 1,
				y: 0
			},
			{
				direction: "zDown",
				x: 1,
				y: 2
			}
		];

		// Tests all invalid moves to make sure the state does not change
		for (let i = 0; i < invalidMovements.length; i++) {
			expect(
				gridReducer(
					// State being passed in
					{
						grid,
						currentX: invalidMovements[i].x,
						currentY: invalidMovements[i].y,
						selectedAsset
					},
					// Action being passed it
					{
						type: actions.UPDATE_ASSET_POSITION,
						payload: invalidMovements[i].direction
					}
				)
			).toEqual({
				grid,
				currentX: invalidMovements[i].x,
				currentY: invalidMovements[i].y,
				selectedAsset
			});
		}
	});
});
