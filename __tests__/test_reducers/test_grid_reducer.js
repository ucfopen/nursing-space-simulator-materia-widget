import gridReducer from "../../src/js/reducers/gridReducer";
import * as actions from "../../src/js/actions/grid_actions";
import { INIT_DATA } from "../../src/js/actions/";
import {
	deleteItem,
	insertItem,
	rotateCell,
	getCellRotation
} from "../../src/js/grid";

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
			dragging: false,
			currentX: null,
			currentZ: null,
			mode: "none",
			selectedAsset: null,
			selectedItem: null,
			validX: null,
			validZ: null,
			ready: false
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
			grid,
			ready: true
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
			selectedItem: null,
			currentX: null,
			currentZ: null,
			mode: "assetTypeSelected"
		});
	});

	it.only("should handle SELECT_ASSET", () => {
		let currentlySelectedAsset = {
			id: "wall-1",
			category: "walls",
			canReplace: ["walls"]
			// adj: [false, false, true, false]
		};

		let assetBeingSelected = {
			id: "wall-tv",
			category: "walls",
			canReplace: ["walls"]
		};

		let grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];
		let x = 0,
			z = 0;

		let expectedGrid = insertItem(
			JSON.parse(JSON.stringify(grid)),
			currentlySelectedAsset.id,
			x,
			z
		);
		expectedGrid[0][0].adj = [false, false, true, false];

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
						z
					}
				}
			)
		).toEqual({
			mode: "manipulation",
			selectedAsset: currentlySelectedAsset,
			selectedItem: {
				adj: [false, false, true, false],
				id: "wall-1",
				rotation: 180,
				stickers: null
			},
			currentX: x,
			currentZ: z,
			grid: expectedGrid
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
						z,
						x
					}
				}
			)
		).toEqual({
			grid: grid,
			manipulationMode: true,
			selectedAsset: assetBeingSelected,
			currentX: x,
			currentZ: z
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
						z,
						x
					}
				}
			)
		).toEqual({
			grid: grid,
			manipulationMode: true,
			selectedAsset: assetBeingSelected,
			currentX: x,
			currentZ: z
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
						z,
						x
					}
				}
			)
		).toEqual({
			grid: grid,
			manipulationMode: true,
			selectedAsset: assetBeingSelected,
			currentX: x,
			currentZ: z
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
			currentZ: null
		});
	});

	it("should handle ROTATE_ASSET", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];
		const x = 0,
			z = 1;

		expect(
			gridReducer(
				// State being passed in
				{ grid: grid },
				// Action being passed in
				{
					type: actions.ROTATE_ASSET,
					payload: {
						x,
						z
					}
				}
			)
		).toEqual({
			grid: rotateCell(JSON.parse(JSON.stringify(grid)), x, z)
		});
	});

	it("should handle REMOVE_ASSET", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];

		const x = 1,
			z = 0;

		expect(
			gridReducer(
				// State being passed in
				{ grid: grid },
				// Action being passed in
				{
					type: actions.REMOVE_ASSET,
					payload: {
						x,
						z
					}
				}
			)
		).toEqual({
			grid: deleteItem(JSON.parse(JSON.stringify(grid)), x, z),
			manipulationMode: false,
			selectedAsset: null,
			currentX: null,
			currentZ: null
		});
	});

	it("should handle INSERT_ASSET", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];

		let selectedAsset = null;

		let x = 1,
			z = 1;

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
						z
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
				{ selectedAsset, grid, currentX: null, currentZ: null },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x,
						z
					}
				}
			)
		).toEqual({
			grid: insertItem(
				JSON.parse(JSON.stringify(grid)),
				selectedAsset.id,
				x,
				z
			),
			selectedAsset,
			manipulationMode: true,
			currentX: x,
			currentZ: z
		});

		x = 1;
		z = 0;

		// If the cell to be inserted to is occupied, return the previous state
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset, grid, currentX: null, currentZ: null },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x,
						z
					}
				}
			)
		).toEqual({
			grid,
			selectedAsset,
			currentX: null,
			currentZ: null
		});

		x = 0;
		z = 0;

		// Tests currently selected asset is deleted when inserted to a new grid cell (aka moving an asset)
		const prevRotation = getCellRotation(grid, 1, 0);
		const newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), 1, 0);

		expect(
			gridReducer(
				{ selectedAsset, grid, currentX: 1, currentZ: 0 },
				{
					type: actions.INSERT_ASSET,
					payload: {
						x,
						z
					}
				}
			)
		).toEqual({
			grid: insertItem(
				JSON.parse(JSON.stringify(newGrid)),
				selectedAsset.id,
				x,
				z,
				prevRotation
			),
			selectedAsset,
			manipulationMode: true,
			currentX: x,
			currentZ: z
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
			z = 1;

		let direction = null;
		let newGrid;

		// Does not attempt to update an assets position if there is none or if the asset is pov_camera
		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: null,
					currentZ: null,
					selectedAsset: { id: "pov_camera", title: "POV Camera" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "xUp"
				}
			)
		).toEqual({
			grid,
			currentX: null,
			currentZ: null,
			selectedAsset: { id: "pov_camera", title: "POV Camera" }
		});

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentZ: z, selectedAsset },
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: direction
				}
			)
		).toEqual({
			grid: grid,
			currentX: x,
			currentZ: z,
			selectedAsset
		});

		direction = "xRight";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, z);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentZ: z, selectedAsset },
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
				z,
				grid[z][x].rotation
			),
			currentX: x + 1,
			currentZ: z,
			selectedAsset
		});

		direction = "xLeft";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, z);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentZ: z, selectedAsset },
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
				z,
				grid[z][x].rotation
			),
			currentX: x - 1,
			currentZ: z,
			selectedAsset
		});

		direction = "zUp";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, z);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentZ: z, selectedAsset },
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
				z - 1,
				grid[z][x].rotation
			),
			currentX: x,
			currentZ: z - 1,
			selectedAsset
		});

		direction = "zDown";
		newGrid = deleteItem(JSON.parse(JSON.stringify(grid)), x, z);

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: x, currentZ: z, selectedAsset },
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
				z + 1,
				grid[z][x].rotation
			),
			currentX: x,
			currentZ: z + 1,
			selectedAsset
		});

		// Given the constant test grid, these are possible invalid moves that should not change the state
		let invalidMovements = [
			{
				direction: "xRight",
				x: 0,
				z: 1
			},
			{
				direction: "xLeft",
				x: 0,
				z: 1
			},
			{
				direction: "xLeft",
				x: 2,
				z: 1
			},
			{
				direction: "xRight",
				x: 2,
				z: 1
			},
			{
				direction: "zUp",
				x: 1,
				z: 0
			},
			{
				direction: "zDown",
				x: 1,
				z: 0
			},
			{
				direction: "zUp",
				x: 1,
				z: 2
			},
			{
				direction: "zDown",
				x: 1,
				z: 2
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
						currentZ: invalidMovements[i].z,
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
				currentZ: invalidMovements[i].z,
				selectedAsset
			});
		}
	});
});
