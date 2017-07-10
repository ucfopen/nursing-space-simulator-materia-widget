const beginning = [
	{
		title: "Welcome to the Nursing Simulation Builder!",
		text:
			"Select <strong>Next</strong> to continue or <strong>Skip</strong> to close the tour.",
		selector: ".vr-scene",
		position: "bottom",
		style: {
			hole: { visibility: "hidden" }
		}
	},
	{
		title: "The Simulation Space",
		text:
			"This is the empty space where various objects can be placed. You can place additional walls and doors to create individual rooms.",
		selector: ".a-canvas",
		position: "bottom",
		style: {
			beacon: {
				offsetY: -450
			}
		}
	},
	{
		title: "Moving the Camera",
		text:
			"The camera's position can be adjusted using the buttons in this panel.",
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
		text:
			"Here are the categories of objects and medical equipment to choose from.",
		selector: "#categories-list",
		position: "top",
		allowClicksThruHole: "true"
	},
	{
		title: "Picking an Object",
		text: "Click/touch an item to select it.",
		selector: "#asset-picker button:first-child",
		position: "right",
		allowClicksThruHole: "true",
		style: {
			footer: { display: "none " }
		}
	}
];

const clickInScene = [
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

const objectOptions = [
	{
		title: "Object Options",
		text:
			"After you place an object, you have the option to confirm the placement, rotate, or remove the object.",
		selector: "#UI-selected-asset-options",
		position: "right",
		allowClicksThruHole: "false"
	},
	{
		title: "Object Movement",
		text:
			"When an object is selected, the arrow keys can be used to move the object around inside the room. You can also click on another empty spot in the room to move it.",
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

const clickFirstPersonViewer = [
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

const clickCameraInScene = [
	{
		title: "Welcome to First Person",
		text:
			"Here you can look around the room you created by dragging the screen.",
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

const steps = {
	0: beginning,
	1: clickInScene,
	2: objectOptions,
	3: clickFirstPersonViewer,
	4: clickCameraInScene
};
export default steps;
