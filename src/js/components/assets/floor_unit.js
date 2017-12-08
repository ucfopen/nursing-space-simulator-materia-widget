import React, { Component } from "react";
import AFRAME from "aframe";
import { Entity } from "aframe-react";
import { isCellAvailable } from "../../grid";

export default class FloorUnit extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	onMouseEnter() {
		const active = this.props.thirdPerson ? true : false;
		this.setState({ active });
	}

	onMouseLeave() {
		this.setState({ active: false });
	}

	handleClick() {
		if (!this.props.thirdPerson)
			return;

		if (this.props.extendWallMode)
			this.props.onClick(
				this.props.x,
				this.props.z,
				this.props.selectedAssetId,
				this.props.extendX,
				this.props.extendZ,
				this.props.validX,
				this.props.validZ
			);
		else
			this.props.onClick(this.props.x, this.props.z, this.props.selectedAssetId);
	}

	isValidPlace() {
		return isCellAvailable(this.props.grid, this.props.x, this.props.z);
	}

	highlightExtend() {
		if (this.props.x == this.props.extendX)
			return (this.props.validZ.includes(this.props.z))
		if (this.props.z == this.props.extendZ)
			return (this.props.validX.includes(this.props.x))
	}

	render() {
		if (this.props.extendWallMode)
			return (
				<Entity
					primitive="a-plane"
					material={{
						color: this.highlightExtend() ? "green" : "red",
						opacity: this.state.active ? 0.7 : 0.4
					}}
					position={{ x: this.props.x, y: "0.25", z: this.props.z }}
					rotation={{ x: "-90", y: "0", z: "0" }}
					scale={{ x: "1", y: "1", z: "1" }}
					events={{
						click: this.handleClick.bind(this),
						mouseenter: this.onMouseEnter.bind(this),
						mouseleave: this.onMouseLeave.bind(this)
					}}
					height="1"
					width="1"
				/>
			);
		else
			return (
				<Entity
					primitive="a-plane"
					material={this.state.active && this.props.selectedAssetId ?
						(this.isValidPlace()
							? "color: green; opacity: 0.5;"
							: "color: red; opacity: 0.5;"
						) : "opacity: 0"}
					position={{ x: this.props.x, y: "0.25", z: this.props.z }}
					rotation={{ x: "-90", y: "0", z: "0" }}
					scale={{ x: "1", y: "1", z: "1" }}
					events={{
						click: this.handleClick.bind(this),
						mouseenter: this.onMouseEnter.bind(this),
						mouseleave: this.onMouseLeave.bind(this)
					}}
					height="1"
					width="1"
				/>
			);
	}
}
