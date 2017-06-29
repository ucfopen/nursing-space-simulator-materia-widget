export const START_TOUR_SECTION = "START_TOUR_SECTION";

export function startTourSection(stepArray) {
	return {
		type: START_TOUR_SECTION,
		payload: { steps: stepArray }
	};
}
