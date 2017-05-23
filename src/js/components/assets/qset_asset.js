import 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class QsetAsset extends React.Component {
    render () {
        let scaleFactor = (this.props.data.category == "walls") ? this.props.data.scale.y - this.props.data.scale.y / 2 : 0;

        return (
            <Entity
                primitive={this.props.data.tag}
                material={{color: this.props.data.defaultColor}}
                obj-model={this.props.data.object}
                /** 
                * The scale property grows an a-box in the +-y direction, but we want it to seem like the box is just growing in the +y direction. 
                *   To do this, the position of the box must be shifted upward half of the total scaling value.
                */
                position={{x: this.props.x, y: scaleFactor, z:this.props.z}}
                rotation={this.props.data.rotation}
                scale={this.props.data.scale}/>
        )
    }
}