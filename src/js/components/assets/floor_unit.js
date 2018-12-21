import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

// Custom React Components
import { isCellAvailable } from "../../grid";

export default class FloorUnit extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	onMouseEnter() {
		const { mode, thirdPerson } = this.props;
		const active = thirdPerson && mode != "editAsset";
		this.setState({ active });
	}

	onMouseLeave() {
		this.setState({ active: false });
	}

	handleClick() {
		const {
			currentX,
			currentZ,
			mode,
			multipleX,
			multipleZ,
			deleteMode,
			selectedAsset,
			thirdPerson,
			validX,
			validZ,
			x,
			z
		} = this.props;
		const { onClick } = this.props;

		if (mode == "selectMultiple") {
			var arrayLength = multipleX.length;
			if (arrayLength > 0) {
				for (var i = 0; i < arrayLength; i++) {
					onClick(multipleX[i], multipleZ[i], window.mouseCoords);
				}
			} else {
				onClick(x, z, window.mouseCoords);
			}
			return;
		}

		if (mode == "deleteMultiple") {
			onClick(x, z, window.mouseCoords);
			return;
		}

		if (!thirdPerson || mode == "editAsset") return;

		if (mode == "extendWall")
			onClick(x, z, currentX, currentZ, validX, validZ);
		else if (selectedAsset) onClick(x, z, selectedAsset.id);
	}

	isValidPlace() {
		const { grid, selectedAsset, x, z } = this.props;
		if (selectedAsset && selectedAsset.spanX == 2) {
			const { currentX, currentZ, selectedItem } = this.props;
			const rotation = selectedItem ? selectedItem.rotation : 180;
			const adjSide = 3 - ((rotation + 180) % 360) / 90;
			return isCellAvailable(grid, x, z, adjSide);
		}
		return isCellAvailable(grid, x, z);
	}

	highlightExtend() {
		const { currentX, currentZ, validX, validZ, x, z } = this.props;
		if (x == currentX) return validZ.includes(z);
		if (z == currentZ) return validX.includes(x);
	}

	nextBedPosition(x, y, z) {
		const { currentX, currentZ, grid, selectedItem } = this.props;
		const rotation = selectedItem ? selectedItem.rotation : 180;
		const adjSide = 3 - ((rotation + 180) % 360) / 90;
		return {
			x: adjSide % 2 == 0 ? x : x + 2 - adjSide,
			y: y,
			z: adjSide % 2 == 0 ? z + adjSide - 1 : z
		};
	}

	render() {
		const {
			mode,
			selectedAsset,
			selectedAssets,
			validX,
			validZ,
			x,
			z
		} = this.props;

		return (
			<Entity>
				<Entity
					events={{
						mouseup: this.handleClick.bind(this),
						mouseenter: this.onMouseEnter.bind(this),
						mouseleave: this.onMouseLeave.bind(this)
					}}
					height="1"
					material={
						mode == "extendWall"
							? {
									color: this.highlightExtend()
										? "green"
										: "#ff7777",
									opacity: this.state.active ? 0.7 : 0.4
								}
							: this.state.active && selectedAsset
								? this.isValidPlace()
									? "color: green; opacity: 0.5;"
									: "color: red; opacity: 0.5;"
								: "opacity: 0"
					}
					position={{ x, y: "0.25", z }}
					primitive="a-plane"
					rotation={{ x: "-90", y: "0", z: "0" }}
					scale={{ x: "1", y: "1", z: "1" }}
					width="1"
				/>
				{this.state.active &&
				selectedAsset &&
				selectedAsset.spanX == 2 ? (
					<Entity
						height="1"
						material={
							this.isValidPlace()
								? "color: green; opacity: 0.5;"
								: "color: red; opacity: 0.5;"
						}
						position={this.nextBedPosition(x, 0.25, z)}
						primitive="a-plane"
						rotation={{ x: "-90", y: "0", z: "0" }}
						scale={{ x: "1", y: "1", z: "1" }}
						width="1"
					/>
				) : null}
			</Entity>
		);
	}
}
