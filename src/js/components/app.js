import React, { Component } from "react";
import { connect } from "react-redux";
import { initData } from "../actions";
import { startTourSection, endTour } from "../actions/tour_actions";
import applyTourSteps from "../tourHelper";

import HUD from "./hud";
import VRScene from "./vr_scene";

import Joyride from "react-joyride";

export class App extends Component {
	componentDidMount() {
		this.props.initData(this.props.qset);

		// need this since componentWillUpdate not called for initial render
		const {
			steps,
			nextSteps,
			stepSetInQueue,
			stepCompletion
		} = applyTourSteps(this.props, {
			runNextSet: true
		});
		this.joyride.setState({ index: 0 }, () =>
			setTimeout(this.joyride.start(true), 500)
		);
		this.props.startTourSection(
			steps,
			nextSteps,
			stepSetInQueue,
			stepCompletion
		);
	}

	componentWillUpdate(nextProps) {
		if (this.props.tourRunning) {
			const {
				steps,
				nextSteps,
				stepSetInQueue,
				stepCompletion
			} = applyTourSteps(this.props, nextProps);
			if (steps && nextSteps && stepSetInQueue && stepCompletion) {
				this.joyride.setState({ index: 0 }, () =>
					setTimeout(this.joyride.start(true), 500)
				);
				this.props.startTourSection(
					steps,
					nextSteps,
					stepSetInQueue,
					stepCompletion
				);
			}
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

function mapStateToProps({ tour, position }) {
	return {
		steps: tour.steps,
		nextSteps: tour.nextSteps,
		runNextSet: tour.runNextSet,
		stepSetInQueue: tour.stepSetInQueue,
		stepCompletion: tour.stepCompletion,
		tourRunning: tour.tourRunning,
		thirdPerson: position.thirdPerson
	};
}

export default connect(mapStateToProps, {
	initData,
	startTourSection,
	endTour
})(App);
