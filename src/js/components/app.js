import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";

import HUD from "./hud";
import VRScene from "./vr_scene";

import Joyride from "react-joyride";
import { part1, part2, clickCameraInScene, clickInScene } from "../steps";

/**
 * App holds the state of the entire simulation. Calls the HUD and the VR Scene
 * 
 * @param map array Holds the 2D representation of the grid that represents the simulation's map
 */
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: this.props.map,
			hoveredAsset: null,
			manipulationMode: false,
			placementMode: false,
			position: { x: 2.5, y: 18, z: 14 }, //TODO: make these variable dynamic based on map from qset
			selectedAsset: null,
			thirdPerson: true,
			vrSceneClicked: false,
			vrSceneHaveEnteredFirstPerson: false,
			tourFinished: false,

			joyrideOverlay: true,
			joyrideType: "continuous",
			isReady: true,
			isRunning: true,
			stepIndex: 0,
			steps: [].concat(part1)
		};
	}

	componentDidMount() {
		this.joyride.start(true);
	}

	applyNewSteps() {
		this.joyride.setState({ index: 0 }, () =>
			setTimeout(this.joyride.start(true), 500)
		);
	}

	joyrideCallback(data) {
		if (data.action === "skip") this.setState({ tourFinished: true });
	}

	handleClick(x, y) {
		if (
			this.state.vrSceneClicked === false &&
			this.state.selectedAsset !== null &&
			this.state.selectedAsset.asset.id !== "pov_camera" &&
			this.state.tourFinished === false
		) {
			this.setState(
				{
					vrSceneClicked: true,
					steps: part2,
					stepIndex: 0
				},
				this.applyNewSteps.bind(this)
			);
		}
		let grid = _.cloneDeep(this.state.grid);

		if (!this.state.selectedAsset || !this.state.thirdPerson) return;

		// Check if the user is entering first person mode
		if (
			this.state.selectedAsset.asset.id === "pov_camera" &&
			this.state.vrSceneHaveEnteredFirstPerson === false &&
			this.state.tourFinished === false
		) {
			this.setState(
				{
					thirdPerson: false,
					position: { x: x, y: 1, z: y },
					stepIndex: 0,
					steps: clickCameraInScene,
					vrSceneHaveEnteredFirstPerson: true
				},
				this.applyNewSteps.bind(this)
			);
			return;
		}

		grid[x][y] = {
			id: this.state.selectedAsset.asset.id,
			rotation: 0
		};

		if (this.state.selectedAsset.asset.category !== "walls") {
			if (
				this.state.manipulationMode &&
				this.state.selectedAsset.x > -1 &&
				this.state.selectedAsset.y > -1
			) {
				grid[x][y].rotation =
					grid[this.state.selectedAsset.x][this.state.selectedAsset.y].rotation;
				grid[this.state.selectedAsset.x][this.state.selectedAsset.y] = "0";
			}
		}

		this.selectAsset(this.state.selectedAsset.asset, x, y);

		this.setState({
			grid: grid
		});
	}

	// Tracks current assets being hovered over
	mouseEnterAsset(asset) {
		const hoveredAsset = this.state.hoveredAsset;
		this.setState({ hoveredAsset: asset });
	}

	mouseExitAsset() {
		const hoveredAsset = this.state.hoveredAsset;

		this.setState({ hoveredAsset: null });
	}

	manipulateAsset(asset, action, x, y) {
		let grid = _.cloneDeep(this.state.grid);

		// First check if the user is replacing
		if (
			this.state.hoveredAsset !== null &&
			this.state.selectedAsset !== null &&
			this.state.selectedAsset.asset.canReplace.includes(
				this.state.hoveredAsset.category
			)
		) {
			// Removes old asset if moving an already exsisting asset
			if (this.state.selectedAsset.asset.category !== "walls") {
				if (
					this.state.selectedAsset.x > -1 &&
					this.state.selectedAsset.x > -1
				) {
					grid[this.state.selectedAsset.x][this.state.selectedAsset.y] = "0";
				}
			}

			grid[x][y] = {
				id: this.state.selectedAsset.asset.id,
				rotation: grid[x][y].rotation
			};

			this.selectAsset(this.state.selectedAsset.asset, x, y);

			this.setState({
				grid: grid
			});

			return;
		}

		if (action === "select") {
			this.selectAsset(asset, x, y);
		}

		if (action === "deselect") {
			this.setState({
				manipulationMode: false,
				selectedAsset: null
			});
		}

		if (action === "remove") {
			if (x < 0 || y < 0) return;

			grid[this.state.selectedAsset.x][this.state.selectedAsset.y] = "0";

			this.setState({
				grid: grid,
				manipulationMode: false,
				selectedAsset: null
			});
		}

		if (action === "rotate") {
			if (x < 0 || y < 0) return;

			grid[this.state.selectedAsset.x][this.state.selectedAsset.y].rotation =
				(grid[this.state.selectedAsset.x][this.state.selectedAsset.y].rotation -
					90) %
				360;

			this.setState({
				grid: grid
			});
		}
	}

	selectAsset(asset, x, y) {
		if (!asset) return;

		if (x === null) x = -1;
		if (y === null) y = -1;

		if (
			x === -1 &&
			asset.id !== "pov_camera" &&
			this.state.vrSceneClicked === false &&
			this.state.tourFinished === false
		) {
			this.setState(
				{
					selectedAsset: { asset: asset, x: x, y: y },
					manipulationMode: true,
					steps: clickInScene,
					stepIndex: 0
				},
				this.applyNewSteps.bind(this)
			);
		} else {
			this.setState({
				selectedAsset: { asset: asset, x: x, y: y },
				manipulationMode: true
			});
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!_.isEqual(this.state.grid, nextState.grid)) {
			return true;
		}

		if (this.state.position !== nextState.position) {
			return true;
		}

		if (this.state.manipulationMode !== nextState.manipulationMode) {
			return true;
		}

		if (this.state.thirdPerson !== nextState.thirdPerson) {
			return true;
		}

		if (this.state.selectedAsset !== nextState.selectedAsset) {
			return true;
		}
		return true;
	}

	toggleCamera() {
		const thirdPerson = this.state.thirdPerson;
		this.setState({
			position: { x: 2.5, y: 18, z: 14 },
			thirdPerson: !this.state.thirdPerson
		});
	}

	updatePosition(direction, distance, reset) {
		let position = Object.assign({}, this.state.position);

		if (reset) {
			position = { x: 2.5, y: 18, z: 14 };
		} else if (
			this.state.selectedAsset !== null &&
			direction !== "y" &&
			this.state.selectedAsset.asset.id !== "pov_camera"
		) {
			this.updateSelectedAssetPosition(direction, distance);
			return;
		} else {
			position[direction] += distance;
		}

		this.setState({ position: position });
	}

	updateSelectedAssetPosition(direction, distance) {
		if (!this.state.thirdPerson || !this.state.selectedAsset.asset) return;

		const x_distance = direction === "x" ? distance : 0;
		const y_distance = direction === "z" ? distance : 0;
		const old_x = this.state.selectedAsset.x;
		const old_y = this.state.selectedAsset.y;
		const asset = this.state.selectedAsset.asset;

		const grid = _.cloneDeep(this.state.grid);

		// is the tile open?
		if (grid[old_x + x_distance][old_y + y_distance] == "0") {
			grid[old_x + x_distance][old_y + y_distance] = {
				id: asset.id,
				rotation: grid[old_x][old_y].rotation
			};

			grid[old_x][old_y] = "0";

			this.setState({
				grid: grid,
				selectedAsset: {
					asset: asset,
					x: old_x + x_distance,
					y: old_y + y_distance
				}
			});
		}
	}

	render() {
		const {
			isReady,
			isRunning,
			joyrideOverlay,
			joyrideType,
			stepIndex,
			steps
		} = this.state;

		return (
			<div
				id="app"
				// Needed for joyride step
				className="app-container"
				// When in first person, app container style must be modified to absolute position to support built in aframe UI
				style={this.state.thirdPerson ? {} : { position: "absolute" }}>
				<Joyride
					ref={c => (this.joyride = c)}
					callback={this.joyrideCallback.bind(this)}
					debug={false}
					showSkipButton={true}
					showStepsProgress={true}
					stepIndex={stepIndex}
					steps={steps}
					type={joyrideType}
					run={isRunning}
					disableOverlay={true}
					locale={{
						back: <span>Back</span>,
						close: <span>Close</span>,
						last: <span>Ok</span>,
						next: <span>Next</span>,
						skip: <span>Skip</span>
					}}
				/>
				<VRScene
					assetsFromFile={this.props.assetsFromFile}
					manipulateAsset={this.manipulateAsset.bind(this)}
					grid={this.state.grid}
					mouseEnterAsset={this.mouseEnterAsset.bind(this)}
					mouseExitAsset={this.mouseExitAsset.bind(this)}
					thirdPerson={this.state.thirdPerson}
					position={this.state.position}
					onClick={this.handleClick.bind(this)}
					selectedAsset={this.state.selectedAsset}
				/>
				<HUD
					manipulateAsset={this.manipulateAsset.bind(this)}
					manipulationMode={this.state.manipulationMode}
					categories={this.props.categories}
					assetsFromFile={this.props.assetsFromFile}
					selectAsset={this.selectAsset.bind(this)}
					selectedAsset={this.state.selectedAsset}
					xUp={this.updatePosition.bind(this, "x", 1, false)}
					xDown={this.updatePosition.bind(this, "x", -1, false)}
					yUp={this.updatePosition.bind(this, "y", 1, false)}
					yDown={this.updatePosition.bind(this, "y", -1, false)}
					zUp={this.updatePosition.bind(this, "z", -1, false)}
					zDown={this.updatePosition.bind(this, "z", 1, false)}
					resetPosition={this.updatePosition.bind(this, "y", 0, true)}
					thirdPerson={this.state.thirdPerson}
					toggleCamera={this.toggleCamera.bind(this)}
				/>
			</div>
		);
	}
}
