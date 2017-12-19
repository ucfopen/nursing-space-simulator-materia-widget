import React, { Component } from "react";
import ReactDOM from "react-dom";
import ScreenshotSVG from "../assets/icon-svgs/screenshot";
import UpArrowSVG from "../assets/icon-svgs/up_arrow";
import DownArrowSVG from "../assets/icon-svgs/down_arrow";
import LeftArrowSVG from "../assets/icon-svgs/left_arrow";
import RightArrowSVG from "../assets/icon-svgs/right_arrow";
import ZoomInSVG from "../assets/icon-svgs/zoom_in";
import ZoomOutSVG from "../assets/icon-svgs/zoom_out";

export default class MovementControls extends Component {
	takeScreenShot() {
		document
			.querySelector("a-scene")
			.components.screenshot.capture("perspective");
	}

	render() {
		return (
			<div id="UI-right-panel">
				<div id="top-buttons" />
				<button onClick={this.takeScreenShot.bind(this)} id="screenshot">
					<ScreenshotSVG />
				</button>
				{this.props.thirdPerson ? (
					<div id="camera-controls">
						<div id="camera-move">
							<button
								id="camera-up"
								onMouseDown={this.props.update.bind(this, "zUp")}>
								<UpArrowSVG />
							</button>
							<div id="camera-move-horizontal">
								<button
									id="camera-left"
									onMouseDown={this.props.update.bind(this, "xLeft")}>
									<LeftArrowSVG />
								</button>
								<button
									id="camera-right"
									onMouseDown={this.props.update.bind(this, "xRight")}>
									<RightArrowSVG />
								</button>
							</div>
							<button
								id="camera-down"
								onMouseDown={this.props.update.bind(this, "zDown")}>
								<DownArrowSVG />
							</button>
						</div>
						<button
							id="camera-zoom-in"
							onMouseDown={this.props.updateCameraPosition.bind(this, "yDown")}>
							<ZoomInSVG />
						</button>
						<button
							id="camera-zoom-out"
							onClick={this.props.updateCameraPosition.bind(this, "yUp")}>
							<ZoomOutSVG />
						</button>
					</div>
				) : null}
			</div>
		);
	}
}
