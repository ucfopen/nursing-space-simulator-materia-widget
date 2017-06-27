import React, { Component } from "react";
import { connect } from "react-redux";
import { initData } from "../actions";
import { startTourSection } from "../actions/tour_actions";

import HUD from "./hud";
import VRScene from "./vr_scene";

import Joyride from "react-joyride";
import {
	part1,
	part2,
	clickCameraInScene,
	clickInScene,
	clickFirstPersonViewer
} from "../steps";

class App extends Component {
	componentDidMount() {
		this.props.initData(this.props.qset);
		this.props.startTourSection(this.joyride, part1);
	}

	render() {
		return (
			<div>
				<Joyride
					ref={c => (this.joyride = c)}
					callback={() => console.log(this.joyride)}
					steps={this.props.steps}
					debug={false}
					showSkipButton={true}
					showStepsProgress={false}
					stepIndex={0}
					run={false}
					type={"continuous"}
					disableOverlay={false}
					locale={{
						back: <span>Back</span>,
						close: <span>Close</span>,
						last: <span>Ok</span>,
						next: <span>Next</span>,
						skip: <span>Skip</span>
					}}
				/>
				<VRScene />
				<HUD />
			</div>
		);
	}
}

function mapStateToProps({ tour }) {
	return {
		running: tour.running,
		steps: tour.steps
	};
}

export default connect(mapStateToProps, { initData, startTourSection })(App);
