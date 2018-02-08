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
		text: "The camera's position can be adjusted using these buttons. The middle button recenters the camera.",
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
		text: "Here are the categories of objects to choose from. Make sure the <strong>Equipment</strong> category is selected.",
		selector: "#categories-list",
		position: "top",
		allowClicksThruHole: true
	},
	{
		title: "Picking an Object",
		text: "<strong>Click/touch</strong> a bed now to select it.",
		selector: "#asset-picker button:first-child",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const clickInScene = [
	{
		title: "Placing an Object",
		text: "<strong>Click/touch</strong> inside the room to place the bed.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const objectOptions = [
	{
		title: "Object Options",
		text:
			"After an object is placed, this option panel appears. Here you confirm placement, rotate, or remove the selected object.",
		selector: "#UI-selected-asset-options",
		position: "right",
		allowClicksThruHole: true
	},
	{
		title: "Object Movement",
		text:
			"The arrow buttons can be used to move a selected object within the scene. Clicking/touching an empty space will also move the object. Additionally, if using the Chrome Browser, objects can be dragged around the scene.",
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
				visibility: "hidden"
			}
		}
	}
];

const selectWallFromTray = [
	{
		title: "Placing Walls",
		text: "<strong>Click/touch</strong> the wall to select it.",
		selector: ".asset-wall-1",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const clickToPlaceWall = [
	{
		title: "Placing Walls",
		text: "Now <strong>click/touch</strong> in the scene to place the wall.",
		selector: ".a-canvas",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const clickToExtendWall = [
	{
		title: "Wall Extension",
		text: "<strong>Click/touch</strong> a valid green square to extend the wall.",
		selector: ".a-canvas",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const selectWallInScene = [
	{
		title: "Additional Options",
		text:
			"Some objects from the <strong>Construction</strong> category have additional options. <strong>Click/touch</strong> a wall in the scene to see more.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const extendWallButton = [
	{
		title: "Extend Wall",
		text:
			"This is the <strong>Extend</strong> button. It is only available on <strong>walls</strong>. It allows you to extend a previously placed wall. <strong>Click/touch</strong> it now.",
		selector: "#extendWall",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const extendWallAgain = [
	{
		title: "Extend Wall",
		text: "<strong>Click/touch</strong> a valid green square to extend the wall.",
		selector: ".a-canvas",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
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
				visibility: "hidden"
			}
		}
	}
];

const attachButton = [
	{
		title: "Attach Mode",
		text:
			"This is the <strong>Attach</strong> button. It is available on walls and doors. <strong>Click/touch</strong> it now.",
		selector: "#editAsset",
		position: "right",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
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
			"Use the left and right arrows to cycle through the available objects. After you have made your selections, <strong>click/touch</strong> the checkmark in the top left to continue.",
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
				visibility: "hidden"
			}
		}
	}
];

const clickFirstPersonViewer = [
	{
		title: "First-Person Viewer",
		text:
			"<strong>Click/touch</strong> an empty square in the scene to enter <strong>First-Person</strong>.",
		selector: ".a-canvas",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
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
			"If on a supported mobile device, you can touch here to enter VR Mode! Otherwise, this will enter full-screen mode (which can be exited with <strong>Esc</strong> key). <img id='vr-gif' align='middle' height='250' width='350' src='assets/cardboard_vr.gif'></img>",
		selector: ".a-enter-vr-button",
		position: "bottom"
	},
	{
		title: "Exiting First-Person",
		text:
			"This button is used to exit <strong>First-Person</strong>. <strong>Click/touch</strong> here now.",
		selector: "#back",
		position: "bottom",
		allowClicksThruHole: true,
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const help = [
	{
		title: "Help & Keyboard Shortcuts",
		text:
			"<strong>Click/touch</strong> here to see the help & keyboard shortcuts menu.",
		selector: "#keyboard-shortcut",
		position: "bottom",
		style: {
			button: {
				visibility: "hidden"
			}
		}
	}
];

const endTour = [
	{
		title: "Help & Keyboard Shortcuts",
		text:
			"Here you can restart this tour anytime.<br/>There's also a list of keyboard shortcuts, if you chose to enable them.",
		selector: "#help-pane",
		position: "bottom"
	},
	{
		title: "Tour Complete",
		text:
			"That's all for now. Nursing Simulation Builder is currently under construction. Please leave us feedback to help improve our future releases. Have fun!",
		selector: ".vr-scene",
		position: "bottom",
		style: {
			hole: { visibility: "hidden" },
			skip: {
				visibility: "hidden"
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
	15: help,
	16: endTour
};

export default steps;
