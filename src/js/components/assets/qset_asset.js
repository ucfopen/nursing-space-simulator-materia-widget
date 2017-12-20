import React, { Component } from "react";
import AFRAME from "aframe";
import registerClickDrag from "aframe-click-drag-component";
import { Entity } from "aframe-react";
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
		const { data, isSelected, x, z, rotation, attributes, mode } = this.props;
		const { onClick } = this.props;
		const yScaleFactor = data.category === "walls" ? data.scale.y / 2 : 0;
		const id = data.id;

		return id === "wall-1" || id === "window" || id == "door-1" ? (
			<Wall
				onClick={onClick}
				isSelected={isSelected}
				x={x}
				z={z}
				rotation={rotation}
				type={data.id}
				attributes={attributes}
				mode={mode}
			/>
		) : (
			<Entity
				click-drag
				events={{
					click: onClick,
					dragstart: this.dragStart.bind(this),
					dragmove: this.dragMove.bind(this),
					dragend: this.dragEnd.bind(this)
				}}
				primitive={data.tag}
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
				rotation={{ x: 0, y: rotation, z: 0 }}
				scale={data.scale}
			/>
		);
	}

	renderAssetNonDrag() {
		const { data, isSelected, x, z, rotation, attributes, mode } = this.props;
		const { onClick } = this.props;
		const yScaleFactor = data.category === "walls" ? data.scale.y / 2 : 0;
		const id = data.id;

		return id === "wall-1" || id === "window" || id == "door-1" ? (
			<Wall
				onClick={onClick}
				isSelected={isSelected}
				x={x}
				z={z}
				rotation={rotation}
				type={data.id}
				attributes={attributes}
				mode={mode}
			/>
		) : (
			<Entity
				events={{
					click: onClick
				}}
				primitive={data.tag}
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
				rotation={{ x: 0, y: rotation, z: 0 }}
				scale={data.scale}
			/>
		);
	}

	render() {
		if (checkPropsExist(this.props))
			return Namespace("HospitalSim").browserIsChrome
				? this.renderAsset()
				: this.renderAssetNonDrag();
		else return null;
	}
}
