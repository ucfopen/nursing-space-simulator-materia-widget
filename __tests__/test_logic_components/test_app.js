import ConnectedApp, { App } from "../../src/js/components/app";
import React from "react";
import { Provider } from "react-redux";
import qset from "../custom_test_utilities/mock_qset";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import reducers from "../../src/js/reducers";
import { JSDOM } from "jsdom";

const jsdom = new JSDOM(
	"<!doctype html><html><body><div id='app'></div></body></html>"
);

describe("App tests", () => {
	it("should render connected component using app", () => {
		const store = createStore(reducers);
		const initDataSpy = jest.fn();
		ConnectedApp.prototype.componentDidMount = function() {
			this.props.initData();
		};
		const connectedAppComponent = mount(
			<Provider store={store}>
				<ConnectedApp qset={qset} initData={initDataSpy} />
			</Provider>,
			{ attachTo: jsdom.window.document.getElementById("app") }
		);
		expect(initDataSpy).toBeCalled();
	});

	it("should end tour if joyride callback returns finished", () => {
		const endTourSpy = jest.fn();
		const wrapper = shallow(<App endTour={endTourSpy} />);
		wrapper.instance().joyrideCallback({ type: "finished" });
		expect(endTourSpy).toBeCalled();
	});
});
