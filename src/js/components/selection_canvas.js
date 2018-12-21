import React, { Component } from "react";
import Joyride from "react-joyride";
import { connect } from "react-redux";

// Custom React Components
import HUD from "./hud";
import VRScene from "./vr_scene";

// Redux Actions
import { initData } from "../actions";
import { startTourSection, endTour } from "../actions/tour_actions";
import {
	deleteMultipleAssets,
	selectMultipleAssets
} from "../actions/grid_actions";

// JSON structure describing asset data
import assetData from "../../assets/assets.json";

class SelectionCanvas extends Component {
	componentDidMount() {
		this.updateCanvas();
	}

	componentDidUpdate() {
		if (window.lastMouseCoords.x && window.lastMouseCoords.y) {
			this.updateCanvas();
		}
	}

	updateCanvas() {
		if (this.props.firstX == null) {
			return;
		}
		const ctx = this.refs.canvas.getContext("2d");
		ctx.fillStyle = "rgba(192, 57, 43, 0.2)";
		if (this.props.mode == "selectMultiple") {
			ctx.fillStyle = "rgba(24, 209, 40, 0.2)";
		}
		ctx.clearRect(0, 0, 2000, 2000);
		var rectWidth = window.mouseCoords.x - window.lastMouseCoords.x;
		var rectHeight = window.mouseCoords.y - window.lastMouseCoords.y;

		ctx.fillRect(
			window.lastMouseCoords.x,
			window.lastMouseCoords.y,
			rectWidth,
			rectHeight
		);
		window.requestAnimationFrame(() => this.updateCanvas());
	}

	render() {
		if (
			this.props.mode != "deleteMultiple" &&
			this.props.mode != "selectMultiple"
		) {
			return null;
		}
		return (
			<canvas
				id="selection_canvas"
				ref="canvas"
				width={3000}
				height={3000}
			/>
		);
	}
}

function mapStateToProps({ grid }) {
	return {
		mode: grid.mode,
		firstX: grid.firstX
	};
}

export default connect(mapStateToProps)(SelectionCanvas);
