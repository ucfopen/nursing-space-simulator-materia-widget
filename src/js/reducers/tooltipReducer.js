import React, { Component } from "react";

import { TOGGLE_THIRD_PERSON } from "../actions/camera_actions";
import {
	EDIT_ASSET,
	EXTEND_WALL,
	DESELECT_ASSET,
	FILL_WALLS,
	INSERT_ASSET,
	REMOVE_ASSET,
	SELECT_ASSET,
	SELECT_ASSET_TYPE,
 } from "../actions/grid_actions";
import {
	BAD_INSERT,
	BAD_WALL_EXTEND,
	IMPOSSIBLE_WALL_EXTEND,
	SHOW_ERROR_TOOLTIP,
	UPDATE_PERSISTENT_TOOLTIP,
	UPDATE_TEMPORARY_TOOLTIP,
	UPDATE_TIMED_TOOLTIP
} from "../actions/tooltip_actions";

export default function(
	state = {
		className: null,
		temporaryKey: null,
		temporaryText: "temp",
		temporary: false,
		persistentText: "persistent",
		persistent: false,
		prevSelectedType: null
	},
	action
) {
	switch (action.type) {

		case SHOW_ERROR_TOOLTIP:
			switch (action.payload.error) {
				case BAD_INSERT:
					const text = (
						<p>
							Can't place a <strong>{action.payload.assetTitle}</strong> here.
						</p>
					).props.children;
					return {
						...state,
						className: "error",
						temporary: true,
						temporaryText: text,
						temporaryKey: action.payload.key
					};
				case BAD_WALL_EXTEND:
					return {
						...state,
						className: "error",
						temporary: true,
						temporaryText: "Walls can only be extended horizontally and vertically.",
						temporaryKey: action.payload.key
					};
				case IMPOSSIBLE_WALL_EXTEND:
					return {
						...state,
						className: "error",
						temporary: true,
						temporaryText: "This wall cannot be extended.",
						temporaryKey: action.payload.key
					};
				default:
					return state;
			}

		case UPDATE_PERSISTENT_TOOLTIP:
			return {
				...state,
				className: action.payload.className,
				persistent: action.payload.enabled,
				persistentText: action.payload.text
			};

		case UPDATE_TEMPORARY_TOOLTIP:
			// Temporary messages are keyed (random number), so if they bubble
			// they're removed properly
			return {
				...state,
				className: action.payload.className,
				temporary: action.payload.enabled,
				temporaryText: action.payload.text,
				temporaryKey: action.payload.key
			};

		case UPDATE_TIMED_TOOLTIP:
			if (state.temporaryKey == action.payload) {
				return {
					...state,
					className: null,
					temporary: false,
					temporaryKey: null
				}
			}
			return state;

		case EXTEND_WALL:
			return {
				...state,
				temporary: false,
				persistent: true,
				persistentText: "Click on a valid space to auto-fill walls."
			};

		case SELECT_ASSET_TYPE:
			if (state.prevSelectedType != action.payload.id) {
				const text = (
					action.payload.id == "pov_camera"
						? "Click on a space to jump into first-person view."
						: (
							<p>Click on a valid space to place a
								<strong> {HS_ASSETS[action.payload.id].title}</strong>.
							</p>
						).props.children
				);
				return {
					...state,
					className: null,
					prevSelectedType: action.payload.id,
					temporary: false,
					persistent: true,
					persistentText: text
				};
			}
			return {
				...state,
				className: null,
				prevSelectedType: null,
				temporary: false,
				persistent: false
			};

		case TOGGLE_THIRD_PERSON:
			return {
				...state,
				persistent: true,
				persistentText: "Click on a space to jump into first-person view."
			};

		case EDIT_ASSET:
			return {
				...state,
				temporary: false,
				persistent: true,
				persistentText: "Select items to attach to the sides of this item."
			}

		case INSERT_ASSET:
			if (action.payload.assetId == "wall-1" && state.persistent) {
				return {
					...state,
					prevSelectedType: null,
					temporary: false,
					persistent: true,
					persistentText: "Click on a valid space to auto-fill walls."
				};
			}
			if (action.payload.assetId == "pov_camera") {
				return state;
			}
			return {
				...state,
				prevSelectedType: null,
				temporary: false,
				persistent: false
			};

		case DESELECT_ASSET:
		case FILL_WALLS:
		case REMOVE_ASSET:
		case SELECT_ASSET:
			return {
				...state,
				prevSelectedType: null,
				temporary: false,
				persistent: false
			};

		default:
			return state;
	}
}
