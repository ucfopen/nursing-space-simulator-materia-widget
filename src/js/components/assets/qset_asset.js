import React, { Component } from "react";
import AFRAME from "aframe";
import { Entity } from "aframe-react";

// Custom React Components
import Wall from "./wall";

import { checkPropsExist } from "../../../js/utils";
import registerClickDrag from "aframe-click-drag-component";
registerClickDrag(AFRAME);

export default class QsetAsset extends Component {
	constructor(props) {
		super(props);
		this.lastX = null;
		this.lastY = null;
	}

	dragStart(event) {
		this.props.onClick(true);
		this.lastX = this.lastY = null;
	}

	dragMove(event) {
		this.lastX = event.detail.nextPosition.x;
		this.lastZ = event.detail.nextPosition.z;
	}

	dragEnd(event) {
		const { isSelected, selectedAssetId, x, z } = this.props;
		const roundedX = Math.round(this.lastX);
		const roundedZ = Math.round(this.lastZ);
		if (roundedX && roundedZ &&!isNaN(roundedX) && !isNaN(roundedZ) && isSelected) {
			this.props.insertAsset(roundedX, roundedZ, selectedAssetId);
		}
		else {
			this.props.insertAsset(x, z, selectedAssetId);
		}
	}

	renderAsset() {
		const { attributes, data, isSelected, mode, rotation, thirdPerson, x, z } = this.props;
		const { onClick } = this.props;
		const id = data.id;

		return data.category === "construction" ? (
			<Wall
				attributes={attributes}
				isSelected={isSelected}
				mode={mode}
				onClick={() => onClick(false)}
				rotation={rotation}
				type={id}
				x={x}
				z={z}
			/>
		) : (
			<Entity
				click-drag
				events={{
					dragstart: this.dragStart.bind(this),
					dragmove: this.dragMove.bind(this),
					dragend: this.dragEnd.bind(this)
				}}
				material={{ color: "green", opacity: 0.4 }}
				obj-model={
					isSelected
						? `obj: #${id}-obj;`
						: `obj: #${id}-obj;mtl: #${id}-mtl;`
				}
				position={{ x, y: 0.1, z }}
				primitive={data.tag}
				rotation={{ x: 0, y: rotation, z: 0 }}
				scale={data.scale}
			/>
		);
	}

	renderAssetNonDrag() {
		const { attributes, data, isSelected, mode, rotation, thirdPerson, x, z } = this.props;
		const { onClick } = this.props;
		const id = data.id;
		const validClick = thirdPerson &&  mode != "editAsset";

		return data.category === "construction" ? (
			<Wall
				type={id}
				attributes={attributes}
				isSelected={isSelected}
				mode={mode}
				onClick={validClick ? () => onClick(false) : null}
				rotation={rotation}
				x={x}
				z={z}
			/>
		) : (
			<Entity
				events={{
					click: validClick ? () => onClick(false) : null
				}}
				material={{ color: "green", opacity: 0.4 }}
				obj-model={
					isSelected
						? `obj: #${id}-obj;`
						: `obj: #${id}-obj;mtl: #${id}-mtl;`
				}
				position={{ x, y: 0.1, z }}
				primitive={data.tag}
				rotation={{ x: 0, y: rotation, z: 0 }}
				scale={data.scale}
			/>
		);
	}

	render() {
		if (checkPropsExist(this.props)) {
			if (!this.props.thirdPerson || this.props.mode == "editAsset")
				return this.renderAssetNonDrag();
			return Namespace("HospitalSim").browserIsChrome
				? this.renderAsset()
				: this.renderAssetNonDrag();
		} else return null;
	}
}
