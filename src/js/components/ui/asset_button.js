import React, { Component } from 'react';

export default class AssetButton extends Component {
    render() {
        return (
            <button 
                className="asset" 
                data-category={this.props.item.category}
                data-title={this.props.item.title}
                id={this.props.item.id}
                onClick={this.props.onClick}
                style={{background: 'url(' + this.props.item.buttonSource + ') no-repeat center center', backgroundSize: "100% 100%"}}/>
        )
    }
}