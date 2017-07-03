import React, { Component } from "react";
import { connect } from "react-redux";
import { initData } from "../actions";
import { startTourSection } from "../actions/tour_actions";
import applyTourSteps from "../tourHelper";

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
		const { steps, nextSteps, stepSetInQueue, stepCompletion } = applyTourSteps(
			this.props,
			nextProps
		);
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

	render() {
		return (
			<div>
				<Joyride
					ref={c => (this.joyride = c)}
					callback={() => {}}
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
		steps: tour.steps,
		nextSteps: tour.nextSteps,
		runNextSet: tour.runNextSet,
		stepSetInQueue: tour.stepSetInQueue,
		stepCompletion: tour.stepCompletion,
		tourRunning: tour.tourRunning
	};
}

export default connect(mapStateToProps, { initData, startTourSection })(App);
