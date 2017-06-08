import AFRAME from 'aframe';
import {Entity} from 'aframe-react';
import React from 'react';

export default class QsetAsset extends React.Component {
    // To highlight an asset, this method will strip the mtl.
    highlightAsset() {
        if(this.props.data.category === "walls") return;

        const model = this.props.data.object.split(";");

        // Model[0] = obj filepath
        return model[0];
    }

    render () {
        let yScaleFactor = (this.props.data.category === "walls") ? this.props.data.scale.y / 2: 0;
        return (
            <Entity
                events={{click: this.props.onClick, mouseenter: this.props.onMouseEnter, mouseleave: this.props.onMouseLeave}}
                primitive={this.props.data.tag}
                // Material color is used when an mtl is not provided
                material={this.props.assetSelected ? {color: "green", opacity: 0.4} : {color: this.props.data.defaultColor, opacity: 1}}
                obj-model={this.props.assetSelected ? this.highlightAsset() : this.props.data.object}
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