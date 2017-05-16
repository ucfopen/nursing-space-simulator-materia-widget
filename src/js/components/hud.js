import React from 'react';
import ReactDOM from 'react-dom';
//import './hud.css';

export default class HUD extends React.Component {
    render () {
        return (
            <div>
                <div id="ground-top-panel">
                    <button id="back">Back</button>
                </div>
                <div id="UI-right-panel">
                    <div id="top-buttons"></div>
                    <button id="screenshot">Take a Screenshot</button>
                    <div id="camera-move">
                        <button id="camera-up" onClick={this.props.xUp}>&uarr;</button>
                        <div id="camera-move-horizontal">
                            <button id="camera-left" onClick={this.props.zUp}>&larr;</button>
                            <button id="camera-right" onClick={this.props.zDown} >&rarr;</button>
                        </div>
                        <button id="camera-down" onClick={this.props.xDown}>&darr;</button>
                    </div>
                    <button id="camera-zoom-in" onClick={this.props.yDown}>+</button>
                    <button id="camera-zoom-out" onClick={this.props.yUp}>-</button>
                    <button id="camera-position-reset" onClick={this.props.resetPosition}>Reset</button>
                </div>
                <div id="UI-selected-asset-options">
                    <span className="selected-asset-label-title">Currently selected:</span>
                    <span id="selected-asset-label"></span>
                    <button id="deselect">Deselect</button>
                    <button id="rotate">Rotate</button>
                    <button id="remove">Remove</button>
                </div>
                <div id="UI-bottom-panel" className="open">
                    <button className="drawer-toggle">[Close Menu]</button>
                    <div id="asset-selection-menu">
                        <button id="vr-viewer-mode" onClick={this.props.toggleCamera}>First-Person Viewer</button>
                    </div>
                <div id="asset-picker">
                </div>
            </div>
        </div>
        );
    }
}