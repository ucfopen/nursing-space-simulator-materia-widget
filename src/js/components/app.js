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
            manipulationMode: false,
            placementMode: false,
            position: {x: 2.5, y: 18, z: 14}, //TODO: make these variable dynamic based on map from qset
            selectedAsset: {asset: "", x: "", y: ""},
            thirdPerson: true,
        }
    }

    handleClick(x, y) {
        const grid = this.state.grid;

        if(!this.state.selectedAsset.asset || !this.state.thirdPerson) return;

        grid[x][y] = {
            id: this.state.selectedAsset.asset.id,
            rotation: 0
        }

        if(this.state.selectedAsset.asset.category !== "walls") {
            if(this.state.manipulationMode && this.state.selectedAsset.x > -1 && this.state.selectedAsset.y > -1) {
                grid[x][y].rotation = grid[this.state.selectedAsset.x][this.state.selectedAsset.y].rotation;
                grid[this.state.selectedAsset.x][this.state.selectedAsset.y] = "0";
            }

            this.selectAsset(this.state.selectedAsset.asset, x, y);
        }

        this.setState(
            {
                grid: grid,
            }
        );

    }

    manipulateAsset(asset, action, x, y) {
        let grid = this.state.grid;

        if(action === "select") {
            this.selectAsset(asset, x, y);
        }

        if(action === "deselect") {
            this.setState(
                {
                    manipulationMode: false,
                    selectedAsset: {asset: "", x: "", y: ""},
                }
            );
        }

        if(action === "remove") {
            grid[x][y] = "0";
            this.setState(
                {
                    grid: grid,
                    manipulationMode: false,
                }
            );
        }

        if(action === "rotate") {
            grid[x][y].rotation = (grid[x][y].rotation + 90) % 360;
            this.setState(
                {
                    grid: grid,
                }
            );
        }
    }

    selectAsset(asset, x, y) {
        if(!asset) return;

        if(!x) x = -1;
        if(!y) y = -1;

        this.setState(
            {
                selectedAsset: {asset: asset, x: x, y: y},
                manipulationMode: true
            }
        );

        if(x < 0 || y < 0)
            this.setState({manipulationMode: false});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.grid !== nextState.grid) return true;
        if(this.state.postition !== nextState.position) return true;
        if(this.state.manipulationMode !== nextState.manipulationMode) return true;

        return false;
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

    updateSelectedAssetPosition(x_distance, y_distance) {
        if (!this.state.thirdPerson || !this.state.selectedAsset.asset) return;
        const old_x = this.state.selectedAsset.x;
        const old_y = this.state.selectedAsset.y;
        const asset = this.state.selectedAsset.asset;

        const grid = this.state.grid;

        // is the tile open?
        if(grid[old_x+x_distance][old_y+y_distance] == "0") 
        {
            grid[old_x][old_y] = "0";
            grid[old_x + x_distance][old_y + y_distance] =  {
                id: asset.id,
                rotation: grid[old_x][old_y].rotation
            };
            this.setState({
                grid: grid,
                selectedAsset: {
                    asset: asset,
                    x: old_x + x_distance,
                    y: old_y + y_distance
                }
            });
        }

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
                    xUp={this.updateSelectedAssetPosition.bind(this, 1, 0)}
                    xDown={this.updateSelectedAssetPosition.bind(this, -1, 0)}
                    yUp={this.updatePosition.bind(this, "y", 1, false)}
                    yDown={this.updatePosition.bind(this, "y", -1, false)}
                    zUp={this.updateSelectedAssetPosition.bind(this, 0, -1)}
                    zDown={this.updateSelectedAssetPosition.bind(this, 0, 1)}
                    resetPosition={this.updatePosition.bind(this, "y", 0, true)}
                    toggleCamera={this.toggleCamera.bind(this)}/>
            </div>
        );
    }
}