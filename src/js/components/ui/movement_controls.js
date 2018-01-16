import React, { Component } from "react";
import ReactDOM from "react-dom";

// Custom Reaction Components
import DownArrowSVG from "../assets/icon-svgs/down_arrow";
import LeftArrowSVG from "../assets/icon-svgs/left_arrow";
import ResetCamera from "../assets/icon-svgs/reset_camera";
import RightArrowSVG from "../assets/icon-svgs/right_arrow";
import ScreenshotSVG from "../assets/icon-svgs/screenshot";
import UpArrowSVG from "../assets/icon-svgs/up_arrow";
import ZoomInSVG from "../assets/icon-svgs/zoom_in";
import ZoomOutSVG from "../assets/icon-svgs/zoom_out";

export default class MovementControls extends Component {
	constructor(props) {
		super(props);
		this.zoomIn = props.updateCameraPosition.bind(this, "yDown");
		this.zoomOut = props.updateCameraPosition.bind(this, "yUp");
	}

	takeScreenShot() {
		document
			.querySelector("a-scene")
			.components.screenshot.capture("perspective");
	}

	render() {
		const { thirdPerson, update, mode } = this.props;
		return (
			<div id="UI-right-panel">
				<div id="top-buttons" />
				<button id="screenshot" onClick={this.takeScreenShot.bind(this)}>
					<ScreenshotSVG />
				</button>
				{thirdPerson ? (
					<div id="camera-controls">
						<div id="camera-move" className={mode == "manipulation" ? "manipulation" : null}>
							<button id="camera-up" onMouseDown={update.bind(this, "zUp")}>
								<UpArrowSVG />
							</button>
							<div id="camera-move-horizontal">
								<button
									id="camera-left"
									onMouseDown={update.bind(this, "xLeft")}>
									<LeftArrowSVG />
								</button>
								{mode != "manipulation"
									? (
										<button
											id="camera-reset"
											onMouseDown={update.bind(this, "reset")}>
											<ResetCamera />
										</button>
									)
									: null
								}
								<button
									id="camera-right"
									onMouseDown={update.bind(this, "xRight")}>
									<RightArrowSVG />
								</button>
							</div>
							<button id="camera-down" onMouseDown={update.bind(this, "zDown")}>
								<DownArrowSVG />
							</button>
						</div>
						<button id="camera-zoom-in" onMouseDown={this.zoomIn}>
							<ZoomInSVG />
						</button>
						<button id="camera-zoom-out" onClick={this.zoomOut}>
							<ZoomOutSVG />
						</button>
					</div>
				) : null}
			</div>
		);
	}
}
