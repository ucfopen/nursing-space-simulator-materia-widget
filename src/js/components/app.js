import React, { Component } from "react";
import { connect } from "react-redux";
import { initData } from "../actions";
import { startTourSection, endTour } from "../actions/tour_actions";

import HUD from "./hud";
import VRScene from "./vr_scene";

import Joyride from "react-joyride";

export class App extends Component {
	componentDidMount() {
		this.props.initData(this.props.qset);
	}

	componentWillUpdate(nextProps) {
		if (nextProps.runNextSet === true && this.props.tourRunning) {
			this.joyride.setState({ index: 0 }, () =>
				setTimeout(this.joyride.start(true), 500)
			);
			this.props.startTourSection();
		}
	}

	joyrideCallback(data) {
		if (data.type === "finished") this.props.endTour();
	}

	render() {
		return (
			<div
				id="app"
				// When in first person, app container style must be modified to absolute position to support built in aframe UI
				style={this.props.thirdPerson ? {} : { position: "absolute" }}>
				<Joyride
					ref={c => (this.joyride = c)}
					callback={this.joyrideCallback.bind(this)}
					steps={this.props.currentSteps}
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

function mapStateToProps({ tour, position }) {
	return {
		currentSteps: tour.currentSteps,
		runNextSet: tour.runNextSet,
		tourRunning: tour.tourRunning,
		thirdPerson: position.thirdPerson
	};
}

export default connect(mapStateToProps, {
	initData,
	startTourSection,
	endTour
})(App);
