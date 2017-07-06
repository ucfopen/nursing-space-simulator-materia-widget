export const START_TOUR_SECTION = "START_TOUR_SECTION";
export const END_TOUR = "END_TOUR";

export function startTourSection(
	steps,
	nextSteps,
	stepSetInQueue,
	stepCompletion
) {
	return {
		type: START_TOUR_SECTION,
		payload: { steps, nextSteps, stepSetInQueue, stepCompletion }
	};
}

export function endTour() {
	return {
		type: END_TOUR
	};
}
