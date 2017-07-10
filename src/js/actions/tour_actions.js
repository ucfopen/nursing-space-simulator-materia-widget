export const START_TOUR_SECTION = "START_TOUR_SECTION";
export const END_TOUR = "END_TOUR";

export function startTourSection() {
	return {
		type: START_TOUR_SECTION
	};
}

export function endTour() {
	return {
		type: END_TOUR
	};
}
