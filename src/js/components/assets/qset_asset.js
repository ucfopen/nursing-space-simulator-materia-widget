import 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class WallUnit extends React.Component {
    render () {
        return (
            <Entity
                primitive="a-box"
                material={{color: this.props.data.defaultColor}}
                obj-model={this.props.data.object}
                position={{x: this.props.x, y:"0", z:this.props.z}} 
                rotation={this.props.data.rotation}
                scale={this.props.data.scale} />
        )
    }
}