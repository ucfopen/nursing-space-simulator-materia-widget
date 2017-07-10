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

import steps from "../../src/js/steps";

const initialState = {
	tourRunning: true,
	steps: steps,
	currentSteps: steps[0],
	runNextSet: false,
	stepCompletion: 0
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

	it("SELECT_ASSET_TYPE, stepCompletion:1, selectedAsset:object ===> runNextSet: True", () => {
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

	it("SELECT_ASSET_TYPE, stepCompletion:3, selectedAsset:camera ===> runNextSet: True", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 3
			},
			// Action being passed in
			{
				type: SELECT_ASSET_TYPE,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
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

	it("INSERT_ASSET, stepCompletion:2, selectedAsset:object ===> runNextSet: True", () => {
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

	it("INSERT_ASSET, stepCompletion:2, selectedAsset:camera ===> runNextSet: False", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 2
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
	});

	it("INSERT_ASSET, stepCompletion:4, selectedAsset:camera ===> runNextSet: True", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 4
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAssetCamera
			}
		);
		expect(test).toHaveProperty("runNextSet", true);
	});

	it("INSERT_ASSET, stepCompletion:4, selectedAsset:object ===> runNextSet: False", () => {
		const test = tourReducer(
			// State being passed in
			{
				...initialState,
				stepCompletion: 4
			},
			// Action being passed in
			{
				type: INSERT_ASSET,
				payload: selectedAsset
			}
		);
		expect(test).toHaveProperty("runNextSet", false);
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
});
