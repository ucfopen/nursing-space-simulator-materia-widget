import React from "react";
import renderer from "react-test-renderer";
import { Entity } from "aframe-react";
import { shallow } from "enzyme";
import Aframe from "aframe";

import QsetAsset from "../../src/js/components/assets/qset_asset";

const mockClick = jest.fn();
const rotation = { x: 0, y: 0, z: 0 };

describe("QsetAsset tests", () => {
	it("renders a selected qset asset correctly", () => {
		let data = {
			id: "bed-1",
			tag: "a-obj-model",
			category: "beds",
			scale: { x: 1, y: 1, z: 1 }
		};

		const selectedQsetAssetWithoutWallsTree = renderer
			.create(
				<QsetAsset
					onClick={mockClick}
					data={data}
					isSelected={true}
					rotation={rotation}
					x={1}
					z={1}
				/>
			)
			.toJSON();

		expect(selectedQsetAssetWithoutWallsTree).toMatchSnapshot();
	});

	it("renders a selected qset asset correctly", () => {
		let data = {
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
					isSelected={false}
					rotation={rotation}
					x={1}
					z={1}
				/>
			)
			.toJSON();

		expect(nonSelectedQsetAssetWithWallsTree).toMatchSnapshot();
	});

	it("does not add material source to selected assets", () => {
		let data = {
			id: "bed-1",
			tag: "a-obj-model",
			category: "beds",
			scale: { x: 1, y: 1, z: 1 }
		};

		const nonSelectedQsetAssetWithWalls = shallow(
			<QsetAsset
				onClick={mockClick}
				data={data}
				isSelected={true}
				rotation={rotation}
				x={1}
				z={1}
			/>
		);

		expect(
			nonSelectedQsetAssetWithWalls.props("obj-model")["obj-model"]
		).toEqual(`obj: #${data.id}-obj;`);
	});

	it("adds material source to non-selected assets", () => {
		let data = {
			id: "bed-1",
			tag: "a-obj-model",
			category: "beds",
			scale: { x: 1, y: 1, z: 1 }
		};

		const nonSelectedQsetAssetWithWalls = shallow(
			<QsetAsset
				onClick={mockClick}
				data={data}
				isSelected={false}
				rotation={rotation}
				x={1}
				z={1}
			/>
		);

		expect(
			nonSelectedQsetAssetWithWalls.props("obj-model")["obj-model"]
		).toEqual(`obj: #${data.id}-obj;mtl: #${data.id}-mtl;`);
	});
});
