import React from 'react';
import ReactDOM from 'react-dom';

import HUD from './hud';
import VRScene from "./vr_scene";

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            position: {x: 2.5, y: 18, z: 14},
            thirdPerson: true,
            displayUi: true,
            grid: this.props.map
        }
    }

    handleClick(x, y) {
        console.log(x + "," + y);
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
                    grid={this.state.grid}
                    thirdPerson={this.state.thirdPerson}
                    position={this.state.position}
                    onClick={this.handleClick.bind(this)}
                    />
                <HUD
                    xUp={this.updatePosition.bind(this, "x", 1, false)}
                    xDown={this.updatePosition.bind(this, "x", -1, false)}
                    yUp={this.updatePosition.bind(this, "y", 1, false)}
                    yDown={this.updatePosition.bind(this, "y", -1, false)}
                    zUp={this.updatePosition.bind(this, "z", -1, false)}
                    zDown={this.updatePosition.bind(this, "z", 1, false)}
                    resetPosition={this.updatePosition.bind(this, "y", 0, true)}
                    toggleCamera={this.toggleCamera.bind(this)} />
            </div>
        );
    }
   
}