import positionReducer from "../../src/js/reducers/positionReducer";
import * as actions from "../../src/js/actions/camera_actions";
import {
	INSERT_ASSET,
	EDIT_ASSET,
	DESELECT_ASSET
} from "../../src/js/actions/grid_actions";

describe("position reducer", () => {
	it("should return the inital state", () => {
		expect(
			positionReducer(
				// State being passed in
				undefined,
				// Action being passed in
				{}
			)
		).toEqual({
			prevX: 14.5,
			prevY: 18,
			prevZ: 9,
			x: 14.5,
			y: 18,
			z: 9,
			thirdPerson: true
		});
	});

	it("should handle CAMERA_UPDATE_POSITION", () => {
		jest.spyOn(Math, "random").mockReturnValue(1);
		const x = 10,
			y = 10,
			z = 10;

		let direction = "xRight";

		expect(
			positionReducer(
				// State being passed in
				{ x, y, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x: x + 2,
			y,
			z
		});

		direction = "xLeft";

		expect(
			positionReducer(
				// State being passed in
				{ x, y, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x: x - 2,
			y,
			z
		});

		direction = "yUp";

		expect(
			positionReducer(
				// State being passed in
				{ x, y, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x,
			y: y + 2,
			z
		});

		expect(
			positionReducer(
				// State being passed in
				{ x, y: 31, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x,
			y: 31,
			z
		});

		direction = "yDown";

		expect(
			positionReducer(
				// State being passed in
				{ x, y, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x,
			y: y - 2,
			z
		});

		expect(
			positionReducer(
				// State being passed in
				{ x, y: 4, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x,
			y: 4,
			z
		});

		direction = "zUp";

		expect(
			positionReducer(
				// State being passed in
				{ x, y, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x,
			y,
			z: z - 2
		});

		direction = "zDown";

		expect(
			positionReducer(
				// State being passed in
				{ x, y, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x,
			y,
			z: z + 2
		});

		direction = "reset";

		expect(
			positionReducer(
				// State being passed in
				{ x, y, z },
				// Action being passed in
				{
					type: actions.CAMERA_UPDATE_POSITION,
					payload: direction
				}
			)
		).toEqual({
			x: 14.5,
			y: 18.00001,
			z: 9
		});
	});

	it("should handle TOGGLE_THIRD_PERSON", () => {
		expect(
			positionReducer(
				// State being passed in
				{ prevX: 2.5, prevY: 18, prevZ: 14 },
				// Action being passed in
				{
					type: actions.TOGGLE_THIRD_PERSON
				}
			)
		).toEqual({
			thirdPerson: true,
			prevX: 2.5,
			prevY: 18,
			prevZ: 14,
			x: 2.5,
			y: 18,
			z: 14
		});
	});

	it("should handle INSERT_ASSET with the pov_camera asset id", () => {
		expect(
			positionReducer(
				// State being passed in
				[],
				// Action being passed in
				{
					type: INSERT_ASSET,
					payload: {
						assetId: "pov_camera",
						x: 1,
						z: 1
					}
				}
			)
		).toEqual({
			x: 1,
			y: 1,
			z: 1,
			thirdPerson: false
		});
	});

	it("should handle INSERT_ASSET with no asset id", () => {
		expect(
			positionReducer(
				// State being passed in
				{ x: 1, y: 1, z: 1 },
				// Action being passed in
				{
					type: INSERT_ASSET,
					payload: {
						x: 1,
						y: 1
					}
				}
			)
		).toEqual(
			{ x: 1, y: 1, z: 1 } // this is the state being passed in
		);
	});

	it("should handle EDIT_ASSET", () => {
		expect(
			positionReducer(
				// State being passed in
				{ x: 1, y: 1, z: 1 },
				// Action being passed in
				{
					type: EDIT_ASSET,
					payload: {
						x: 3,
						z: 3
					}
				}
			)
		).toEqual(
			{ x: 3, y: 6.5, z: 3, prevX: 1, prevY: 1, prevZ: 1 } // this is the state being passed in
		);
	});

	it("should handle DESELECT_ASSET if action.payload.restorePosition", () => {
		expect(
			positionReducer(
				// State being passed in
				{ prevX: 1, prevY: 1, prevZ: 1 },
				// Action being passed in
				{
					type: DESELECT_ASSET,
					payload: {
						restorePosition: true
					}
				}
			)
		).toEqual(
			{
				prevX: 1,
				prevY: 1,
				prevZ: 1,
				thirdPerson: true,
				x: 1,
				y: 1,
				z: 1
			} // this is the state being passed in
		);
	});

	it("should handle DESELECT_ASSET if action.payload.restorePosition", () => {
		expect(
			positionReducer(
				// State being passed in
				{ x: 1, y: 1, z: 1 },
				// Action being passed in
				{
					type: DESELECT_ASSET,
					payload: {
						restorePosition: false
					}
				}
			)
		).toEqual(
			{
				x: 1,
				y: 1,
				z: 1
			} // this is the state being passed in
		);
	});
});
