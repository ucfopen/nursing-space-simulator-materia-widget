import React from "react";
import renderer from "react-test-renderer";
import { Entity } from "aframe-react";
import Aframe from "aframe";

import QsetAsset from "../../src/js/components/assets/qset_asset";

describe("QsetAsset tests", () => {
	it("renders a qset asset correctly", () => {
		const mockClick = jest.fn();

		let assetIsSelected = false;
		let data = {
			id: "bed-1",
			tag: "a-obj-model",
			category: "beds",
			scale: { x: 1, y: 1, z: 1 }
		};
		const rotation = { x: 0, y: 0, z: 0 };

		const selectedQsetAssetWithoutWallsTree = renderer
			.create(
				<QsetAsset
					onClick={mockClick}
					data={data}
					isSelected={assetIsSelected}
					rotation={rotation}
					x={1}
					z={1}
				/>
			)
			.toJSON();

		expect(selectedQsetAssetWithoutWallsTree).toMatchSnapshot();

		assetIsSelected = true;
		data = {
			id: "wall-1",
			tag: "a-obj-model",
			category: "walls",
			scale: { x: 1, y: 1, z: 1 }
		};

		const nonSelectedQsetAssetWithWallsTree = renderer
			.create(
				<QsetAsset
					onClick={mockClick}
					data={data}
					isSelected={assetIsSelected}
					rotation={rotation}
					x={1}
					z={1}
				/>
			)
			.toJSON();

		expect(nonSelectedQsetAssetWithWallsTree).toMatchSnapshot();

		expect(selectedQsetAssetWithoutWallsTree).not.toEqual(
			nonSelectedQsetAssetWithWallsTree
		);
	});
});
