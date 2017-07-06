import positionReducer from "../../src/js/reducers/positionReducer";
import * as actions from "../../src/js/actions/camera_actions";
import { INSERT_ASSET } from "../../src/js/actions/grid_actions";

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
			x: 2.5,
			y: 18,
			z: 14,
			thirdPerson: true
		});
	});

	it("should handle CAMERA_UPDATE_POSITION", () => {
		const x = 10,
			y = 10,
			z = 10;

		let direction = "xUp";

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
			x: x + 1,
			y,
			z
		});

		direction = "xDown";

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
			x: x - 1,
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
			y: y + 1,
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
			y: y - 1,
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
			z: z - 1
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
			z: z + 1
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
			x,
			y: 2,
			z
		});
	});

	it("should handle TOGGLE_THIRD_PERSON", () => {
		expect(
			positionReducer(
				// State being passed in
				[],
				// Action being passed in
				{
					type: actions.TOGGLE_THIRD_PERSON
				}
			)
		).toEqual({
			thirdPerson: true,
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
						y: 1
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
				[],
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
			[] // this is the state being passed in
		);
	});

	it("should handle INSERT_ASSET with any asset id that is not pov_camera", () => {
		expect(
			positionReducer(
				// State being passed in
				[],
				// Action being passed in
				{
					type: INSERT_ASSET,
					payload: {
						assetId: "bed-1",
						x: 1,
						y: 1
					}
				}
			)
		).toEqual(
			[] // this is the state being passed in
		);
	});
});
