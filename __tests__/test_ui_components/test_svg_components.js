import React from "react";
import renderer from "react-test-renderer";

import ConfirmSVG from "../../src/js/components/assets/icon-svgs/confirm";
import DeleteSVG from "../../src/js/components/assets/icon-svgs/delete";
import DeselectSVG from "../../src/js/components/assets/icon-svgs/deselect";
import DownArrowSVG from "../../src/js/components/assets/icon-svgs/down_arrow";
import LeftArrowSVG from "../../src/js/components/assets/icon-svgs/left_arrow";
import RightArrowSVG from "../../src/js/components/assets/icon-svgs/right_arrow";
import RotateSVG from "../../src/js/components/assets/icon-svgs/rotate";
import ScreenshotSVG from "../../src/js/components/assets/icon-svgs/screenshot";
import UpArrowSVG from "../../src/js/components/assets/icon-svgs/up_arrow";
import ZoomInSVG from "../../src/js/components/assets/icon-svgs/zoom_in";
import ZoomOutSVG from "../../src/js/components/assets/icon-svgs/zoom_out";

describe("SVG Components test", () => {
	it("renders ConfirmSVG correctly", () => {
		const tree = renderer.create(<ConfirmSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders DeleteSVG correctly", () => {
		const tree = renderer.create(<DeleteSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders DeselectSVG correctly", () => {
		const tree = renderer.create(<DeselectSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders DownArrowSVG correctly", () => {
		const tree = renderer.create(<DownArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders LeftArrowSVG correctly", () => {
		const tree = renderer.create(<LeftArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders RightArrowSVG correctly", () => {
		const tree = renderer.create(<RightArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders RotateSVG correctly", () => {
		const tree = renderer.create(<RotateSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders ScreenshotSVG correctly", () => {
		const tree = renderer.create(<ScreenshotSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders UpArrowSVG correctly", () => {
		const tree = renderer.create(<UpArrowSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders ZoomInSVG correctly", () => {
		const tree = renderer.create(<ZoomInSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders ZoomOutSVG correctly", () => {
		const tree = renderer.create(<ZoomOutSVG />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
