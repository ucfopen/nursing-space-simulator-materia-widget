export const part1 = [
	{
		title: "Welcome to Hospital Sim",
		text:
			"Select <strong>Next</strong> to continue or <strong>Skip</strong> to close the tour.",
		selector: ".vr-scene",
		position: "bottom",
		allowClicksThruHole: "false",
		style: {
			hole: { visibility: "hidden" }
		}
	},
	{
		title: "The Room",
		text: "This is the hospital room where various objects can be placed.",
		selector: ".a-canvas",
		position: "bottom"
	},
	{
		title: "Moving the Camera",
		text: "The camera can be adjusted using the buttons in this panel.",
		selector: "#camera-controls",
		position: "left",
		allowClicksThruHole: "true"
	},
	{
		title: "Taking a Screenshot",
		text: "Click/touch this button to take a screenshot of the room.",
		selector: "#screenshot",
		position: "left",
		allowClicksThruHole: "true"
	},
	{
		title: "Categories",
		text: "Here are the categories of medical equipment to choose from.",
		selector: "#categories-list",
		position: "top",
		allowClicksThruHole: "true"
	},
	{
		title: "Models",
		text: "Click/touch a model to select it.",
		selector: "#asset-picker button:first-child",
		position: "right",
		allowClicksThruHole: "true",
		style: {
			footer: { display: "none " }
		}
	}
];

export const clickInScene = [
	{
		title: "Placing Objects",
		text: "Click/touch inside the room to place the object.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: "true",
		style: {
			footer: { display: "none " }
		}
	}
];

export const part2 = [
	{
		title: "Object Options",
		text:
			"After you select an object, you have the option to confirm the placement, rotate, and remove the object.",
		selector: "#UI-selected-asset-options",
		position: "right",
		allowClicksThruHole: "false"
	},
	{
		title: "Object Movement",
		text:
			"When an object is selected, the arrow keys can be used to move the object around inside the room.",
		selector: "#camera-controls",
		position: "left",
		allowClicksThruHole: "true"
	},
	{
		title: "First-Person Viewer",
		text:
			"You can view the room from a more personal point of view by selecting the <strong>First-Person Viewer</strong>.",
		selector: "#vr-viewer-mode",
		position: "top",
		allowClicksThruHole: "true",
		style: {
			footer: { display: "none " }
		}
	}
];

export const clickCameraInScene = [
	{
		title: "Welcome to First Person",
		text:
			"Here you can look around in the room you created by dragging the screen.",
		selector: ".vr-scene",
		position: "bottom",
		allowClicksThruHole: "true"
	},
	{
		title: "Going Back",
		text: "You can click/touch here to return to the previous view.",
		selector: "#back",
		position: "bottom",
		allowClicksThruHole: "true"
	},
	{
		title: "VR Mode",
		text:
			"If on a supported mobile device, You can touch here to enter VR Mode! <img id='vr-gif' align='middle' height='250' width='350' src='assets/cardboard_vr.gif'></img>",
		selector: ".a-enter-vr-button",
		position: "bottom",
		allowClicksThruHole: "true"
	}
];

export const clickFirstPersonViewer = [
	{
		title: "Go Into First-Person View",
		text: "Click/touch inside the room to go into first-person mode.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: "true",
		style: {
			footer: { display: "none " }
		}
	}
];
