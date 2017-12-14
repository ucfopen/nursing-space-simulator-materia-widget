import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React, { Component } from "react";
import Sticker from "./sticker"

export default class Wall extends Component {
	processStickers()
	{
		let sticker;
		let mappedStickers;
		if (this.props.attributes.stickers)
		{
			mappedStickers = this.props.attributes.stickers.map(
				(item, itemIndex) => {
					if (item != "0")
						return (
							<Sticker
								id={item}
								rotation={90 - itemIndex * 90 - this.props.rotation}
								isSelected={this.props.isSelected}
								key={`${item} ${itemIndex}`}
							/>
						);
				}
			)
		}
		return mappedStickers;
	}

	render()
	{
		// There are 3 basic wall types: window, door, and regular
		if (this.props.type == 'window')
			return (
				<Entity
					position={{ x: this.props.x, y: 0, z: this.props.z }}
					events={{ click: this.props.onClick }}
					rotation={{ x: 0, y: this.props.rotation, z: 0 }}>
					<Entity
						geometry={{ primitive: 'box', height: .95, width: 1, depth: 1}}
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4, }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ x: 0, y: .475, z: 0}}
					/>
					<Entity
						geometry={{ primitive: 'box', height: 1.4, width: 1, depth: .1}}
						material={{ color: "white", opacity: .25 }}
						position={{ x: 0, y: 1.65, z: 0 }}
					/>
					<Entity
						geometry={{ primitive: 'box', height: .65, width: 1, depth: 1}}
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4, }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ x: 0, y: 2.675, z: 0 }}
					/>
					<Entity
						primitive="a-box"
						width="1.025"
						height="1.025"
						depth=".35"
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4}
								: { color: "#7c695b", opacity: 1 }
						}
						position={{ x: 0, y: .15, z: 0 }}
						rotation={{ x: -90 }}
					/>
				</Entity>
			)
		if (this.props.type == 'door-1')
			return (
				<Entity
					events={{ click: this.props.onClick }}
					rotation={{ x: 0, y: this.props.rotation, z: 0 }}
					position={{ x: this.props.x, y: 0, z: this.props.z }}>
					<Entity
						geometry={{ primitive: 'box', height: 1, width: 1, depth: 1}}
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4 }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ x: 0, y: 2.5, z: 0}}
					/>
					<Entity
						geometry={{ primitive: 'plane', height: .75, width: 2}}
						material={
							this.props.isSelected
								? { side: "double", color: "green", opacity: 0.4 }
								: { side: "double", color: "white", opacity: 1, metalness: 0.4 }
						}
						position={{ y: 1 }}
						rotation={{ y: -90, z: -90}}
					/>
					<Entity
						geometry={{ primitive: 'box', height: 3, width: 1, depth: 0.125}}
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4 }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ y: 1.5, z: 0.4375}}
					/>
					<Entity
						geometry={{ primitive: 'box', height: 3, width: 1, depth: 0.125}}
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4 }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ y: 1.5, z: -0.4375 }}
					/>
					<Entity
						primitive="a-box"
						width="1.025"
						height="0.15"
						depth=".35"
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4}
								: { color: "#7c695b", opacity: 1 }
						}
						position={{ y: .15, z: 0.4375 }}
						rotation={{ x: -90 }}
					/>
					<Entity
						primitive="a-box"
						width="1.025"
						height="0.15"
						depth=".35"
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4}
								: { color: "#7c695b", opacity: 1 }
						}
						position={{ y: .15, z: -0.4375}}
						rotation={{ x: -90 }}
					/>
					{this.processStickers()}
				</Entity>
			)
		else // regular wall
			return (
				<Entity
					events={{ click: this.props.onClick }}
					position={{ x: this.props.x, y: 0, z: this.props.z }}
					rotation={{ x: 0, y: this.props.rotation, z: 0 }}>
					<Entity
						events={{ click: this.props.onClick }}
						geometry={{ primitive: 'box', height: 3, width: 1, depth: 1}}
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4 }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ x: 0, y: 1.5, z: 0 }}
					/>
					<Entity
						primitive="a-box"
						width="1.025"
						height="1.025"
						depth=".35"
						material={
							this.props.isSelected
								? { color: "green", opacity: 0.4}
								: { color: "#7c695b", opacity: 1 }
						}
						position={{ x: 0, y: .15, z: 0 }}
						rotation={{ x: -90 }}
					/>
					{this.processStickers()}
				</Entity>
			);
	}

};
