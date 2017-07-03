export const START_TOUR_SECTION = "START_TOUR_SECTION";

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
