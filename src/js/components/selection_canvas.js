import React from "react";
import ReactDOM from "react-dom";

// Custom Modules
import AssetControls from "./ui/asset_controls";
import AssetTray from "./ui/asset_tray";
import MovementControls from "./ui/movement_controls";

export default class SelectionCanvas extends React.Component {
	componentDidMount() {
		this.updateCanvas();
	}

	componentDidUpdate() {
		if (window.lastMouseCoords.x && window.lastMouseCoords.y) {
			this.updateCanvas();
		}
	}

	updateCanvas() {
		const ctx = this.refs.canvas.getContext("2d");
		ctx.fillStyle = "rgba(192, 57, 43, 0.2)";
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
		if (this.props.deleteMultipleMode == false) {
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
