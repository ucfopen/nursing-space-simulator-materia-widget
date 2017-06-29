import ConnectedApp, { App } from "../../src/js/components/app";
import React from "react";
import { Provider } from "react-redux";
import qset from "../custom_test_utilities/mock_qset";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import reducers from "../../src/js/reducers";

const propsInApp = ["store", "qset", "initData"];

describe("App tests", () => {
	it("should. ...", () => {
		const app = shallow(<App qset={qset} />);
	});

	it("should render connected component using app", () => {
		const store = createStore(reducers);

		store.initData = jest.fn();

		const connectedAppComponent = shallow(
			<Provider store={store}><ConnectedApp qset={qset} /></Provider>
		);
	});
});
