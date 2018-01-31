import React, { Component } from "react";
import ReactDOM from "react-dom";

// Custom Reaction Components
import DownArrowSVG from "../assets/icon-svgs/down_arrow";
import LeftArrowSVG from "../assets/icon-svgs/left_arrow";
import RightArrowSVG from "../assets/icon-svgs/right_arrow";
import ScreenshotSVG from "../assets/icon-svgs/screenshot";
import UpArrowSVG from "../assets/icon-svgs/up_arrow";

export default class AssetMovementControls extends Component {
	constructor(props) {
		super(props);
	}
    
	render() {
		const { thirdPerson, update, mode, currentX, currentY } = this.props;
		return (
			<div id="UI-asset-movement-panel" style={{ left: currentX + "px", top: currentY + "px" }}>
					<div id="camera-controls">
						<div id="camera-move">
							<button id="camera-up" onMouseDown={update.bind(this, "zUp")}>
								<UpArrowSVG />
							</button>
							<div id="camera-move-horizontal">
								<button
									id="camera-left"
									onMouseDown={update.bind(this, "xLeft")}>
									<LeftArrowSVG />
								</button>
								
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
					</div>
			</div>
		);
	}
}
