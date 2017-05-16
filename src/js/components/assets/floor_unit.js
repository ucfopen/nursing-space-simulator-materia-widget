import 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class FloorUnit extends React.Component {
    render () {
        return (
            <Entity
                primitive="a-plane"
                material={{color: "white"}}
                position={{x: this.props.x, y:"-1", z:this.props.y}} 
                rotation={{x: "-90", y:"0", z:"0"}}
                scale={{x: "1", y: "1", z: "1"}} 
                height="1" width="1" />
        )
    }
}