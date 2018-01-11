import {
	UPDATE_PERSISTENT_TOOLTIP,
	UPDATE_TEMPORARY_TOOLTIP
} from "../actions/tooltip_actions";
import {
	EDIT_STICKER,
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
				persistentText: "Click on a valid space to place this item."
			};

		case EDIT_STICKER:
		case DESELECT_ASSET:
		case FILL_WALLS:
		case INSERT_ASSET:
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
