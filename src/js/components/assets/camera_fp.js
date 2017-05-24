import AFRAME from 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class CameraFP extends React.Component
{
    render () {
        return (
            <Entity
                camera={{active: this.props.active}}
                position={{x: 1, y: 1, z: 1}}
                look-controls
                wasd-controls/>
        )
    }
} 