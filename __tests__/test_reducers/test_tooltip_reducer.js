import menuReducer from "../../src/js/reducers/tooltipReducer";
import * as actions from "../../src/js/actions/tooltip_actions";
import React from "react";

import {
	SHOW_ERROR_TOOLTIP,
	BAD_INSERT,
	BAD_WALL_EXTEND,
	IMPOSSIBLE_WALL_EXTEND
} from "../../src/js/actions/tooltip_actions";

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
			temporaryText:
				"Walls can only be extended horizontally and vertically.",
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
});
