import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

import CategoryButton from "../../src/js/components/ui/category_button";

// Constants used across all tests
const mockClick = jest.fn();

describe("Category button tests", () => {
	it("renders correctly", () => {
		const categoryButtonTree = renderer
			.create(<CategoryButton category="beds" onClick={mockClick} />)
			.toJSON();

		expect(categoryButtonTree).toMatchSnapshot();
	});

	it("renders correctly if category == currentCategory", () => {
		const categoryButtonTree = renderer
			.create(
				<CategoryButton
					category="beds"
					currentCategory="beds"
					onClick={mockClick}
				/>
			)
			.toJSON();

		expect(categoryButtonTree).toMatchSnapshot();
	});

	it("handles click correctly", () => {
		const categoryButton = shallow(
			<CategoryButton category="beds" onClick={mockClick} />
		);

		categoryButton.find("button").simulate("click");
		expect(mockClick).toBeCalled();
	});
});
