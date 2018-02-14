import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import {
	toggleThirdPerson,
	updateCameraPosition
} from "../../actions/camera_actions";
import {
	deselectAsset,
	editAsset,
	extendWall,
	removeAsset,
	rotateAsset,
	selectAssetType,
	updateAssetPosition
} from "../../actions/grid_actions"
import {
	setCategory,
	toggleHelpVisibility,
	toggleKeyboardShortcuts,
	toggleMenuVisibility
} from "../../actions/menu_actions";
import { showErrorTooltip } from "../../actions/tooltip_actions";

export class KeyboardControls extends Component {

	processKey (e) {
		document.activeElement.blur();

		const { currentX, currentZ, mode, selectedAsset, thirdPerson } = this.props;
		const {
			deselectAsset,
			editAsset,
			extendWall,
			removeAsset,
			rotateAsset,
			selectAssetType,
			setCategory,
			toggleHelpVisibility,
			toggleMenuVisibility,
			toggleThirdPerson,
			updateAssetPosition,
			updateCameraPosition
		} = this.props;

		if (!thirdPerson) {
			if (e.key == "Escape")
				toggleThirdPerson();
			return;
		}

		switch(e.key.toUpperCase()) {
			case "X":
			case "-":
				return updateCameraPosition("yUp");

			case "Z":
			case "=":
			case "+":
				return updateCameraPosition("yDown");

			case "C":
				return updateCameraPosition("reset");

			case "M":
				return toggleMenuVisibility();

			case "ESCAPE":
			case "Q":
				if (mode == "manipulation" ||
					mode == "editAsset" ||
					mode == "extendWall" ||
					mode == "assetTypeSelected")
					return deselectAsset(mode == "editAsset");
				break;

			case "R":
				if (mode == "manipulation") {
					return rotateAsset(currentX, currentZ);
				}
				break;

			case "T":
				if (mode == "manipulation") {
					return removeAsset(currentX, currentZ);
				}
				break;

			case "V":
				if (mode == "manipulation" &&
					selectedAsset &&
					["wall-1", "door-1"].includes(selectedAsset.id)
				) {
					return editAsset(currentX, currentZ);
				}
				break;

			case "E":
				if (mode == "manipulation" &&
					selectedAsset &&
					selectedAsset.id == "wall-1"
				) {
					return extendWall(currentX, currentZ);
				}
				break;

			case "1":
			case "2":
			case "3":
					setCategory(HS_CATEGORIES[parseInt(e.key) - 1]);
				break;

			case "F":
			case "4":
				if (mode != "extendWall" && mode != "editAsset") {
					if (selectedAsset && selectedAsset.id == "pov_camera") {
						deselectAsset();
					}
					else {
						selectAssetType({
							id: "pov_camera",
							title: "POV Camera"
						});
					}
				}

			case "ARROWUP":
			case "W":
				if (mode == "manipulation") {
					updateAssetPosition("zUp")
				}
				break;

			case "ARROWLEFT":
			case "A":
				if (mode == "manipulation") {
					updateAssetPosition("xLeft")
				}
				break;

			case "ARROWDOWN":
			case "S":
				if (mode == "manipulation") {
					updateAssetPosition("zDown")
				}
				break;

			case "ARROWRIGHT":
			case "D":
				if (mode == "manipulation") {
					updateAssetPosition("xRight")
				}
				break;

			case "H":
				return toggleHelpVisibility();
		}
	}

	render() {
		const { shortcutsEnabled, thirdPerson } = this.props;
		window.onkeydown = (e) => {
			shortcutsEnabled
				? this.processKey(e)
				: null
		};

		return (
			<button
				id="keyboard-shortcut"
				className={shortcutsEnabled ? "active" : null}
				onClick={(e) => this.props.toggleHelpVisibility()}
				// preventDefault on mousedown prevents items underneath from being dragged
				onMouseDown={(e)=>e.preventDefault()}>
				Help and Keyboard Shortcuts
			</button>
		);
	}
}

function mapStateToProps({ grid, position, menu }) {
	return {
		currentX: grid.currentX,
		currentZ: grid.currentZ,
		mode: grid.mode,
		selectedAsset: grid.selectedAsset,
		shortcutsEnabled: menu.shortcutsEnabled,
		thirdPerson: position.thirdPerson
	};
}

export default connect(mapStateToProps, {
	deselectAsset,
	editAsset,
	extendWall,
	removeAsset,
	rotateAsset,
	selectAssetType,
	setCategory,
	showErrorTooltip,
	toggleHelpVisibility,
	toggleKeyboardShortcuts,
	toggleMenuVisibility,
	toggleThirdPerson,
	updateAssetPosition,
	updateCameraPosition
})(KeyboardControls);

export function getCurrentPosition() {
	if (!document || !document.querySelector('#cameratp'))
		return null;

	return document.querySelector('#cameratp').getAttribute('position');
}
