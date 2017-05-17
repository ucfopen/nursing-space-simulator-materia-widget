import 'aframe';
import {Scene} from 'aframe-react';
import React from 'react';

// Scene Assets
import Ceiling from './assets/ceiling';
import CameraTP from './assets/camera_tp';
import CameraFP from './assets/camera_fp';
import WallUnit from './assets/wall_unit';
import FloorUnit from './assets/floor_unit';

export default class VRScene extends React.Component {
  render () {
    return (
      <Scene>
        <a-assets>
          <img id="ceilingTexture" alt="sorry" src="assets/CEILING_TILE.jpg"/>
          <img id="wallTexture" alt="sorry" src="assets/WALL_2D_1.png"/>
        </a-assets>
        <Ceiling />
        <CameraFP active={!this.props.thirdPerson} position={this.props.position}/>
        <CameraTP active={this.props.thirdPerson} position={this.props.position}/>
        {
            this.props.grid.map((row, rowIndex) => (
                row.map((column, colIndex) => (
                    this.props.grid[rowIndex][colIndex] === "w" &&
                        <WallUnit x={rowIndex} z={colIndex}/> ||
                        <FloorUnit 
                            x={rowIndex} y={colIndex}
                            onClick={this.props.onClick.bind(this, rowIndex, colIndex)}
                            color="red"/>
                ))
            ))
        }
      </Scene>
    );
  }
}