import React, { Component } from "react"
import AFRAME from "aframe"
import { Entity } from "aframe-react"

export default class CeilingUnit extends Component {
  render() {
    return (
      <Entity
        primitive="a-plane"
        material={{ src: "#ceilingTexture" }}
        position={{ x: this.props.x, y: 3, z: this.props.z }}
        rotation="90 0 90"
        scale={{ x: "1", y: "1", z: "1" }}
        height="1"
        width="1"
      />
    )
  }
}
