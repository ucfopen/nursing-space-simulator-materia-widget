import AFRAME from 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class QsetAsset extends React.Component {
    render () {
        let yScaleFactor = (this.props.data.category === "walls") ? this.props.data.scale.y / 2: 0;
        return (
            <Entity
                events={{click: this.props.onClick, mouseenter: this.props.onMouseEnter, mouseleave: this.props.onMouseLeave}}
                primitive={this.props.data.tag}
                // If an assets contains an .mtl (defined in qset), aframe will use obj-model. Otherwise, aframe will use material src 
                material={{src: this.props.data.object, color: this.props.data.defaultColor}}
                obj-model={this.props.data.object}
                /** 
                * The scale property grows an a-box in the +-y direction, but we want it to seem like the box is just growing in the +y direction. 
                *   To do this, the position of the box must be shifted upward half of the total scaling value.
                */
                position={{x: this.props.x, y: yScaleFactor, z:this.props.z}}
                rotation={{x: 0, y: this.props.rotation, z: 0}}
                scale={this.props.data.scale}/>
        )
    }
}