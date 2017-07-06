export const START_TOUR_SECTION = "START_TOUR_SECTION";
export const SKIP_TOUR = "SKIP_TOUR";

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

export function stopTour() {
	return {
		type: SKIP_TOUR
	};
}
