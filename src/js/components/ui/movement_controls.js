import React from "react";
import ReactDOM from "react-dom";

export default class MovementControls extends React.Component {
	// TODO: GET THIS OUT ASAP, this is only in for the demo on the week of 6/12/17
	takeScreenShot() {
		document
			.querySelector("a-scene")
			.components.screenshot.capture("perspective");
	}
	// BAD ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

	render() {
		return (
			<div id="UI-right-panel">
				<div id="top-buttons" />
				<button onClick={this.takeScreenShot.bind(this)} id="screenshot">
					<img src="assets/icon-svgs/screenshot.svg" width="60px" height="60px" alt="Take a Screenshot" />
				</button>
				<div id="camera-move">
					<button id="camera-up" onClick={this.props.xUp}><img src="assets/icon-svgs/up_arrow.svg" width="50px" height="50px" alt="Move camera or asset up" /></button>
					<div id="camera-move-horizontal">
						<button id="camera-left" onClick={this.props.zUp}><img src="assets/icon-svgs/left_arrow.svg" width="50px" height="50px" alt="Move camera or asset left" /></button>
						<button id="camera-right" onClick={this.props.zDown}><img src="assets/icon-svgs/right_arrow.svg" width="50px" height="50px" alt="Move camera or asset right" /></button>
					</div>
					<button id="camera-down" onClick={this.props.xDown}><img src="assets/icon-svgs/down_arrow.svg" width="50px" height="50px" alt="Move camera or asset down" /></button>
				</div>
				<button id="camera-zoom-in" onClick={this.props.yDown}>+</button>
				<button id="camera-zoom-out" onClick={this.props.yUp}>-</button>
				<button id="camera-position-reset" onClick={this.props.resetPosition}>
					Reset
				</button>
			</div>
		);
	}
}
