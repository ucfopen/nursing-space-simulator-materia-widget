import positionReducer from "../../src/js/reducers/positionReducer";
import * as actions from "../../src/js/actions/camera_actions";

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

	it("should handle CAMERA_TOGGLE", () => {
		let thirdPerson = true;

		expect(
			positionReducer(
				// State being passed in
				{ thirdPerson },
				// Action being passed in
				{
					type: actions.CAMERA_TOGGLE
				}
			)
		).toEqual({
			thirdPerson: false
		});

		thirdPerson = false;

		expect(
			positionReducer(
				// State being passed in
				{ thirdPerson },
				// Action being passed in
				{
					type: actions.CAMERA_TOGGLE
				}
			)
		).toEqual({
			thirdPerson: true
		});
	});
});
