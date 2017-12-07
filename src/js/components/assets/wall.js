import AFRAME from "aframe";
import { Entity } from "aframe-react";
import React from "react";

export default props => {
	return (
		<Entity>
			{props.type == 'window' ? (
				<Entity>
					<Entity
						events={{ click: props.onClick }}
						geometry={{ primitive: 'box', height: .95, width: 1, depth: 1}}
						material={
							props.isSelected
								? { color: "green", opacity: 0.4, }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ x: props.x, y: .475, z: props.z }}
						rotation={{ x: 0, y: props.rotation, z: 0 }}
					/>
					<Entity
						events={{ click: props.onClick }}
						geometry={{ primitive: 'box', height: 1.4, width: 1, depth: .1}}
						material={{ color: "white", opacity: .25 }}
						position={{ x: props.x, y: 1.65, z: props.z }}
						rotation={{ x: 0, y: props.rotation, z: 0 }}
					/>
					<Entity
						events={{ click: props.onClick }}
						geometry={{ primitive: 'box', height: .65, width: 1, depth: 1}}
						material={
							props.isSelected
								? { color: "green", opacity: 0.4, }
								: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
						}
						position={{ x: props.x, y: 2.675, z: props.z }}
						rotation={{ x: 0, y: props.rotation, z: 0 }}
					/>
				</Entity>
				) :
				<Entity
					events={{ click: props.onClick }}
					geometry={{ primitive: 'box', height: 3, width: 1, depth: 1}}
					material={
						props.isSelected
							? { color: "green", opacity: 0.4 }
							: { color: "#f9d9c2", opacity: 1, metalness: 0.4 }
					}
					position={{ x: props.x, y: 1.5, z: props.z }}
					rotation={{ x: 0, y: props.rotation, z: 0 }}
				/>
			}
			<Entity
				primitive="a-box"
				width="1.025"
				height="1.025"
				depth=".35"
				material={
					props.isSelected
						? { color: "green", opacity: 0.4}
						: { color: "#7c695b", opacity: 1 }
				}
				position={{ x: props.x, y: .15, z: props.z }}
				rotation={{ x: -90, y: 0, z: 0 }}
			/>
		</Entity>
	);
};
