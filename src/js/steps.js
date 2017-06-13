export const part1 = [
	{
		title: "Welcome to Hospital Sim",
		text: "Select 'Next' to continue or 'Skip' to close the tour.",
		selector: "#app",
		position: "bottom"
	},
	{
		title: "The Room",
		text: "This is the hospital room where various objects can be placed.",
		// selector points to same element but joyride needs consecutive
		// selectors to be different
		selector: ".app-container",
		position: "bottom"
	},
	{
		title: "Moving the Camera",
		text: "The camera can be adjusted using the buttons in this panel.",
		selector: "#camera-controls",
		position: "left"
	},
	{
		title: "Taking a Screenshot",
		text: "Click/touch this button to take a screenshot of the room.",
		selector: "#screenshot",
		position: "left"
	},
	{
		title: "Categories",
		text:
			"Here are the categories of medical equipment. There are three categories to choose from.",
		selector: "#asset-selection-menu",
		position: "top"
	},
	{
		title: "Models",
		text: "Click/touch a model to select it and then hit 'Next' to continue.",
		selector: "#bed-1",
		position: "right",
		type: "click",
		allowClicksThruHole: "true"
	}
];

export const clickInScene = [
	{
		title: "Placing Objects",
		text: "Click/touch inside the room to place the object.",
		selector: ".vr-scene",
		position: "bottom",
		trigger: ".vr-scene"
	}
];

export const part2 = [
	{
		title: "Object Options",
		text:
			"After you select an object, you have the option to deselect, rotate and remove the object.",
		selector: "#UI-selected-asset-options",
		position: "right"
	},
	{
		title: "Object Options",
		text:
			"When an object is selected, the arrow keys can be used to move the object around inside the room.",
		selector: "#camera-move",
		position: "left"
	},
	{
		title: "First-Person Viewer",
		text:
			"You can view the room from a more personal point of view by selecting the 'First-Person Viewer'. After selecting 'First-Person' Viewer, click/touch somewhere in the room to take a look around.",
		selector: "#vr-viewer-mode",
		position: "top"
	},
	{
		title: "Fullscreen / VR Mode",
		text:
			"Select here to activate Fullscreen mode. If on a supported mobile device, VR mode will also activate! <img id='vr-gif' align='middle' height='250' width='350' src='assets/cardboard_vr.gif'></img>",
		selector: ".a-enter-vr-button",
		position: "bottom"
	}
];
