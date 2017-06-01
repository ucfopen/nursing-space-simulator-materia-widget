import React, { Component } from "react"
import AFRAME from "aframe"
import { Scene } from "aframe-react"
import { connect } from "react-redux"

import { updateGrid, selectObject } from "../actions/placement_actions"

// Scene Assets
import CeilingUnit from "./assets/ceiling_unit"
import CameraTP from "./assets/camera_tp"
import CameraFP from "./assets/camera_fp"
import QsetAsset from "./assets/qset_asset"
import FloorUnit from "./assets/floor_unit"

class VRScene extends Component {
  render() {
    const assets = this.props.data.assets
    const grid = this.props.placement.grid

    const position = this.props.position
    const thirdPerson = this.props.thirdPerson

    if (!grid || !position || !thirdPerson || !assets || !this.props.placement)
      return <div>Loading</div>
    else {
      return (
        <Scene>
          <a-assets>
            <img
              id="ceilingTexture"
              alt="sorry"
              src="assets/CEILING_TILE.jpg"
            />
            <img id="wallTexture" alt="sorry" src="assets/WALL_2D_1.png" />
          </a-assets>

          <CameraFP active={!thirdPerson} position={position} />
          <CameraTP active={thirdPerson} position={position} />

          {// Draw the assets to the screen
          grid.map((row, rowIndex) =>
            row.map(
              (column, colIndex) =>
                grid[rowIndex][colIndex] !== "0"
                  ? <QsetAsset
                      x={rowIndex}
                      z={colIndex}
                      onClick={() =>
                        this.props.selectObject(
                          this.props.placement.selectedAsset,
                          rowIndex,
                          colIndex
                        )}
                      data={assets[grid[rowIndex][colIndex].id]}
                      rotation={grid[rowIndex][colIndex].rotation}
                    />
                  : null
            )
          )}
          {// Draw the floor (tile by tile) to the scene
          grid.map((row, rowIndex) =>
            row.map((column, colIndex) => (
              <FloorUnit
                x={rowIndex}
                y={colIndex}
                onClick={() =>
                  this.props.updateGrid(
                    rowIndex,
                    colIndex,
                    this.props.placement.selectedAsset
                  )}
                color="red"
              />
            ))
          )}
          {// Draw the ceiling (tile by tile) to the scene
          grid.map((row, rowIndex) =>
            row.map(
              (column, colIndex) =>
                thirdPerson ? null : <CeilingUnit x={rowIndex} z={colIndex} />
            )
          )}
        </Scene>
      )
    } //end else
  }
}

function mapStateToProps({ position, thirdPerson, data, placement }) {
  return {
    position,
    thirdPerson,
    data,
    placement
  }
}

export default connect(mapStateToProps, { updateGrid, selectObject })(VRScene)
