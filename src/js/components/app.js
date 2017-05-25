import React, { Component } from 'react';
import HUD from './hud';
import VRScene from "./vr_scene";

/**
 * App holds the state of the entire simulation. Calls the HUD and the VR Scene
 * 
 * @param map array Holds the 2D representation of the grid that represents the simulation's map
 */
export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            grid: this.props.map,
            manipulationMode: false,
            placementMode: false,
            position: {x: 2.5, y: 18, z: 14}, //TODO: make these variable dynamic based on map from qset
            selectedAsset: {asset: "", x: "", y: ""},
            thirdPerson: true,
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.grid !== nextState.grid)
            return true;
        if (this.state.postition !== nextState.position)
            return true;
        if (this.state.manipulationMode !== nextState.manipulationMode)
            return true;

        return false;
    }

    handleClick(x, y) {
        let grid = this.state.grid;

        if (!this.state.selectedAsset.asset || !this.state.thirdPerson)
            return;

        grid[x][y] = {
            id: this.state.selectedAsset.asset.id,
            rotation: 0
        }

        if (this.state.manipulationMode && this.state.selectedAsset.x > 0 && this.state.selectedAsset.y > 0)
            grid[this.state.selectedAsset.x][this.state.selectedAsset.y] = "0";

        this.setState({
                grid,
                manipulationMode: true,
                selectedAsset: {asset: this.state.selectedAsset.asset, x: x, y: y},
        });
    }

    manipulateAsset(asset, action, x, y) {
        let grid = this.state.grid;

        this.selectAsset(asset, x, y);

        if (action === "select")
            this.setState({manipulationMode: true})

        if (action === "deselect") {
            this.setState({
                    manipulationMode: false,
                    selectedAsset: {asset: "", x: "", y: ""},
            });
        }

        if (action === "remove") {
            grid[x][y] = "0";
            this.setState({
                    grid,
                    manipulationMode: false,
            });
        }

        if (action === "rotate") {
            grid[x][y].rotation = (grid[x][y].rotation + 90) % 360;
            this.setState({ grid });
        }
    }

    selectAsset(asset, x, y) {
        if (!asset)
            return;
        if (!x)
            x = -1;
        if (!y)
            y = -1;

        this.setState({selectedAsset: {asset: asset, x: x, y: y}});

        if (x < 0 || y < 0)
            this.setState({manipulationMode: false});
    }

    toggleCamera() {
        const thirdPerson = this.state.thirdPerson;
        this.setState({thirdPerson: !this.state.thirdPerson});
    }

    updatePosition(direction, distance, reset) {
        let position = this.state.position;

        if (reset)
            position = {x: 2.5, y: 18, z: 14};
        else
            position[direction] += distance;
            
        this.setState({ position });
    }

    render() {
        return (
            <div>
                <VRScene 
                    assetsFromFile={this.props.assetsFromFile}
                    manipulateAsset={this.manipulateAsset.bind(this)}
                    grid={this.state.grid}
                    thirdPerson={this.state.thirdPerson}
                    position={this.state.position}
                    onClick={this.handleClick.bind(this)}/>
                <HUD
                    manipulateAsset={this.manipulateAsset.bind(this)}
                    manipulationMode={this.state.manipulationMode}
                    categories={this.props.categories}
                    assetsFromFile={this.props.assetsFromFile}
                    selectAsset={this.selectAsset.bind(this)}
                    selectedAsset={this.state.selectedAsset}
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