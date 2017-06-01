import React, { Component } from "react"
import { connect } from "react-redux"
import CategoryButton from "./ui/category_button"
import AssetButton from "./ui/asset_button"

import { updatePosition, toggleCameraType } from "../actions/camera_actions.js"
import { toggleMenuVisibility, setCategory } from "../actions/menu_actions"

import {
  selectAssetType,
  selectObject,
  deselectObject,
  rotateObject,
  removeObject
} from "../actions/placement_actions"

class HUD extends Component {
  render() {
    const assets = this.props.data.assets
    const currentCategory = this.props.menu.currentCategory

    if (!this.props.data.categories || !this.props.placement)
      return <div>Loading</div>
    else
      return (
        <div>
          <div id="ground-top-panel">
            <button id="back">Back</button>
          </div>
          <div id="UI-right-panel">
            <div id="top-buttons" />
            <button id="screenshot">Take a Screenshot</button>
            <div id="camera-move">
              <button
                id="camera-up"
                onMouseDown={() => this.props.updatePosition("xUp")}>
                ↑
              </button>
              <div id="camera-move-horizontal">
                <button
                  id="camera-left"
                  onMouseDown={() => this.props.updatePosition("zUp")}>
                  ←
                </button>
                <button
                  id="camera-right"
                  onMouseDown={() => this.props.updatePosition("zDown")}>
                  →
                </button>
              </div>
              <button
                id="camera-down"
                onMouseDown={() => this.props.updatePosition("xDown")}>
                ↓
              </button>
            </div>
            <button
              id="camera-zoom-in"
              onMouseDown={() => this.props.updatePosition("yDown")}>
              +
            </button>
            <button
              id="camera-zoom-out"
              onMouseDown={() => this.props.updatePosition("yUp")}>
              -
            </button>
            <button
              id="camera-position-reset"
              onMouseDown={() => this.props.updatePosition("reset")}>
              Reset
            </button>
          </div>
          <div
            id="UI-selected-asset-options"
            style={{
              display: this.props.placement.manipulationMode ? "inline" : "none"
            }}>
            {this.props.placement.selectedAsset
              ? <span className="selected-asset-label-title">
                  Currently selected: {this.props.placement.selectedAsset.title}
                </span>
              : null}
            <span id="selected-asset-label" />
            <button id="deselect" onClick={() => this.props.deselectObject()}>
              Deselect
            </button>
            <button
              id="rotate"
              onClick={() =>
                this.props.rotateObject(
                  this.props.placement.selectedAsset,
                  this.props.placement.currentX,
                  this.props.placement.currentY
                )}>
              Rotate
            </button>
          </div>
          <div
            id="UI-bottom-panel"
            className={this.props.menu.visible ? "open" : "closed"}>
            <button
              onClick={() => this.props.toggleMenuVisibility()}
              className="drawer-toggle">
              {this.props.menu.visible ? "[Close Menu]" : "[Open Menu]"}
            </button>
            <div id="asset-selection-menu">
              <button
                id="vr-viewer-mode"
                onClick={() => this.props.toggleCameraType()}>
                First-Person Viewer
              </button>
              {this.props.data.categories.map((category, index) => (
                <CategoryButton
                  onClick={() => this.props.setCategory(category)}
                  key={index}
                  category={category}
                />
              ))}
            </div>
            <div id="asset-picker">
              {Object.keys(assets).map(asset => {
                if (currentCategory === assets[asset].category)
                  return (
                    <AssetButton
                      key={asset}
                      item={assets[asset]}
                      onClick={() => this.props.selectAssetType(assets[asset])}
                    />
                  )
              })}
            </div>
          </div>
        </div>
      )
  }
}

function mapStateToProps({ menu, data, placement }) {
  return {
    menu,
    data,
    placement
  }
}

export default connect(mapStateToProps, {
  updatePosition,
  toggleCameraType,
  toggleMenuVisibility,
  setCategory,
  selectAssetType,
  deselectObject,
  rotateObject
})(HUD)
