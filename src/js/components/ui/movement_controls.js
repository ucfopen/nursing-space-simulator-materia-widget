import React from "react";
import ReactDOM from "react-dom";
import ScreenshotSVG from "../assets/icon-svgs/screenshot";
import UpArrowSVG from "../assets/icon-svgs/up_arrow";
import DownArrowSVG from "../assets/icon-svgs/down_arrow";
import LeftArrowSVG from "../assets/icon-svgs/left_arrow";
import RightArrowSVG from "../assets/icon-svgs/right_arrow";
import ZoomInSVG from "../assets/icon-svgs/zoom_in";
import ZoomOutSVG from "../assets/icon-svgs/zoom_out";

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
					<ScreenshotSVG />
				</button>
				{this.props.thirdPerson
					? <div id="camera-controls">
							<div id="camera-move">
								<button id="camera-up" onClick={this.props.xUp}>
									<UpArrowSVG />
								</button>
								<div id="camera-move-horizontal">
									<button id="camera-left" onClick={this.props.zUp}>
										<LeftArrowSVG />
									</button>
									<button id="camera-right" onClick={this.props.zDown}>
										<RightArrowSVG />
									</button>
								</div>
								<button id="camera-down" onClick={this.props.xDown}>
									<DownArrowSVG />
								</button>
							</div>
							<button id="camera-zoom-in" onClick={this.props.yDown}>
								<ZoomInSVG />
							</button>
							<button id="camera-zoom-out" onClick={this.props.yUp}>
								<ZoomOutSVG />
							</button>
						</div>
					: null}
			</div>
		);
	}
}
