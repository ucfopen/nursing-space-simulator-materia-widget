import tourReducer from "../../src/js/reducers/tourReducer";

import {
	START_TOUR_SECTION,
	END_TOUR
} from "../../src/js/actions/tour_actions";

import {
	SELECT_ASSET_TYPE,
	INSERT_ASSET
} from "../../src/js/actions/grid_actions";

import { INIT_DATA } from "../../src/js/actions";

import { part1, clickInScene } from "../../src/js/steps";

const initialState = {
	tourRunning: true,
	steps: [],
	nextSteps: [],
	runNextSet: false,
	stepSetInQueue: "part1",
	stepCompletion: { 1: false, 2: false, 3: false, 4: false, 5: false }
};

const selectedAsset = {
	id: "wall-tv",
	assetId: "wall-tv"
};

const selectedAssetCamera = {
	id: "pov_camera",
	assetId: "pov_camera"
};

describe("tour reducer", () => {
	it("should return the inital state", () => {
		expect(
			tourReducer(
				// State being passed in
				undefined,
				// Action being passed in
				{}
			)
		).toEqual(initialState);
	});

	it("should return runNextSet", () => {
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
				type: START_TOUR_SECTION,
				payload: {
					steps: part1,
					nextSteps: clickInScene,
					stepSetInQueue: "clickInScene",
					stepCompletion: { 1: true, 2: false, 3: false, 4: false, 5: false }
				}
			}
		);
		expect(test).toHaveProperty("steps", part1);
		expect(test).toHaveProperty("nextSteps", clickInScene);
		expect(test).toHaveProperty("stepSetInQueue", "clickInScene");
		expect(test).toHaveProperty("stepCompletion", {
			1: true,
			2: false,
			3: false,
			4: false,
			5: false
		});
		expect(test).toHaveProperty("runNextSet", false);
	});

	////////////////////////////////////////////////////////////////////////

	it("goes to step:clickInScene", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: { 1: true, 2: false, 3: false, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickInScene");
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("ignores progressing to step:clickInScene if tour ended", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				tourRunning: false,
				stepCompletion: { 1: true, 2: false, 3: false, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "part1");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:clickInScene if stepCompletion not at expected step", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				// this is purposely an invalid stepCompletion
				stepCompletion: { 1: true, 2: true, 3: true, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "part1");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:clickInScene if pov_camera selected", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: { 1: true, 2: false, 3: false, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "part1");
		expect(test).toHaveProperty("runNextSet", false);
	});

	////////////////////////////////////////////////////////////////////////

	it("goes to step:part2", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickInScene",
				stepCompletion: { 1: true, 2: true, 3: false, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "part2");
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("ignores progressing to step:part2 if tour ended", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickInScene",
				tourRunning: false,
				stepCompletion: { 1: true, 2: true, 3: false, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickInScene");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:part2 if stepCompletion not at expected step", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickInScene",
				// this is purposely an invalid stepCompletion
				stepCompletion: { 1: true, 2: true, 3: true, 4: true, 5: false }
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickInScene");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:part2 if pov_camera selected", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickInScene",
				stepCompletion: { 1: true, 2: true, 3: false, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickInScene");
		expect(test).toHaveProperty("runNextSet", false);
	});

	////////////////////////////////////////////////////////////////////////

	it("goes to step:clickFirstPersonViewer", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "part2",
				stepCompletion: { 1: true, 2: true, 3: true, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickFirstPersonViewer");
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("ignores progressing to step:clickFirstPersonViewer if tour ended", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "part2",
				tourRunning: false,
				stepCompletion: { 1: true, 2: true, 3: true, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "part2");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:clickFirstPersonViewer if stepCompletion not at expected step", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "part2",
				// this is purposely an invalid stepCompletion
				stepCompletion: { 1: true, 2: true, 3: true, 4: true, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "part2");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:clickFirstPersonViewer if pov_camera is NOT selected", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickFirstPersonViewer",
				stepCompletion: { 1: true, 2: true, 3: true, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickFirstPersonViewer");
		expect(test).toHaveProperty("runNextSet", false);
	});

	////////////////////////////////////////////////////////////////////////

	it("goes to step:clickCameraInScene", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickFirstPersonViewer",
				stepCompletion: { 1: true, 2: true, 3: true, 4: true, 5: false }
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickCameraInScene");
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("ignores progressing to step:clickCameraInScene if tour ended", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickFirstPersonViewer",
				tourRunning: false,
				stepCompletion: { 1: true, 2: true, 3: true, 4: true, 5: false }
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickFirstPersonViewer");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:clickCameraInScene if stepCompletion not at expected step", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickFirstPersonViewer",
				// this is purposely an invalid stepCompletion
				stepCompletion: { 1: true, 2: false, 3: false, 4: false, 5: false }
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickFirstPersonViewer");
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("ignores progressing to step:clickCameraInScene if pov_camera is NOT selected", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepSetInQueue: "clickCameraInScene",
				stepCompletion: { 1: true, 2: true, 3: true, 4: true, 5: false }
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("stepSetInQueue", "clickCameraInScene");
		expect(test).toHaveProperty("runNextSet", false);
	});
});
