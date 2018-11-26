import tourReducer from "../../src/js/reducers/tourReducer";

import {
	START_TOUR_SECTION,
	END_TOUR,
	RESTART_TOUR
} from "../../src/js/actions/tour_actions";

import {
	SELECT_ASSET_TYPE,
	INSERT_ASSET,
	DESELECT_ASSET,
	EDIT_ASSET,
	EXTEND_WALL,
	FILL_WALLS,
	SELECT_ASSET
} from "../../src/js/actions/grid_actions";

import { INIT_DATA } from "../../src/js/actions";

import { TOGGLE_THIRD_PERSON } from "../../src/js/actions/camera_actions";

import steps from "../../src/js/steps";
import { SET_CATEGORY, TOGGLE_HELP_VISIBILITY } from "../../src/js/actions/menu_actions";

const initialState = {
	tourRunning: true,
	steps: steps,
	currentSteps: steps[0],
	runNextSet: false,
	stepCompletion: 0
};

const selectedAsset = {
	id: "bed-1",
	assetId: "bed-1"
};

const selectedAssetCamera = {
	id: "pov_camera",
	assetId: "pov_camera"
};

describe("tour reducer", () => {
	it("should return runNextSet when started", () => {
		expect(
			tourReducer(
				// State being passed in
				initialState,
				// Action being passed in
				{ type: INIT_DATA }
			)
		).toHaveProperty("runNextSet", true);
	});

	it("should end the tour", () => {
		expect(
			tourReducer(
				// State being passed in
				undefined,
				// Action being passed in
				{
					type: END_TOUR
				}
			)
		).toHaveProperty("tourRunning", false);
	});

	it("should start a tour section", () => {
		const test = tourReducer(
			// State being passed in
			{ ...initialState, runNextSet: true },
			// Action being passed in
			{
				type: START_TOUR_SECTION
			}
		);
		expect(test).toHaveProperty("currentSteps", steps[0]);
		expect(test).toHaveProperty("stepCompletion", 1);
		expect(test).toHaveProperty("runNextSet", false);
	});

	////////////////////////////////////////////////////////////////////////

	it("SELECT_ASSET_TYPE, stepCompletion:1, selectedAsset:bed-1 ===> runNextSet: True", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 1
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("SELECT_ASSET_TYPE, stepCompletion:1, selectedAsset:camera ===> runNextSet: False", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 1
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it(`SET_CATEGORY, stepCompletion:3, selectedAsset:"construction" ===> runNextSet: True`, () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 3
			},
			// Action being passed in
			{
				type: SET_CATEGORY,
				payload: "construction"
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it(`SET_CATEGORY, stepCompletion:3, selectedAsset:"construction" ===> runNextSet: True`, () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				tourRunning: false,
				stepCompletion: 3
			},
			// Action being passed in
			{
				type: SET_CATEGORY,
				payload: "construction"
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("SELECT_ASSET_TYPE, stepCompletion:3, selectedAsset:object ===> runNextSet: False", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 3
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("SELECT_ASSET_TYPE: runNextSet False if tour ended", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				tourRunning: false
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("SELECT_ASSET_TYPE: runNextSet False if stepCompletion not at expected step", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				// this is purposely an invalid stepCompletion
				stepCompletion: "invalid"
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	////////////////////////////////////////////////////////////////////////

	it("INSERT_ASSET, stepCompletion:2, selectedAsset:bed-1 ===> runNextSet: True", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 2
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("INSERT_ASSET, stepCompletion:14, selectedAsset:camera ===> runNextSet: True", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				tourRunning: true,
				stepCompletion: 14
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("INSERT_ASSET, stepCompletion:5, selectedAsset:wall-1 ===> runNextSet: True", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				tourRunning: true,
				stepCompletion: 5
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: { assetId: "wall-1" }
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("SELECT_ASSET_TYPE, stepCompletion:4, selectedAsset:wall-1 ===> runNextSet: False", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 4
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: { id: "wall-1" }
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("SELECT_ASSET_TYPE, stepCompletion:13, selectedAsset:wall-1 ===> runNextSet: False", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 13
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("INSERT_ASSET: runNextSet False if tour ended", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				tourRunning: false
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("INSERT_ASSET: runNextSet False if stepCompletion not at expected step", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				// this is purposely an invalid stepCompletion
				stepCompletion: "invalid"
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("DESELECT_ASSET, stepCompletion:12", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 12,
				tourRunning: true
			},
			// Action being passed in
			{
				type: DESELECT_ASSET
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("DESELECT_ASSET, stepCompletion:12, if tour is not running", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 12,
				tourRunning: false
			},
			// Action being passed in
			{
				type: DESELECT_ASSET
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("EDIT_ASSET, stepCompletion:11", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 11,
				tourRunning: true
			},
			// Action being passed in
			{
				type: EDIT_ASSET
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("EDIT_ASSET, stepCompletion:11, if tour is not running", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 11,
				tourRunning: false
			},
			// Action being passed in
			{
				type: EDIT_ASSET
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("EXTEND_WALL, stepCompletion:8", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 8,
				tourRunning: true
			},
			// Action being passed in
			{
				type: EXTEND_WALL
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("EXTEND_WALL, stepCompletion:8, if tour is not running", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 8,
				tourRunning: false
			},
			// Action being passed in
			{
				type: EXTEND_WALL
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("FILL_WALLS, stepCompletion:6", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 6,
				tourRunning: true
			},
			// Action being passed in
			{
				type: FILL_WALLS
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("FILL_WALLS, stepCompletion:9", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 9,
				tourRunning: true
			},
			// Action being passed in
			{
				type: FILL_WALLS
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("FILL_WALLS, stepCompletion:9, if tour is not running", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 9,
				tourRunning: false
			},
			// Action being passed in
			{
				type: FILL_WALLS
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("should RESTART_TOUR", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 0,
				tourRunning: true,
				runNextSet: true
			},
			// Action being passed in
			{
				type: RESTART_TOUR
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("SELECT_ASSET, stepCompletion:7", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 7,
				tourRunning: true
			},
			// Action being passed in
			{
				type: SELECT_ASSET
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("SELECT_ASSET, stepCompletion:7, if tour is not running", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 7,
				tourRunning: false
			},
			// Action being passed in
			{
				type: SELECT_ASSET
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("SELECT_ASSET, stepCompletion:10", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 10,
				tourRunning: true
			},
			// Action being passed in
			{
				type: SELECT_ASSET
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("TOGGLE_HELP_VISIBILITY, stepCompletion:16", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 16,
				tourRunning: true
			},
			// Action being passed in
			{
				type: TOGGLE_HELP_VISIBILITY
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("TOGGLE_HELP_VISIBILITY, stepCompletion:16, if tour is not running", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 16,
				tourRunning: false
			},
			// Action being passed in
			{
				type: TOGGLE_HELP_VISIBILITY
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("TOGGLE_THIRD_PERSON, stepCompletion:15", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 15,
				tourRunning: true
			},
			// Action being passed in
			{
				type: TOGGLE_THIRD_PERSON
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("should trigger default case", () => {
		const test = tourReducer(
			// State being passed in
			initialState,
			// Action being passed in
			{}
		);
		expect(test).toBe(initialState);
	});
});
