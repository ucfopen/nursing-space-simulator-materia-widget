export const START_TOUR_SECTION = "START_TOUR_SECTION";

export function startTourSection(tour, stepArray) {
	tour.setState({ index: 0 }, () => setTimeout(tour.start(true), 500));
	return {
		type: START_TOUR_SECTION,
		payload: { steps: stepArray }
	};
}
