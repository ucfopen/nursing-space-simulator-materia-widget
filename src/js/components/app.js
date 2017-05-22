import React from 'react';
import ReactDOM from 'react-dom';

import HUD from './hud';
import VRScene from "./vr_scene";

/**
 * App holds the state of the entire simulation. Calls the HUD and the VR Scene
 * 
 * @param map array Holds the 2D representation of the grid that represents the simulation's map
 */
export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            grid: this.props.map,
            position: {x: 2.5, y: 18, z: 14},
            selectedAsset: "",
            thirdPerson: true,
        }
    }

    handleClick(x, y) {
        const grid = this.state.grid;

        if(!this.state.selectedAsset)
            return;

        grid[x][y] = this.state.selectedAsset.id;
        console.log("Grid: " + grid[x][y]+ " @ " + "(" + x + "," + y + ")");
        this.setState({grid:grid});
    }

    selectAsset(asset) {
        if(!asset)
            return;

        console.log(asset);
        this.setState({selectedAsset: asset});
    }

    toggleCamera() {
        const thirdPerson = this.state.thirdPerson;
        this.setState({thirdPerson: !this.state.thirdPerson});
    }

    updatePosition(direction, distance, reset) {
        let position = this.state.position;

        if(reset)
            position = {x: 2.5, y: 18, z: 14};
        else
            position[direction] += distance;
            
        this.setState({position:position});
    }

    render() {
        return (
            <div>
                <VRScene 
                    assetsFromFile={this.props.assetsFromFile}
                    grid={this.state.grid}
                    thirdPerson={this.state.thirdPerson}
                    position={this.state.position}
                    onClick={this.handleClick.bind(this)}/>
                <HUD
                    categories={this.props.categories}
                    assetsFromFile={this.props.assetsFromFile}
                    selectAsset={this.selectAsset.bind(this)}
                    xUp={this.updatePosition.bind(this, "x", 1, false)}
                    xDown={this.updatePosition.bind(this, "x", -1, false)}
                    yUp={this.updatePosition.bind(this, "y", 1, false)}
                    yDown={this.updatePosition.bind(this, "y", -1, false)}
                    zUp={this.updatePosition.bind(this, "z", -1, false)}
                    zDown={this.updatePosition.bind(this, "z", 1, false)}
                    resetPosition={this.updatePosition.bind(this, "y", 0, true)}
                    toggleCamera={this.toggleCamera.bind(this)}/>
            </div>
        );
    }
   
}