import React, { Component } from "react"
import { connect } from "react-redux"
import { initData } from "../actions"

import HUD from "./hud"
import VRScene from "./vr_scene"

class App extends Component {
  componentDidMount() {
    this.props.initData(this.props.qset)
  }

  render() {
    return (
      <div>
        <VRScene />
        <HUD />
      </div>
    )
  }
}

export default connect(null, { initData })(App)
