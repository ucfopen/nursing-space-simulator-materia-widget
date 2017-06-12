import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";

import HUD from "./hud";
import VRScene from "./vr_scene";

import Joyride from "react-joyride";

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
			vrSceneFirstClick: true,

			joyrideOverlay: true,
			joyrideType: "continuous",
			isReady: true,
			isRunning: true,
			stepIndex: 0,
			steps: [
				{
					title: "Welcome to Hospital Sim",
					text: "Select 'Next' to continue or 'Skip' to close the tour.",
					selector: ".starter",
					position: "top"
				},
				{
					title: "Categories",
					text:
						"Here are the categories of medical equipment. There are three categories to choose from.",
					selector: "#asset-selection-menu",
					position: "top",
					allowClicksThruHole: "true"
				},
				{
					title: "Models",
					text:
						"Click/touch a model to select it and then hit 'Next' to continue.",
					selector: "#bed-1",
					position: "right",
					type: "click",
					allowClicksThruHole: "true"
				}
			]
		};
	}

	addSteps(steps, stage) {
		let newSteps = steps;

		if (!Array.isArray(newSteps)) {
			newSteps = [newSteps];
		}

		if (!newSteps.length) {
			return;
		}

		this.setState({
			steps: this.state.steps.concat(newSteps),
			currentStage: stage
		});
		this.joyride.start(true);
	}

	addTooltip(data) {
		this.joyride.addTooltip(data);
	}

	next() {
		this.joyride.next();
	}

	start() {
		this.joyride.getProgress();
	}

	handleClick(x, y) {
		if (this.state.vrSceneFirstClick && this.state.selectedAsset !== null) {
			this.setState(
				{
					vrSceneFirstClick: false,
					steps: this.state.steps.concat([
						{
							title: "Object Options",
							text:
								"After you select an object, you have the option to deselect, rotate and remove the object.",
							selector: "#UI-selected-asset-options",
							position: "right",
							type: "click"
						},
						{
							title: "VR Mode",
							text:
								"You can view the room from a more personal point of view by going into 'First-Person Viewer'.",
							selector: "#vr-viewer-mode",
							position: "top",
							type: "click"
						}
					]),
					stepIndex: 4
				},
				() => {
					this.next();
					this.joyride.start(true);
				}
			);
		}
		let grid = _.cloneDeep(this.state.grid);

		if (!this.state.selectedAsset || !this.state.thirdPerson) return;

		// Check if the user is entering first person mode
		if (this.state.selectedAsset.asset.id === "pov_camera") {
			this.setState({
				thirdPerson: false,
				position: { x: x, y: 1, z: y }
			});

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
				(grid[this.state.selectedAsset.x][this.state.selectedAsset.y].rotation +
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

		this.setState({
			selectedAsset: { asset: asset, x: x, y: y },
			manipulationMode: true
		});
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

		if (this.state.stepIndex !== nextState.stepIndex) return true;

		return false;
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
			<div className="starter">
				<Joyride
					ref={c => (this.joyride = c)}
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
					addSteps={this.addSteps.bind(this)}
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
					addSteps={this.addSteps.bind(this)}
				/>
			</div>
		);
	}
}
