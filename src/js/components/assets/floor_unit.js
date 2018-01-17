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
			extendX,
			extendZ,
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

		if (mode == "extendWall") onClick(x, z, extendX, extendZ, validX, validZ);
		else if (selectedAssetId) onClick(x, z, selectedAssetId);
	}

	isValidPlace() {
		const { grid, x, z } = this.props;
		return isCellAvailable(grid, x, z);
	}

	highlightExtend() {
		const { extendX, extendZ, validX, validZ, x, z } = this.props;
		if (x == extendX) return validZ.includes(z);
		if (z == extendZ) return validX.includes(x);
	}

	render() {
		const { mode, selectedAssetId, x, z } = this.props;
		if (mode == "extendWall")
			return (
				<Entity
					events={{
						click: this.handleClick.bind(this),
						mouseenter: this.onMouseEnter.bind(this),
						mouseleave: this.onMouseLeave.bind(this)
					}}
					height="1"
					material={{
						color: this.highlightExtend() ? "green" : "#ff7777",
						opacity: this.state.active ? 0.7 : 0.4
					}}
					position={{ x, y: "0.25", z }}
					primitive="a-plane"
					rotation={{ x: "-90", y: "0", z: "0" }}
					scale={{ x: "1", y: "1", z: "1" }}
					width="1"
				/>
			);
		else
			return (
				<Entity
					events={{
						click: this.handleClick.bind(this),
						mouseenter: this.onMouseEnter.bind(this),
						mouseleave: this.onMouseLeave.bind(this)
					}}
					height="1"
					material={
						this.state.active && selectedAssetId
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
			);
	}
}
