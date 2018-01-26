export const UPDATE_PERSISTENT_TOOLTIP = "UPDATE_PERSISTENT_TOOLTIP";
export function updatePersistentTooltip(enabled, text = "") {
	return {
		type: UPDATE_PERSISTENT_TOOLTIP,
		payload: { enabled, text }
	};
}

export const UPDATE_TEMPORARY_TOOLTIP = "UPDATE_TEMPORARY_TOOLTIP";
export function updateTemporaryTooltip(enabled, text = "") {
	return {
		type: UPDATE_TEMPORARY_TOOLTIP,
		payload: { enabled, text }
	};
}

export const UPDATE_TIMED_TOOLTIP = "UPDATE_TIMED_TOOLTIP";
export function updateTimedTooltip(matchingText) {
	return {
		type: UPDATE_TIMED_TOOLTIP,
		payload: matchingText
	};
}