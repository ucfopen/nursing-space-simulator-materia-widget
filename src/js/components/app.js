import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash/fp/isEqual";

import React from "react";
import ReactDOM from "react-dom";

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
			lastX: null,
			lastY: null,
			selectedAsset: null,
			deleteMultipleMode: false,
			thirdPerson: true,
			vrSceneClicked: false,
			vrSceneHaveEnteredFirstPerson: false,
			tourFinished: false,

			joyrideOverlay: true,
			joyrideType: "continuous",
			isReady: true,
			isRunning: true,
			stepIndex: 0,
			steps: part1
		};
		this.initialWallRotations();
	}

	// make sure walls/assets on the edges are rotated inwards
	initialWallRotations() {
		let grid = this.state.grid;
		const height = grid.length;
		if (height <= 0) return;
		const width = grid[0].length;

		let rotation = 0;
		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				if (grid[i][j] == "0") continue;
				rotation = 0;

				if (i == 0) rotation = 0;
				else if (i == height - 1) rotation = 180;
				if (j == 0) rotation = 270;
				else if (j == width - 1) rotation = 90;

				grid[i][j].rotation = rotation;
			}
		}
		this.setState({
			grid: grid
		});
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
		let grid = cloneDeep(this.state.grid);

		if (!this.state.selectedAsset || !this.state.thirdPerson) {
			return;
		}

		// Check if the user is entering first person mode
		if (this.state.selectedAsset.asset.id === "pov_camera") {
			if (
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
			} else {
				this.setState({
					thirdPerson: false,
					position: { x: x, y: 1, z: y }
				});
			}
			return;
		}

		grid[x][y] = {
			id: this.state.selectedAsset.asset.id,
			rotation: this.state.selectedAsset.asset.rotation.y
		};

		if (this.state.selectedAsset.asset.category !== "walls") {
			if (
				this.state.manipulationMode &&
				this.state.selectedAsset.x > -1 &&
				this.state.selectedAsset.y > -1
			) {
				grid[x][y].rotation =
					grid[this.state.selectedAsset.x][
						this.state.selectedAsset.y
					].rotation;
				grid[this.state.selectedAsset.x][this.state.selectedAsset.y] =
					"0";
			}
		}

		this.selectAsset(this.state.selectedAsset.asset, x, y);

		this.setState({
			grid: grid
		});
	}

	setDeleteMode() {
		this.setState({
			deleteMultipleMode: true
		});
	}

	deleteMultipleAssets(x, y) {
		if (this.state.lastX == null && this.state.lastY == null) {
			return this.setState({
				lastX: x,
				lastY: y
			});
		}
		let grid = cloneDeep(this.state.grid);
		let positions = {
			xOne: this.state.lastX,
			yOne: this.state.lastY,
			xTwo: x,
			yTwo: y
		};
		if (positions.yOne != null) {
			positions.xTwo = x;
			positions.yTwo = y;
			var tiles =
				(positions.xTwo - positions.xOne) *
				(positions.yTwo - positions.yOne);
			tiles = Math.abs(tiles);
			var counter = positions.xOne;
			var innerCounter = positions.yOne;

			for (counter; counter <= positions.xTwo; counter++) {
				grid[counter][positions.yOne] = "0";
				for (
					innerCounter;
					innerCounter <= positions.yTwo;
					innerCounter++
				) {
					grid[counter][innerCounter] = "0";
				}
				innerCounter = positions.yOne;
			}
			this.setState({
				deleteMultipleMode: false,
				lastX: null,
				lastY: null,
				grid: grid
			});
			return;
		}
		return;
	}

	manipulateAsset(asset, action, x, y) {
		let grid = cloneDeep(this.state.grid);
		if (action === "select") {
			// Check if the user is replacing an asset
			if (
				this.state.selectedAsset &&
				this.state.selectedAsset.asset.id !== "pov_camera" &&
				this.state.selectedAsset.asset.id !==
					this.state.grid[x][y].id &&
				this.state.selectedAsset.asset.canReplace.includes(
					asset.category
				)
			) {
				grid[x][y] = {
					id: this.state.selectedAsset.asset.id,
					rotation: grid[x][y].rotation
				};

				this.selectAsset(this.state.selectedAsset.asset, x, y, () =>
					this.setState({
						grid: grid
					})
				);
			} else {
				this.selectAsset(asset, x, y);
			}
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

			grid[this.state.selectedAsset.x][
				this.state.selectedAsset.y
			].rotation =
				(grid[this.state.selectedAsset.x][this.state.selectedAsset.y]
					.rotation -
					90) %
				360;

			this.setState({
				grid: grid
			});
		}
	}

	selectAsset(asset, x, y, cb) {
		if (!asset) return;

		if (x === null) x = -1;
		if (y === null) y = -1;

		let runSteps = false;
		let stepsToAdd;

		if (x === -1 && this.state.tourFinished === false) {
			if (
				asset.id !== "pov_camera" &&
				this.state.vrSceneClicked === false
			) {
				runSteps = true;
				stepsToAdd = clickInScene;
			}
			if (
				asset.id === "pov_camera" &&
				this.state.vrSceneHaveEnteredFirstPerson === false
			) {
				runSteps = true;
				stepsToAdd = clickFirstPersonViewer;
			}
		}

		if (runSteps) {
			this.setState(
				{
					selectedAsset: { asset: asset, x: x, y: y },
					manipulationMode:
						asset.id === "pov_camera" || (x > -1 && y > -1)
							? true
							: false,
					steps: stepsToAdd,
					stepIndex: 0
				},
				() => {
					typeof cb === "function" ? cb() : {};
					this.applyNewSteps();
				}
			);
		} else {
			this.setState(
				{
					selectedAsset: { asset: asset, x: x, y: y },
					manipulationMode:
						asset.id === "pov_camera" || (x > -1 && y > -1)
							? true
							: false
				},
				() => (typeof cb === "function" ? cb() : {})
			);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (!isEqual(this.state.grid, nextState.grid)) {
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

		if (!isEqual(this.state.selectedAsset, nextState.selectedAsset)) {
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
			this.state.selectedAsset.x > -1 &&
			this.state.selectedAsset.y > -1 &&
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

		const grid = cloneDeep(this.state.grid);

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
				// When in first person, app container style must be modified to absolute position to support built in aframe UI
				style={this.state.thirdPerson ? {} : { position: "absolute" }}
			>
				<Joyride
					ref={c => (this.joyride = c)}
					callback={this.joyrideCallback.bind(this)}
					debug={false}
					showSkipButton={true}
					showStepsProgress={false}
					stepIndex={stepIndex}
					steps={steps}
					type={joyrideType}
					run={isRunning}
					disableOverlay={false}
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
					deleteMultipleAssets={this.deleteMultipleAssets.bind(this)}
					deleteMultipleMode={this.state.deleteMultipleMode}
					grid={this.state.grid}
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
					setDeleteMode={this.setDeleteMode.bind(this)}
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
