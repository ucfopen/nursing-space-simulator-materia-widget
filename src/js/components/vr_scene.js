import AFRAME from 'aframe';
import {Scene} from 'aframe-react';
import React from 'react';

// Scene Assets
import CeilingUnit from './assets/ceiling_unit';
import CameraTP from './assets/camera_tp';
import CameraFP from './assets/camera_fp';
import QsetAsset from './assets/qset_asset';
import FloorUnit from './assets/floor_unit';

export default class VRScene extends React.Component {
  render () {
    return (
      <Scene>
        <a-assets>
          <img id="ceilingTexture" alt="sorry" src="assets/CEILING_TILE.jpg"/>
          <img id="wallTexture" alt="sorry" src="assets/WALL_2D_1.png"/>
        </a-assets>
        <CameraFP active={!this.props.thirdPerson} position={this.props.position}/>
        <CameraTP active={this.props.thirdPerson} position={this.props.position}/>
        {
          // Draw the floor and the assets to the screen
          this.props.grid.map((row, rowIndex) => (
              row.map((column, colIndex) => (
                  this.props.grid[rowIndex][colIndex] !== "0" 
                    ? <QsetAsset
                      x={rowIndex} z={colIndex}
                      onClick={this.props.manipulateAsset.bind(this, this.props.assetsFromFile[this.props.grid[rowIndex][colIndex].id], "select", rowIndex, colIndex)}
                      data={this.props.assetsFromFile[this.props.grid[rowIndex][colIndex].id]}
                      rotation={this.props.grid[rowIndex][colIndex].rotation}/>
                    : null
              ))
          ))
        }
        {
          // Draw the floor (tile by tile) to the scene
          this.props.grid.map((row, rowIndex) => (
                row.map((column, colIndex) => (
                    <FloorUnit 
                          thirdPerson={this.props.thirdPerson}
                          x={rowIndex} y={colIndex}
                          onClick={this.props.onClick.bind(this, rowIndex, colIndex)}
                          color="red"/> 
                ))
            ))
        }
        {
          // Draw the ceiling (tile by tile) to the scene
          this.props.grid.map((row, rowIndex) => (
                row.map((column, colIndex) => (
                    this.props.thirdPerson 
                      ? null 
                      : <CeilingUnit x={rowIndex} z={colIndex}/>
                ))
            ))
        }
      </Scene>
    );
  }
}