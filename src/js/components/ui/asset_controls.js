import React from 'react';
import ReactDOM from 'react-dom';

export default class AssetControls extends React.Component {
    render () {
        return (
            <div id="UI-selected-asset-options">
                <span className="selected-asset-label-title">Currently selected: {this.props.selectedAsset.asset.title}</span>
                <span id="selected-asset-label"></span>
                <button id="deselect" onClick={this.props.manipulateAsset.bind(this, this.props.selectedAsset.asset, "deselect", this.props.selectedAsset.x, this.props.selectedAsset.y)}>Deselect</button>
                <button id="rotate" onClick={this.props.manipulateAsset.bind(this, this.props.selectedAsset.asset, "rotate", this.props.selectedAsset.x, this.props.selectedAsset.y)}>Rotate</button>
                <button id="remove" onClick={this.props.manipulateAsset.bind(this, this.props.selectedAsset.asset, "remove", this.props.selectedAsset.x, this.props.selectedAsset.y)}>Remove</button>
            </div>
        )
    }
}