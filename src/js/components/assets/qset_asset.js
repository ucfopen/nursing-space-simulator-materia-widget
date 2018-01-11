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
		this.props.onClick();
	}

	dragMove(event) {
		this.lastX = event.detail.nextPosition.x;
		this.lastZ = event.detail.nextPosition.z;
	}

	dragEnd(event) {
		const roundedX = Math.round(this.lastX);
		const roundedZ = Math.round(this.lastZ);
		const { selectedAssetId } = this.props;
		this.props.insertAsset(roundedX, roundedZ, selectedAssetId);
	}

	renderAsset() {
		const { attributes, data, isSelected, mode, rotation, thirdPerson, x, z } = this.props;
		const { onClick } = this.props;
		const id = data.id;
		const yScaleFactor =
			data.category === "construction" ? data.scale.y / 2 : 0;

		return data.category === "construction" ? (
			<Wall
				attributes={attributes}
				isSelected={isSelected}
				mode={mode}
				onClick={onClick}
				rotation={rotation}
				type={data.id}
				x={x}
				z={z}
			/>
		) : (
			<Entity
				click-drag
				events={{
					click: thirdPerson ? onClick : null,
					dragstart: this.dragStart.bind(this),
					dragmove: this.dragMove.bind(this),
					dragend: this.dragEnd.bind(this)
				}}
				// If an assets contains an .mtl (defined in qset), aframe will use obj-model. Otherwise, aframe will use material src
				material={{ color: "green", opacity: 0.4 }}
				obj-model={
					isSelected
						? `obj: #${data.id}-obj;`
						: `obj: #${data.id}-obj;mtl: #${data.id}-mtl;`
				}
				/**
				 * The scale property grows an a-box in the +-y direction, but we want it to seem like the box is just growing in the +y direction.
				 *   To do this, the position of the box must be shifted upward half of the total scaling value.
				 */
				position={{ x, y: yScaleFactor, z }}
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
		const yScaleFactor =
			data.category === "construction" ? data.scale.y / 2 : 0;

		return data.category === "construction" ? (
			<Wall
				type={data.id}
				attributes={attributes}
				isSelected={isSelected}
				mode={mode}
				onClick={thirdPerson ? onClick : null}
				rotation={rotation}
				x={x}
				z={z}
			/>
		) : (
			<Entity
				events={{
					click: thirdPerson ? onClick : null
				}}
				// If an assets contains an .mtl (defined in qset), aframe will use obj-model. Otherwise, aframe will use material src
				material={{ color: "green", opacity: 0.4 }}
				obj-model={
					isSelected
						? `obj: #${data.id}-obj;`
						: `obj: #${data.id}-obj;mtl: #${data.id}-mtl;`
				}
				/**
				 * The scale property grows an a-box in the +-y direction, but we want it to seem like the box is just growing in the +y direction.
				 *   To do this, the position of the box must be shifted upward half of the total scaling value.
				 */
				position={{ x, y: yScaleFactor, z }}
				primitive={data.tag}
				rotation={{ x: 0, y: rotation, z: 0 }}
				scale={data.scale}
			/>
		);
	}

	render() {
		if (checkPropsExist(this.props)) {
			if (!this.props.thirdPerson) return this.renderAssetNonDrag();
			return Namespace("HospitalSim").browserIsChrome
				? this.renderAsset()
				: this.renderAssetNonDrag();
		} else return null;
	}
}
