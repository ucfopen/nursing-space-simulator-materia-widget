const beginning = [
	{
		title: "Welcome to the Nursing Simulation Builder!",
		text:
			"Select <strong>Next</strong> to continue or <strong>Skip</strong> to close the tour.",
		selector: "#app",
		position: "top",
		style: {
			hole: { visibility: "hidden" }
		}
	},
	{
		title: "The Simulation Space",
		text:
			"Below is the scene where various objects can be placed. You can place additional walls and doors to create rooms.",
		selector: ".vr-scene",
		position: "top",
		style: {
			hole: { visibility: "hidden" }
		}
	},
	{
		title: "Moving the Camera",
		text: "The camera's position can be adjusted using these buttons. Use the dot in the center of the arrows to jump back to the starting position.",
		selector: "#camera-controls",
		position: "left",
		allowClicksThruHole: true
	},
	{
		title: "Taking a Screenshot",
		text: "This button can be used to take a screenshot of the room.",
		selector: "#screenshot",
		position: "left",
		allowClicksThruHole: true
	},
	{
		title: "Categories",
		text: "Here are the categories of objects to choose from.",
		selector: "#categories-list",
		position: "top"
	},
	{
		title: "Picking an Object",
		text: "Click/touch a bed now to select it.",
		selector: "#asset-picker button:first-child",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const clickInScene = [
	{
		title: "Placing an Object",
		text: "Click/touch inside the room to place the bed.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const objectOptions = [
	{
		title: "Object Options",
		text:
			"After an object is placed, an option panel appears. Use this panel to confirm placement, rotate, or remove the selected object.",
		selector: "#UI-selected-asset-options",
		position: "right",
		allowClicksThruHole: false
	},
	{
		title: "Object Movement",
		text:
			"The arrow buttons can be used to move a selected object within the scene. Clicking/touching an empty space will also move the object. Additionaly, if using the Chrome Browser, objects can be dragged around the scene.",
		selector: "#camera-controls",
		position: "left"
	},
	{
		title: "Placing Walls",
		text: "Select the <strong>Construction</strong> category.",
		selector: ".category-construction",
		position: "top",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const selectWallFromTray = [
	{
		title: "Placing Walls",
		text: "Click/touch the wall to select it.",
		selector: ".asset-wall-1",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const clickToPlaceWall = [
	{
		title: "Placing Walls",
		text: "Now click/touch in the scene to place the wall.",
		selector: ".a-canvas",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const clickToExtendWall = [
	{
		title: "Wall Extension",
		text: "Click/touch a valid green square to extend the wall.",
		selector: ".a-canvas",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const selectWallInScene = [
	{
		title: "Additional Options",
		text:
			"Some objects from the <strong>Construction</strong> category have additional options. Click/touch a wall in the scene to see more.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const extendWallButton = [
	{
		title: "Extend Wall",
		text:
			"This is the <strong>Extend</strong> button. It is only available on <strong>walls</strong>. It allows you to extend a previously placed wall. Click/touch it now.",
		selector: "#extendWall",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const extendWallAgain = [
	{
		title: "Extend Wall",
		text: "Click/touch a valid green square to extend the wall.",
		selector: ".a-canvas",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const selectWallAgain = [
	{
		title: "Attach Mode",
		text: "Select a wall to continue.",
		selector: ".a-canvas",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const attachButton = [
	{
		title: "Attach Mode",
		text:
			"This is the <strong>Attach</strong> button. It is available on walls and doors. Click/touch it now.",
		selector: "#editAsset",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const attachMode = [
	{
		title: "Attach Mode",
		text:
			"In <strong>Attach</strong> mode you can add various objects to your walls and doors.",
		selector: "#top-sticker-box",
		position: "top",
		allowClicksThruHole: true
	},
	{
		title: "Attach Mode",
		text:
			"Use the left and right arrows to cycle through the available objects. After you have made your selections, click/touch the checkmark in the top left to continue.",
		selector: ".sticker-arrow-right",
		position: "top",
		allowClicksThruHole: true
	}
];

const beforeClickFirstPersonViewr = [
	{
		title: "First-Person Viewer",
		text:
			"You can view your creation from a more personal point of view with the <strong>First-Person Viewer</strong>.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: true
	},
	{
		title: "First-Person Viewer",
		text: "Select the <strong>First-Person Viewer</strong> to continue.",
		selector: "#vr-viewer-mode",
		position: "left",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const clickFirstPersonViewer = [
	{
		title: "First-Person Viewer",
		text:
			"Click/touch an empty square in the scene to enter <strong>First-Person</strong>.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const clickCameraInScene = [
	{
		title: "Welcome to First-Person",
		text:
			"You are now in <strong>First-Person</strong>. Click and drag (or use your finger on a mobile device) to take a peek around.",
		selector: ".vr-scene",
		position: "bottom",
		allowClicksThruHole: true
	},
	{
		title: "VR Mode",
		text:
			"If on a supported mobile device, You can touch here to enter VR Mode! Otherwise, this will enter full-screen mode (which can be exited with <strong>Esc</strong> key). <img id='vr-gif' align='middle' height='250' width='350' src='assets/cardboard_vr.gif'></img>",
		selector: ".a-enter-vr-button",
		position: "bottom"
	},
	{
		title: "Exiting First-Person",
		text:
			"This button is used to exit <strong>First-Person</strong>. Click/touch here now.",
		selector: "#back",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				display: "none"
			}
		}
	}
];

const endTour = [
	{
		title: "Tour Complete",
		text:
			"That's all for now. Nursing Simulation Builder is currently under construction. Please leave us feedback to help improve our future releases. Have fun!",
		selector: ".vr-scene",
		position: "bottom",
		style: {
			hole: { visibility: "hidden" },
			skip: {
				display: "none"
			}
		}
	}
];

const steps = {
	0: beginning,
	1: clickInScene,
	2: objectOptions,
	3: selectWallFromTray,
	4: clickToPlaceWall,
	5: clickToExtendWall,
	6: selectWallInScene,
	7: extendWallButton,
	8: extendWallAgain,
	9: selectWallAgain,
	10: attachButton,
	11: attachMode,
	12: beforeClickFirstPersonViewr,
	13: clickFirstPersonViewer,
	14: clickCameraInScene,
	15: endTour
};

export default steps;
