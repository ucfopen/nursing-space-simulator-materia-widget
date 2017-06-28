import ConnectedApp, { App } from "../../src/js/components/app";
import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import { createStore } from "redux";
import renderer from "react-test-renderer";
import reducers from "../../src/js/reducers";

describe("App tests", () => {
	it("Should render App", () => {
		it("renders skybox correctly", () => {
			const appTree = renderer.create(<App />).toJSON();
			expect(appTree).toMatchSnapshot();
		});
	});

	it("should render connected component using app", () => {
		const store = createStore(reducers);

		const qset = {
			options: {
				gridLoader: {
					columns: 2,
					content: "0 0 0 0",
					rows: 2
				},
				categories: ["beds", "equipment", "walls"],
				assets: [
					{
						id: "test-asset"
					}
				]
			}
		};

		// console.log(connectedAppComponent.debug());
		const connectedAppComponent = mount(
			<Provider store={store}><ConnectedApp qset={qset} /></Provider>
		);

		connectedAppComponent.componentDidMount = jest.fn();
		expect(connectedAppComponent.componentDidMount.calledOnce).to.equal(true);
	});
});
