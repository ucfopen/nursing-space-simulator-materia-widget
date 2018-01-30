import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";

// Custom React Components
import { isCellAvailable, getCellRotation } from "../../grid";

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
			selectedAssetId,
			thirdPerson,
			validX,
			validZ,
			x,
			z
		} = this.props;
		const { onClick } = this.props;

		if (!thirdPerson || mode == "editAsset") return;

		if (mode == "extendWall") onClick(x, z, currentX, currentZ, validX, validZ);
		else if (selectedAssetId) onClick(x, z, selectedAssetId);
	}

	isValidPlace() {
		const { grid, selectedAssetId, x, z } = this.props;
		if (selectedAssetId && ["bed-1"].includes(selectedAssetId)) {
			const { currentX, currentZ } = this.props;
			const rotation = (
				currentX && currentZ
					? getCellRotation(grid, currentX, currentZ)
					: 180
			);
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
		const { currentX, currentZ, grid } = this.props;
		const rotation = (
			currentX && currentZ
				? getCellRotation(grid, currentX, currentZ)
				: 180
		);
		const adjSide = 3 - ((rotation + 180) % 360) / 90;
		return {
			x: adjSide % 2 == 0 ? x : (x + 2 - adjSide),
			y: y,
			z: adjSide % 2 == 0 ? (z + adjSide - 1) : z
		}
	}

	render() {
		const { mode, selectedAssetId, x, z } = this.props;

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
							? ({
								color: this.highlightExtend() ? "green" : "#ff7777",
								opacity: this.state.active ? 0.7 : 0.4
							})
							: (
								this.state.active && selectedAssetId
									? this.isValidPlace()
										? "color: green; opacity: 0.5;"
										: "color: red; opacity: 0.5;"
									: "opacity: 0"
							)
					}
					position={{ x, y: "0.25", z }}
					primitive="a-plane"
					rotation={{ x: "-90", y: "0", z: "0" }}
					scale={{ x: "1", y: "1", z: "1" }}
					width="1"
				/>
				{this.state.active && selectedAssetId && ["bed-1"].includes(selectedAssetId)
					? (
						<Entity
							height="1"
							material={
								this.isValidPlace()
									? "color: green; opacity: 0.5;"
									: "color: red; opacity: 0.5;"
							}
							position={ this.nextBedPosition(x, 0.25, z) }
							primitive="a-plane"
							rotation={{ x: "-90", y: "0", z: "0" }}
							scale={{ x: "1", y: "1", z: "1" }}
							width="1"
						/>
					)
					: null
				}
			</Entity>
		);
	}
}
