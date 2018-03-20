import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/app";
import reducers from "./reducers";

Namespace("HospitalSim").browserIsChrome = false;

/*
** Places the first--and main--React element in the document.
*/
window.mouseCoords = { x: null, y: null };
window.lastMouseCoords = { x: null, y: null };
window.shiftKeyIsPressed = false;
document.addEventListener("mousemove", event => {
	window.mouseCoords.x = event.clientX;
	window.mouseCoords.y = event.clientY;
});

document.addEventListener("keydown", event => {
	window.shiftKeyIsPressed = event.shiftKey;
});

document.addEventListener("keyup", event => {
	window.shiftKeyIsPressed = false;
});

Namespace("HospitalSim").Engine = (function() {
	var start = function(instance, qset, version) {
		if (navigator.userAgent.indexOf("Chrome") !== -1) {
			Namespace("HospitalSim").browserIsChrome = true;
		}
		ReactDOM.render(
			<Provider
				store={createStore(
					reducers,
					window.__REDUX_DEVTOOLS_EXTENSION__ &&
						window.__REDUX_DEVTOOLS_EXTENSION__()
				)}
			>
				<App qset={qset} />
			</Provider>,
			document.querySelector("#sceneContainer")
		);
	};

	// Public
	return { start };
})();
