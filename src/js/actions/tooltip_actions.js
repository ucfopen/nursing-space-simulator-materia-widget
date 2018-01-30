export const SHOW_ERROR_TOOLTIP = "SHOW_ERROR_TOOLTIP";
export function showErrorTooltip(error, key, assetTitle = null) {
	return {
		type: SHOW_ERROR_TOOLTIP,
		payload: { error, key, assetTitle }
	};
}

export const UPDATE_PERSISTENT_TOOLTIP = "UPDATE_PERSISTENT_TOOLTIP";
export function updatePersistentTooltip(enabled, text = "", className = null) {
	return {
		type: UPDATE_PERSISTENT_TOOLTIP,
		payload: { enabled, text, className }
	};
}

export const UPDATE_TEMPORARY_TOOLTIP = "UPDATE_TEMPORARY_TOOLTIP";
export function updateTemporaryTooltip(enabled, text = "", key = null, className = null) {
	return {
		type: UPDATE_TEMPORARY_TOOLTIP,
		payload: { enabled, text, key, className }
	};
}

export const UPDATE_TIMED_TOOLTIP = "UPDATE_TIMED_TOOLTIP";
export function updateTimedTooltip(key) {
	return {
		type: UPDATE_TIMED_TOOLTIP,
		payload: key
	};
}

// Error types
export const BAD_WALL_EXTEND = "BAD_WALL_EXTEND";
export const BAD_INSERT = "BAD_INSERT";
