import menuReducer from "../../src/js/reducers/tooltipReducer";
import * as actions from "../../src/js/actions/tooltip_actions";
import React from "react";

import {
	SHOW_ERROR_TOOLTIP,
	BAD_INSERT,
	BAD_WALL_EXTEND,
	IMPOSSIBLE_WALL_EXTEND,
	UPDATE_PERSISTENT_TOOLTIP,
	UPDATE_TEMPORARY_TOOLTIP,
	UPDATE_TIMED_TOOLTIP
} from "../../src/js/actions/tooltip_actions";

import {
	EXTEND_WALL,
	SELECT_ASSET_TYPE,
	EDIT_ASSET,
	INSERT_ASSET,
	DESELECT_ASSET,
	FILL_WALLS,
	REMOVE_ASSET,
	SELECT_ASSET
} from "../../src/js/actions/grid_actions";

import { TOGGLE_THIRD_PERSON } from "../../src/js/actions/camera_actions";

const initialState = {
	className: null,
	temporaryKey: null,
	temporaryText: "temp",
	temporary: false,
	persistentText: "persistent",
	persistent: false,
	prevSelectedType: null
};

describe("tooltip reducer", () => {
	it("should return the inital state", () => {
		expect(
			menuReducer(
				// State being passed in
				undefined,
				// Action being passed in
				{}
			)
		).toEqual(initialState);
	});
	it("should handle SHOW_ERROR_TOOLTIP", () => {
		const text = ["Can't place a ", <strong>title</strong>, " here."];
		const key = "test_key";
		expect(
			menuReducer(initialState, {
				type: SHOW_ERROR_TOOLTIP,
				payload: {
					error: BAD_INSERT,
					key: "test_key",
					assetTitle: "title"
				}
			})
		).toEqual({
			className: "error",
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: true,
			temporaryText: text,
			temporaryKey: key
		});

		expect(
			menuReducer(initialState, {
				type: SHOW_ERROR_TOOLTIP,
				payload: {
					error: BAD_WALL_EXTEND,
					key: "test_key",
					assetTitle: "title"
				}
			})
		).toEqual({
			className: "error",
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: true,
			temporaryText: "Walls can only be extended horizontally and vertically.",
			temporaryKey: key
		});

		expect(
			menuReducer(initialState, {
				type: SHOW_ERROR_TOOLTIP,
				payload: {
					error: IMPOSSIBLE_WALL_EXTEND,
					key: "test_key",
					assetTitle: "title"
				}
			})
		).toEqual({
			className: "error",
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: true,
			temporaryText: "This wall cannot be extended.",
			temporaryKey: key
		});

		expect(
			menuReducer(initialState, {
				type: SHOW_ERROR_TOOLTIP,
				payload: {
					error: null
				}
			})
		).toEqual(initialState);
	});

	it("should handle UPDATE_PERSISTENT_TOOLTIP", () => {
		expect(
			menuReducer(initialState, {
				type: UPDATE_PERSISTENT_TOOLTIP,
				payload: {
					className: "test_name",
					enabled: true,
					text: "test_text"
				}
			})
		).toEqual({
			className: "test_name",
			persistent: true,
			persistentText: "test_text",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle UPDATE_TEMPORARY_TOOLTIP", () => {
		expect(
			menuReducer(initialState, {
				type: UPDATE_TEMPORARY_TOOLTIP,
				payload: {
					className: "test_name",
					enabled: true,
					text: "test_text",
					key: "test_key"
				}
			})
		).toEqual({
			className: "test_name",
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: true,
			temporaryKey: "test_key",
			temporaryText: "test_text"
		});
	});

	it("should handle UPDATE_TIMED_TOOLTIP when state.temporaryKey == action.payload", () => {
		expect(
			menuReducer(
				{
					...initialState,
					temporaryKey: "test_payload"
				},
				{
					type: UPDATE_TIMED_TOOLTIP,
					payload: "test_payload"
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle UPDATE_TIMED_TOOLTIP when state.temporaryKey != action.payload", () => {
		expect(
			menuReducer(
				{
					...initialState,
					temporaryKey: "test_key"
				},
				{
					type: UPDATE_TIMED_TOOLTIP,
					payload: "test_payload"
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: "test_key",
			temporaryText: "temp"
		});
	});

	it("should handle EXTEND_WALL", () => {
		expect(
			menuReducer(
				{
					...initialState,
					persistent: true,
					persistentText: "Click on a valid space to auto-fill walls."
				},
				{
					type: EXTEND_WALL
				}
			)
		).toEqual({
			className: null,
			persistent: true,
			persistentText: "Click on a valid space to auto-fill walls.",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle SELECT_ASSET_TYPE", () => {
		expect(
			menuReducer(
				{
					...initialState,
					prevSelectedType: "test_type"
				},
				{
					type: SELECT_ASSET_TYPE,
					payload: {
						id: "pov_camera"
					}
				}
			)
		).toEqual({
			className: null,
			persistent: true,
			persistentText: "Click on a space to jump into first-person view.",
			prevSelectedType: "pov_camera",
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle SELECT_ASSET_TYPE if state.prevSelectedType != action.payload.id && action.payload.id != pov_camera", () => {
		const text = [
			"Click on a valid space to place a",
			" ",
			<strong>temp-title</strong>,
			"."
		];
		expect(
			menuReducer(
				{
					...initialState,
					prevSelectedType: "test_type"
				},
				{
					type: SELECT_ASSET_TYPE,
					payload: {
						id: "test-item"
					}
				}
			)
		).toEqual({
			className: null,
			persistent: true,
			persistentText: text,
			prevSelectedType: "test-item",
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle SELECT_ASSET_TYPE if state.prevSelectedType == action.payload.id", () => {
		expect(
			menuReducer(
				{
					...initialState,
					prevSelectedType: "test_type"
				},
				{
					type: SELECT_ASSET_TYPE,
					payload: {
						id: "test_type"
					}
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle TOGGLE_THIRD_PERSON", () => {
		expect(
			menuReducer(
				{
					...initialState
				},
				{
					type: TOGGLE_THIRD_PERSON
				}
			)
		).toEqual({
			className: null,
			persistent: true,
			persistentText: "Click on a space to jump into first-person view.",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle EDIT_ASSET", () => {
		expect(
			menuReducer(
				{
					...initialState
				},
				{
					type: EDIT_ASSET
				}
			)
		).toEqual({
			className: null,
			persistent: true,
			persistentText: "Select items to attach to the sides of this item.",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle INSERT_ASSET if action.payload.assetId == 'wall-1' && state.persistent", () => {
		expect(
			menuReducer(
				{
					...initialState,
					persistent: true
				},
				{
					type: INSERT_ASSET,
					payload: {
						assetId: "wall-1"
					}
				}
			)
		).toEqual({
			className: null,
			persistent: true,
			persistentText: "Click on a valid space to auto-fill walls.",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
		//if action.payload.assetId == pov_camera
		expect(
			menuReducer(
				{
					...initialState,
					persistent: true
				},
				{
					type: INSERT_ASSET,
					payload: {
						assetId: "pov_camera"
					}
				}
			)
		).toEqual({
			className: null,
			persistent: true,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
		//if action.payload.assetId != pov_camera or wall-1
		expect(
			menuReducer(
				{
					...initialState,
					persistent: true
				},
				{
					type: INSERT_ASSET,
					payload: {
						assetId: "test_id"
					}
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle DESELECT_ASSET", () => {
		expect(
			menuReducer(
				{
					...initialState
				},
				{
					type: DESELECT_ASSET
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle FILL_WALLS", () => {
		expect(
			menuReducer(
				{
					...initialState
				},
				{
					type: FILL_WALLS
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle REMOVE_ASSET", () => {
		expect(
			menuReducer(
				{
					...initialState
				},
				{
					type: REMOVE_ASSET
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});

	it("should handle SELECT_ASSET", () => {
		expect(
			menuReducer(
				{
					...initialState
				},
				{
					type: SELECT_ASSET
				}
			)
		).toEqual({
			className: null,
			persistent: false,
			persistentText: "persistent",
			prevSelectedType: null,
			temporary: false,
			temporaryKey: null,
			temporaryText: "temp"
		});
	});
});
