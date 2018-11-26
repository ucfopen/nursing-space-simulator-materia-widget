import gridReducer from "../../src/js/reducers/gridReducer";
import * as actions from "../../src/js/actions/grid_actions";
import { INIT_DATA } from "../../src/js/actions/";

describe("grid reducer", () => {
	it("should return the initial state", () => {
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
		const grid = [
			["0", { id: "bed-1", rotation: 0 }],
			[{ id: "wall-1", rotation: 90 }, "0"]
		];
		const categories = ["construction", "equipment", "people"];
		const assets = [
			{ id: "bed-1", category: "equipment" },
			{ id: "wall-1", category: "construction" }
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

	it("should handle SELECT_ASSET when there is a selected asset type that can replace an object being clicked on", () => {
		// the wall type is selected
		let currentlySelectedAssetType = {
			id: "wall-1",
			category: "construction",
			canReplace: ["construction"]
		};

		// a window on the scene is clicked on
		let payloadAsset = {
			id: "window",
			category: "construction"
		};

		const grid = [
			["0", { id: "bed-1", rotation: 0 }],
			[{ id: "window", rotation: 90 }, "0"]
		];

		// the window is clicked on but since the selected asset type
		// is wall, the wall will replace it
		const expectedGrid = [
			["0", { id: "bed-1", rotation: 0 }],
			[
				{
					id: "wall-1",
					rotation: 90,
					adj: [true, true, false, false],
					stickers: null
				},
				"0"
			]
		];

		// If the currently selected asset can replace the asset being selected, replace the asset being selected
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset: currentlySelectedAssetType, grid },
				// Action being passed in
				{
					type: actions.SELECT_ASSET,
					payload: {
						asset: payloadAsset,
						x: 0,
						z: 1
					}
				}
			)
		).toEqual({
			mode: "manipulation",
			selectedAsset: currentlySelectedAssetType,
			selectedItem: {
				adj: [true, true, false, false],
				id: "wall-1",
				rotation: 90,
				stickers: null
			},
			currentX: 0,
			currentZ: 1,
			grid: expectedGrid
		});
	});

	it("should handle SELECT_ASSET when there is no currently selected asset in state ", () => {
		// a window on the scene is clicked on
		let payloadAsset = {
			id: "window",
			category: "construction"
		};

		const grid = [
			["0", { id: "bed-1", rotation: 0 }],
			[{ id: "window", rotation: 90 }, "0"]
		];

		// If there is no currently selected asset, the asset being selected should be set to selected asset
		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset: null, grid },
				// Action being passed in
				{
					type: actions.SELECT_ASSET,
					payload: {
						asset: payloadAsset,
						x: 0,
						z: 1
					}
				}
			)
		).toEqual({
			grid: grid,
			mode: "manipulation",
			selectedAsset: payloadAsset,
			currentX: 0,
			currentZ: 1,
			dragging: undefined,
			selectedItem: {
				adj: [true, true, false, false],
				id: "window",
				rotation: 90
			}
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
			currentX: null,
			currentZ: null,
			mode: "none",
			selectedAsset: null,
			selectedItem: null,
			validX: null,
			validZ: null
		});
	});

	it("should handle ROTATE_ASSET", () => {
		const grid = [["0", { id: "window", rotation: 0, spanX: 1 }], ["0", "0"]];
		const expectedGrid = [
			[
				"0",
				{
					adj: [false, false, true, true],
					id: "window",
					rotation: 270,
					spanX: 1
				}
			],
			["0", "0"]
		];

		expect(
			gridReducer(
				// State being passed in
				{ grid: grid, selectedAsset: { spanX: 1 } },
				// Action being passed in
				{
					type: actions.ROTATE_ASSET,
					payload: {
						x: 1,
						z: 0
					}
				}
			)
		).toEqual({
			grid: expectedGrid,
			selectedAsset: { spanX: 1 },
			selectedItem: {
				adj: [false, false, true, true],
				id: "window",
				rotation: 270,
				spanX: 1
			}
		});
	});

	it("should handle REMOVE_ASSET", () => {
		const grid = [["0", { id: "window", rotation: 0, spanX: 1 }], ["0", "0"]];
		const expectedGrid = [["0", "0"], ["0", "0"]];

		expect(
			gridReducer(
				// State being passed in
				{ grid: grid },
				// Action being passed in
				{
					type: actions.REMOVE_ASSET,
					payload: {
						x: 1,
						z: 0
					}
				}
			)
		).toEqual({
			grid: expectedGrid,
			mode: "none",
			selectedAsset: null,
			selectedItem: null,
			currentX: null,
			currentZ: null
		});
	});

	it("should handle INSERT_ASSET when there is no selected asset", () => {
		const grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];
		let selectedAsset = null;

		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset, grid },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x: 0,
						z: 0
					}
				}
			)
		).toEqual({
			selectedAsset: null,
			grid
		});
	});

	it("should handle INSERT_ASSET if there is a selected item (not in construction category)", () => {
		const grid = [["0", { id: "chair-1", rotation: 0 }], ["0", "0"]];
		const expectedGrid = [
			["0", "0"],
			[
				{
					adj: [true, true, false, false],
					id: "chair-1",
					rotation: 0,
					stickers: null
				},
				"0"
			]
		];
		const selectedAsset = {
			id: "chair-1"
		};

		expect(
			gridReducer(
				// State being passed in
				{ selectedAsset, grid, currentX: 1, currentZ: 0 },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x: 0,
						z: 1
					}
				}
			)
		).toEqual({
			currentX: 0,
			currentZ: 1,
			dragging: false,
			grid: expectedGrid,
			mode: "manipulation",
			selectedAsset: { id: "chair-1" },
			selectedItem: {
				adj: [true, true, false, false],
				id: "chair-1",
				rotation: 0,
				stickers: null
			}
		});
	});

	it("should handle INSERT_ASSET if there is a selected item (construction category)", () => {
		const grid = [
			["0", { id: "bed-1", rotation: 0 }],
			[{ id: "window", rotation: 90, stickers: "sticker1, sticker2" }, "0"]
		];

		const expectedGrid = [
			[
				{
					id: "window",
					rotation: 90,
					stickers: "sticker1, sticker2",
					adj: [false, false, true, false]
				},
				{ id: "bed-1", rotation: 0 }
			],
			["0", "0"]
		];

		const selectedAsset = {
			id: "window"
		};

		expect(
			gridReducer(
				// State being passed in
				{ grid, currentX: 0, currentZ: 1, selectedAsset },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x: 0,
						z: 0
					}
				}
			)
		).toEqual({
			grid: expectedGrid,
			selectedAsset,
			currentX: 0,
			currentZ: 0,
			dragging: false,
			mode: "manipulation",
			selectedItem: {
				adj: [false, false, true, false],
				id: "window",
				rotation: 90,
				stickers: "sticker1, sticker2"
			}
		});
	});

	it("should handle INSERT_ASSET for wall-1 (goes into extendWall mode)", () => {
		const grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];

		const expectedGrid = [
			["0", "0", "0"],
			["0", { id: "wall-1", rotation: 180, stickers: null }, "0"],
			["0", "0", "0"]
		];

		const selectedAsset = {
			id: "wall-1",
			category: "construction",
			rotation: 270
		};

		expect(
			gridReducer(
				// State being passed in
				{ grid, selectedAsset, currentX: null, currentZ: null },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x: 1,
						z: 1
					}
				}
			)
		).toEqual({
			grid: expectedGrid,
			selectedAsset,
			currentX: 1,
			currentZ: 1,
			dragging: false,
			mode: "extendWall",
			validX: [1, 2, 0],
			validZ: [1, 0, 2]
		});
	});

	it("should handle INSERT_ASSET", () => {
		const grid = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];

		const expectedGrid = [
			["0", "0", "0"],
			[
				"0",
				{
					adj: [true, true, true, true],
					id: "test-item",
					rotation: 180,
					stickers: null
				},
				"0"
			],
			["0", "0", "0"]
		];

		const selectedAsset = {
			id: "test-item",
			rotation: 270
		};

		expect(
			gridReducer(
				// State being passed in
				{ grid, selectedAsset, currentX: null, currentZ: null },
				// Action being passed in
				{
					type: actions.INSERT_ASSET,
					payload: {
						x: 1,
						z: 1
					}
				}
			)
		).toEqual({
			grid: expectedGrid,
			selectedAsset,
			currentX: 1,
			currentZ: 1,
			dragging: false,
			mode: "manipulation",
			selectedItem: {
				adj: [true, true, true, true],
				id: "test-item",
				rotation: 180,
				stickers: null
			}
		});
	});

	it("should handle UPDATE_ASSET_POSITION when no selected asset or pov_camera", () => {
		const grid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 180 }, "0"],
			["0", "0", "0"]
		];

		// no selected asset
		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: null,
					currentZ: null,
					selectedAsset: null
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "xRight"
				}
			)
		).toEqual({
			grid,
			currentX: null,
			currentZ: null,
			selectedAsset: null
		});

		// selected asset: pov_camera
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
					payload: "xRight"
				}
			)
		).toEqual({
			grid,
			currentX: null,
			currentZ: null,
			selectedAsset: { id: "pov_camera", title: "POV Camera" }
		});
	});

	it("should handle UPDATE_ASSET_POSITION xRight", () => {
		const grid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 180 }, "0"],
			["0", "0", "0"]
		];

		const blockedGrid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 180 }, "X"],
			["0", "0", "0"]
		];

		const expectedGrid = [
			["0", "0", "0"],
			[
				"0",
				"X",
				{ id: "bed-1", rotation: 180, stickers: ["0", "0", "0", "0"] }
			],
			["0", "0", "0"]
		];

		// cell to right is available
		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "xRight"
				}
			)
		).toEqual({
			grid: expectedGrid,
			currentX: 2,
			currentZ: 1,
			selectedAsset: { id: "bed-1" },
			selectedItem: {
				adj: [true, false, true, false],
				id: "bed-1",
				rotation: 180,
				stickers: ["0", "0", "0", "0"]
			}
		});

		// cell to right is NOT available
		expect(
			gridReducer(
				// State being passed in
				{
					grid: blockedGrid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "xRight"
				}
			)
		).toEqual({
			grid: blockedGrid,
			currentX: 1,
			currentZ: 1,
			selectedAsset: { id: "bed-1" }
		});
	});

	it("should handle UPDATE_ASSET_POSITION xLeft", () => {
		const grid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "0"]
		];

		const blockedGrid = [
			["0", "0", "0"],
			["X", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "0"]
		];

		const expectedGrid = [
			["0", "0", "0"],
			[{ id: "bed-1", rotation: 0, stickers: ["0", "0", "0", "0"] }, "X", "0"],
			["0", "0", "0"]
		];

		// cell to left is available
		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "xLeft"
				}
			)
		).toEqual({
			grid: expectedGrid,
			currentX: 0,
			currentZ: 1,
			selectedAsset: { id: "bed-1" },
			selectedItem: {
				adj: [true, false, true, false],
				id: "bed-1",
				rotation: 0,
				stickers: ["0", "0", "0", "0"]
			}
		});

		// cell to left is NOT available
		expect(
			gridReducer(
				// State being passed in
				{
					grid: blockedGrid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "xLeft"
				}
			)
		).toEqual({
			grid: blockedGrid,
			currentX: 1,
			currentZ: 1,
			selectedAsset: { id: "bed-1" }
		});
	});

	it("should handle UPDATE_ASSET_POSITION zUp", () => {
		const grid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "0"]
		];

		const blockedGrid = [
			["0", "0", "X"],
			["0", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "0"]
		];

		const expectedGrid = [
			["0", { id: "bed-1", rotation: 0, stickers: ["0", "0", "0", "0"] }, "X"],
			["0", "0", "0"],
			["0", "0", "0"]
		];

		// cell above is available
		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "zUp"
				}
			)
		).toEqual({
			grid: expectedGrid,
			currentX: 1,
			currentZ: 0,
			selectedAsset: { id: "bed-1" },
			selectedItem: {
				adj: [false, false, true, true],
				id: "bed-1",
				rotation: 0,
				stickers: ["0", "0", "0", "0"]
			}
		});

		// cell to above is NOT available
		expect(
			gridReducer(
				// State being passed in
				{
					grid: blockedGrid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "zUp"
				}
			)
		).toEqual({
			grid: blockedGrid,
			currentX: 1,
			currentZ: 1,
			selectedAsset: { id: "bed-1" }
		});
	});

	it("should handle UPDATE_ASSET_POSITION zDown", () => {
		const grid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "0"]
		];

		const blockedGrid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "X"]
		];

		const expectedGrid = [
			["0", "0", "0"],
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 0, stickers: ["0", "0", "0", "0"] }, "X"]
		];

		// cell below is available
		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "zDown"
				}
			)
		).toEqual({
			grid: expectedGrid,
			currentX: 1,
			currentZ: 2,
			selectedAsset: { id: "bed-1" },
			selectedItem: {
				adj: [true, false, false, true],
				id: "bed-1",
				rotation: 0,
				stickers: ["0", "0", "0", "0"]
			}
		});

		// cell to below is NOT available
		expect(
			gridReducer(
				// State being passed in
				{
					grid: blockedGrid,
					currentX: 1,
					currentZ: 1,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "zDown"
				}
			)
		).toEqual({
			grid: blockedGrid,
			currentX: 1,
			currentZ: 1,
			selectedAsset: { id: "bed-1" }
		});

		// this is to get test coverage for a 1x1 item
		const smallGrid = [["0", { id: "chair-1" }], ["0", "0"]];
		const expectedSmallGrid = [
			["0", "0"],
			["0", { id: "chair-1", rotation: 180, stickers: ["0", "0", "0", "0"] }]
		];
		expect(
			gridReducer(
				// State being passed in
				{
					grid: smallGrid,
					currentX: 1,
					currentZ: 0,
					selectedAsset: { id: "chair-1" }
				},
				// Action being passed in
				{
					type: actions.UPDATE_ASSET_POSITION,
					payload: "zDown"
				}
			)
		).toEqual({
			currentX: 1,
			currentZ: 1,
			grid: expectedSmallGrid,
			selectedAsset: { id: "chair-1" },
			selectedItem: {
				adj: [true, false, false, true],
				id: "chair-1",
				stickers: ["0", "0", "0", "0"]
			}
		});
	});

	it("should handle REFRESH_GRID", () => {
		const grid = [
			["0", "0", "0"],
			["0", { id: "bed-1", rotation: 0 }, "0"],
			["0", "0", "0"]
		];

		// cell below is available
		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					selectedAsset: { id: "bed-1" }
				},
				// Action being passed in
				{
					type: actions.REFRESH_GRID
				}
			)
		).toEqual({
			grid: grid,
			selectedAsset: { id: "bed-1" },
			dragging: false
		});
	});

	it("should handle EDIT_STICKER", () => {
		const grid = [
			[
				"0",
				{ id: "wall", rotation: 0, stickers: ["0", "currSticker", "0", "0"] }
			],
			["0", "0"]
		];

		const expectedGrid = [
			["0", { id: "wall", rotation: 0, stickers: ["0", "typeB", "0", "0"] }],
			["0", "0"]
		];

		expect(
			gridReducer(
				// State being passed in
				{
					grid
				},
				// Action being passed in
				{
					type: actions.EDIT_STICKER,
					payload: {
						x: 1,
						z: 0,
						direction: 1, // forward 1
						side: 1, // 2nd item in stickers array (currSticker)
						stickerTypes: ["typeA", "currSticker", "typeB"]
					}
				}
			)
		).toEqual({
			grid: expectedGrid,
			selectedItem: {
				id: "wall",
				rotation: 0,
				stickers: ["0", "typeB", "0", "0"]
			}
		});
	});

	it("should handle EXTEND_WALL", () => {
		const grid = [
			["0", "X", "0"],
			[
				"0",
				{ id: "wall", rotation: 0, stickers: ["0", "currSticker", "0", "0"] },
				"X"
			],
			["0", "0", "0"]
		];

		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: 1,
					currentZ: 1
				},
				// Action being passed in
				{
					type: actions.EXTEND_WALL
				}
			)
		).toEqual({
			grid: grid,
			currentX: 1,
			currentZ: 1,
			mode: "extendWall",
			validX: [1, 0],
			validZ: [1, 2]
		});
	});

	it("should handle EDIT_ASSET", () => {
		const grid = [
			["0", "X", "0"],
			["0", { id: "wall", rotation: 0 }, "X"],
			["0", "0", "0"]
		];

		const expectedGrid = [
			["0", "X", "0"],
			["0", { id: "wall", rotation: 0, stickers: ["0", "0", "0", "0"] }, "X"],
			["0", "0", "0"]
		];

		expect(
			gridReducer(
				// State being passed in
				{
					grid,
					currentX: 1,
					currentZ: 1
				},
				// Action being passed in
				{
					type: actions.EDIT_ASSET,
					payload: {
						x: 1,
						z: 1
					}
				}
			)
		).toEqual({
			currentX: 1,
			currentZ: 1,
			grid: expectedGrid,
			mode: "editAsset",
			selectedItem: { id: "wall", rotation: 0, stickers: ["0", "0", "0", "0"] }
		});
	});

	it("should handle FILL_WALLS", () => {
		const grid = [[{ id: "wall-1", rotation: 0 }, "0", "0"]];

		const expectedGrid = [
			[
				{ id: "wall-1", rotation: 0 },
				{ id: "wall-1", rotation: 0, stickers: null },
				{ id: "wall-1", rotation: 0, stickers: null }
			]
		];

		expect(
			gridReducer(
				// State being passed in
				{
					grid
				},
				// Action being passed in
				{
					type: actions.FILL_WALLS,
					payload: {
						x: 2,
						z: 0,
						extendX: 0,
						extendZ: 0
					}
				}
			)
		).toEqual({
			currentX: null,
			currentZ: null,
			grid: expectedGrid,
			mode: "none",
			selectedAsset: null,
			selectedItem: null,
			validX: null,
			validZ: null
		});
	});
});
