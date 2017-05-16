import 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class WallUnit extends React.Component {
    render () {
        return (
            <Entity
                primitive="a-box"
                material={{src: "#wallTexture"}}
                position={{x: this.props.x, y:"1", z:this.props.z}} 
                rotation={{x: "0", y:"0", z:"0"}}
                scale={{x: "1", y: "4", z: "1"}} />
        )
    }
}