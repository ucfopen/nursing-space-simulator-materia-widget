import React, { Component } from 'react';
import AFRAME from 'aframe';
import { Entity } from 'aframe-react';

export default class CameraFP extends Component
{
    render() {
        return (
            <Entity
                camera={{active: this.props.active}}
                position={{x: 1, y: 1, z: 1}}
                look-controls
                wasd-controls/>
        )
    }
} 