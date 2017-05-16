import 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class Ceiling extends React.Component {
    render () {
        return (
            <Entity 
                primitive="a-plane" 
                material={{repeat: "16 16", src: "#ceilingTexture"}} 
                position={{x: 5.5, y: 3, z: 14}}
                rotation="90 180 90" 
                height="12" width="30"/>
        );
    }
}