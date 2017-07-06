import {
	part1,
	part2,
	clickCameraInScene,
	clickInScene,
	clickFirstPersonViewer
} from "./steps.js";

export default function(props, nextProps) {
	let steps, nextSteps, stepSetInQueue, stepCompletion;

	if (nextProps.runNextSet === true) {
		stepCompletion = { ...props.stepCompletion };
		switch (props.stepSetInQueue) {
			case "part1":
				steps = part1;
				nextSteps = clickInScene;
				stepSetInQueue = "clickInScene";
				stepCompletion[1] = true;
				break;
			case "clickInScene":
				steps = clickInScene;
				nextSteps = part2;
				stepSetInQueue = "part2";
				stepCompletion[2] = true;
				break;
			case "part2":
				steps = part2;
				nextSteps = clickFirstPersonViewer;
				stepSetInQueue = "clickFirstPersonViewer";
				stepCompletion[3] = true;
				break;
			case "clickFirstPersonViewer":
				steps = clickFirstPersonViewer;
				nextSteps = clickCameraInScene;
				stepSetInQueue = "clickCameraInScene";
				stepCompletion[4] = true;
				break;
			case "clickCameraInScene":
				steps = clickCameraInScene;
				nextSteps = [];
				stepSetInQueue = "no more steps";
				stepCompletion[5] = true;
				break;
		}
	}
	return { steps, nextSteps, stepSetInQueue, stepCompletion };
}
