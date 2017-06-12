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
					Take a Screenshot
				</button>
				<div id="camera-move">
					<button id="camera-up" onClick={this.props.xUp}>&uarr;</button>
					<div id="camera-move-horizontal">
						<button id="camera-left" onClick={this.props.zUp}>&larr;</button>
						<button id="camera-right" onClick={this.props.zDown}>&rarr;</button>
					</div>
					<button id="camera-down" onClick={this.props.xDown}>&darr;</button>
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
