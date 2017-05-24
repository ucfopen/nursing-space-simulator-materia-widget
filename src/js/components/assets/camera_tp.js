import AFRAME from 'aframe';
import 'aframe-mouse-cursor-component';
import {Entity} from 'aframe-react';
import React from 'react';

export default class CameraTP extends React.Component
{
    render () {
        return (
            <Entity
                camera={{active: this.props.active}}
                rotation="-90 180 90"
                position={this.props.position} 
                mouse-cursor/>
        )
    }
} 