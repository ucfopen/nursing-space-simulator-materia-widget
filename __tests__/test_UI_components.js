import React from "react";
import renderer from "react-test-renderer";
import AssetButton from "../src/js/components/ui/asset_button";

import ConfirmSVG from "../src/js/components/assets/icon-svgs/confirm";
import DeleteSVG from "../src/js/components/assets/icon-svgs/delete";
import DeselectSVG from "../src/js/components/assets/icon-svgs/deselect";
import DownArrowSVG from "../src/js/components/assets/icon-svgs/down_arrow";
import LeftArrowSVG from "../src/js/components/assets/icon-svgs/left_arrow";
import RightArrowSVG from "../src/js/components/assets/icon-svgs/right_arrow";
import RotateSVG from "../src/js/components/assets/icon-svgs/rotate";
import ScreenshotSVG from "../src/js/components/assets/icon-svgs/screenshot";
import UpArrowSVG from "../src/js/components/assets/icon-svgs/up_arrow";
import ZoomInSVG from "../src/js/components/assets/icon-svgs/zoom_in";
import ZoomOutSVG from "../src/js/components/assets/icon-svgs/zoom_out";

describe("UI components", () => {
	it("renders asset button", () => {
		const item = {
			buttonSource: "/images/test.jpg",
			category: "beds",
			id: "bed-1",
			title: "Bed-1"
		};

		const tree = renderer
			.create(<AssetButton onClick={() => {}} item={item} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders svg components", () => {
		let tree;

		tree = renderer.create(<ConfirmSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<DeleteSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<DeselectSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<DownArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<LeftArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<RightArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<RotateSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<ScreenshotSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<UpArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<ZoomInSVG />).toJSON();
		expect(tree).toMatchSnapshot();

		tree = renderer.create(<ZoomOutSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
