import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import AssetButton from "../../src/js/components/ui/asset_button";

// Constants used across all tests
const item = {
	buttonSource: "/images/test.jpg",
	category: "beds",
	id: "bed-1",
	title: "Bed-1"
};

let clickEventMock = jest.fn();


describe("Asset Button Tests", () => {
	test("renders asset button", () => {
		const tree = renderer
			.create(<AssetButton onClick={clickEventMock} item={item} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	test("handles click", () => {
		const assetButton = shallow(
			<AssetButton onClick={clickEventMock} item={item} />
		);

		assetButton.find("button").simulate("click");

		expect(clickEventMock).toBeCalled();
	});
});
