import React from "react";

export default props => {

	return (
		props.visible
			? ( // preventDefault on mousedown prevents items underneath from being dragged
				<div
					id="help-pane"
					className={props.mode == "editAsset" ? "reduced" : null}
					onMouseDown={(e)=>e.preventDefault()}>
					<button id="close-help-pane" onClick={()=>props.toggleHelpVisibility()}>x</button>
					<div id="keyboard-checkbox">
						<input
							type="checkbox"
							id="keyboard"
							onChange={props.toggleKeyboardShortcuts}
							checked={props.shortcutsEnabled}
						/>
						<label htmlFor="keyboard">Enable</label>
					</div>
					<p onClick={()=>props.restartTour()}>Click here to restart the tour.</p>
					<h1>Keyboard Shortcuts</h1>
					<ul>
						<li>
							<strong>WASD</strong> or <strong>Arrow Keys</strong> control the camera, or, if an asset is selected, move that selected asset
						</li>
						<li><strong>C</strong> center the camera</li>
						<li><strong>M</strong> toggle the menu visibility</li>
						<li><strong>Z</strong> or <strong>=</strong> or <strong>+</strong> zoom in</li>
						<li><strong>X</strong> or <strong>-</strong> zoom out</li>
						<li>
							<strong>1</strong>, <strong>2</strong>, & <strong>3</strong> toggle Equipment, Construction, and People categories, respectively
						</li>
						<li><strong>4</strong> or <strong>F</strong> select first-person selector</li>
						<li><strong>R</strong> rotate a selected asset</li>
						<li><strong>T</strong> trash a selected asset</li>
						<li>
							<strong>Q</strong> or <strong>Esc</strong> cancel selection or go back
						</li>
						<li><strong>E</strong> enter extend-wall mode (when a wall is selected)</li>
						<li><strong>V</strong> enter wall edit mode (when wall or door is selected)</li>
						<li><strong>H</strong> toggle help (this menu)</li>
					</ul>
					<p id="version-info">Build 3, Spring 2017</p>
				</div>
			)
			: null
	);
};
