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
	render() {
		return (
			<div id="UI-right-panel">
				<div id="top-buttons" />
				<button id="screenshot">
					<ScreenshotSVG />
				</button>
				{this.props.thirdPerson
					? <div id="camera-controls">
							<div id="camera-move">
								<button
									id="camera-up"
									onClick={this.props.update.bind(this, "xUp")}>
									<UpArrowSVG />
								</button>
								<div id="camera-move-horizontal">
									<button
										id="camera-left"
										onClick={this.props.update.bind(this, "zUp")}>
										<LeftArrowSVG />
									</button>
									<button
										id="camera-right"
										onClick={this.props.update.bind(this, "zDown")}>
										<RightArrowSVG />
									</button>
								</div>
								<button
									id="camera-down"
									onClick={this.props.update.bind(this, "xDown")}>
									<DownArrowSVG />
								</button>
							</div>
							<button
								id="camera-zoom-in"
								onClick={this.props.updateCameraPosition.bind(this, "yDown")}>
								<ZoomInSVG />
							</button>
							<button
								id="camera-zoom-out"
								onClick={this.props.updateCameraPosition.bind(this, "yUp")}>
								<ZoomOutSVG />
							</button>
						</div>
					: null}
			</div>
		);
	}
}
