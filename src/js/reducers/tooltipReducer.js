import {
	UPDATE_PERSISTENT_TOOLTIP,
	UPDATE_TEMPORARY_TOOLTIP
} from "../actions/tooltip_actions";
import {
	EDIT_ASSET,
	EXTEND_WALL,
	DESELECT_ASSET,
	FILL_WALLS,
	INSERT_ASSET,
	REMOVE_ASSET,
	SELECT_ASSET,
	SELECT_ASSET_TYPE
 } from "../actions/grid_actions";

export default function(
	state = {
		temporaryText: "temp",
		temporary: false,
		persistentText: "persistent",
		persistent: false
	},
	action
) {
	switch (action.type) {
		case UPDATE_PERSISTENT_TOOLTIP:
			return {
				...state,
				persistent: action.payload.enabled,
				persistentText: action.payload.text
			};

		case UPDATE_TEMPORARY_TOOLTIP:
			return {
				...state,
				temporary: action.payload.enabled,
				temporaryText: action.payload.text
			};

		case EXTEND_WALL:
			return {
				...state,
				temporary: false,
				persistent: true,
				persistentText: "Click on a valid space to auto-fill walls."
			};

		case SELECT_ASSET_TYPE:
			return {
				...state,
				temporary: false,
				persistent: true,
				persistentText:
					action.payload.id == "pov_camera"
						? "Click on a space to jump into first-person view."
						: "Click on a valid space to place this item."
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
					temporary: false,
					persistent: true,
					persistentText: "Click on a valid space to auto-fill walls."
				};
			}
			return {
				...state,
				temporary: false,
				persistent: false
			};

		case DESELECT_ASSET:
		case FILL_WALLS:
		case REMOVE_ASSET:
		case SELECT_ASSET:
			return {
				...state,
				temporary: false,
				persistent: false
			};

		default:
			return state;
	}
}
