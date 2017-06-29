import ConnectedApp, { App } from "../../src/js/components/app";
import React from "react";
import { Provider } from "react-redux";
import qset from "../custom_test_utilities/mock_qset";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import reducers from "../../src/js/reducers";
import { JSDOM } from "jsdom";
import Aframe from "aframe";
import Sinon from "sinon";

const propsInApp = ["store", "qset", "initData"];
/* setup.js */

const jsdom = new JSDOM(
	"<!doctype html><html><body><div id='app'></div></body></html>"
);
const { window } = jsdom;

function copyProps(src, target) {
	const props = Object.getOwnPropertyNames(src)
		.filter(prop => typeof target[prop] === "undefined")
		.map(prop => Object.getOwnPropertyDescriptor(src, prop));
	Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
	userAgent: "node.js"
};
global.AFRAME = Aframe;

copyProps(window, global);
describe("App tests", () => {
	it("should. ...", () => {
		const app = shallow(<App qset={qset} />);
	});

	it("should render connected component using app", () => {
		const store = createStore(reducers);

		const connectedAppComponent = mount(
			<Provider store={store}><ConnectedApp qset={qset} /></Provider>,
			{ attachTo: jsdom.window.document.getElementById("app") }
		);

		console.log(
			connectedAppComponent.find(ConnectedApp).find(App).find("a-entity")
		);
	});
});
