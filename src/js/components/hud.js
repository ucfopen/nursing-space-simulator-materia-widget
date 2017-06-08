import React from 'react';
import ReactDOM from 'react-dom';
import CategoryButton from './ui/category_button';
import AssetButton from './ui/asset_button';
import MovementControls from './ui/movement_controls';
//import './hud.css';

export default class HUD extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: this.props.categories[0],
            showMenu: true,
        }
    }

    render () {
        const assets = this.props.assetsFromFile;
        const curCategory = this.state.category;
        const selectAsset = this.props.selectAsset;

        return (
            this.props.thirdPerson
                ?   <div>
                        <MovementControls
                            xUp={this.props.xUp.bind(this)}
                            xDown={this.props.xDown.bind(this)}
                            yUp={this.props.yUp.bind(this)}
                            yDown={this.props.yDown.bind(this)}
                            zUp={this.props.zUp.bind(this)}
                            zDown={this.props.zDown.bind(this)} />
                        {
                            this.props.selectedAsset !== null
                                ? <div id="UI-selected-asset-options" style={{display: this.props.manipulationMode ? "inline" : "none"}}>
                                    <span className="selected-asset-label-title">Currently selected: {this.props.selectedAsset.asset.title}</span>
                                    <span id="selected-asset-label"></span>
                                    <button id="deselect" onClick={this.props.manipulateAsset.bind(this, this.props.selectedAsset.asset, "deselect", this.props.selectedAsset.x, this.props.selectedAsset.y)}>Deselect</button>
                                    <button id="rotate" onClick={this.props.manipulateAsset.bind(this, this.props.selectedAsset.asset, "rotate", this.props.selectedAsset.x, this.props.selectedAsset.y)}>Rotate</button>
                                    <button id="remove" onClick={this.props.manipulateAsset.bind(this, this.props.selectedAsset.asset, "remove", this.props.selectedAsset.x, this.props.selectedAsset.y)}>Remove</button>
                                </div>
                                : null
                        }
                        <div id="UI-bottom-panel" className={this.state.showMenu ? "open" : "closed"}>
                            <button onClick={this.toggleMenu.bind(this)} className="drawer-toggle">{this.state.showMenu ? "[Close Menu]" : "[Open Menu]"}</button>
                            <div id="asset-selection-menu">
                                <button id="vr-viewer-mode" onClick={selectAsset.bind(this, {id: 'pov_camera', title: 'POV Camera'}, null, null)}>First-Person Viewer</button>
                                {
                                this.props.categories.map((category, index) => (
                                    <CategoryButton onClick={this.setCurrentCategory.bind(this, category)} key={index} category={category}/>
                                ))
                                }
                            </div>
                            <div id="asset-picker">
                                {
                                Object.keys(assets).map(function(asset) {
                                    if(curCategory === assets[asset].category)
                                        return (
                                            <AssetButton key={asset} item={assets[asset]} onClick={selectAsset.bind(this, assets[asset], null, null)}/>
                                        );
                                })
                                }
                            </div>
                        </div>
                    </div>
            :   <div id="ground-top-panel">
                    <button id="back" onClick={this.props.toggleCamera.bind(this)}>Back</button>
                </div>
        );
    }

    toggleMenu() {
        const showMenu = this.state.showMenu;
        this.setState({showMenu: !showMenu});
    }
    setCurrentCategory(category) {
        this.setState({category: category});
    }
}