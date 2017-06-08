import AFRAME from "aframe"
import { Entity } from "aframe-react"
import React from "react"

export default class Skybox extends React.Component {
	render() {
		return <Entity primitive="a-sky" color="#ccffff" />
	}
}
