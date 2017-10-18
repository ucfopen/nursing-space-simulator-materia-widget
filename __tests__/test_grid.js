import * as gridFunctions from "../src/js/grid";

const gridString =
	"wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 0 bed-1.0 0 wall-1.0 wall-1.0 chair-1.-90 0 0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0";
const grid = [
	[
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 }
	],
	[
		{ id: "wall-1", rotation: 0 },
		"0",
		{ id: "bed-1", rotation: 0 },
		"0",
		{ id: "wall-1", rotation: 0 }
	],
	[
		{ id: "wall-1", rotation: 0 },
		{ id: "chair-1", rotation: -90 },
		"0",
		"0",
		{ id: "wall-1", rotation: 0 }
	],
	[
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 },
		{ id: "wall-1", rotation: 0 }
	]
];

describe("test grid functions", () => {
	it("loads a grid correctly", () => {
		let newGrid;

		newGrid = gridFunctions.loadGrid(gridString, 4, 5);
		expect(JSON.stringify(newGrid)).toEqual(JSON.stringify(grid));

		newGrid = gridFunctions.loadGrid(null, 4, 5);
		expect(newGrid).toEqual(null);

		newGrid = gridFunctions.loadGrid(gridString, null, 5);
		expect(newGrid).toEqual(null);

		newGrid = gridFunctions.loadGrid(gridString, 4, null);
		expect(newGrid).toEqual(null);

		newGrid = gridFunctions.loadGrid(null, null, null);
		expect(newGrid).toEqual(null);
	});

	it("rotates a cell correctly", () => {
		let rotatedGrid;

		rotatedGrid = gridFunctions.rotateCell(
			JSON.parse(JSON.stringify(grid)),
			0,
			1
		);
		expect(rotatedGrid[1][0].rotation).toEqual(-90);

		rotatedGrid = gridFunctions.rotateCell(
			JSON.parse(JSON.stringify(grid)),
			1,
			2
		);
		expect(rotatedGrid[2][1].rotation).toEqual(-180);

		rotatedGrid = gridFunctions.rotateCell(
			JSON.parse(JSON.stringify(grid)),
			1,
			1
		);
		expect(JSON.stringify(rotatedGrid)).toEqual(JSON.stringify(grid));

		rotatedGrid = gridFunctions.rotateCell(null, null, null);
		expect(rotatedGrid).toEqual(null);
	});

	it("deletes an item from the grid", () => {
		let deletedGrid;

		deletedGrid = gridFunctions.deleteItem(
			JSON.parse(JSON.stringify(grid)),
			1,
			0
		);

		expect(deletedGrid[0][1]).toEqual("0");

		deletedGrid = gridFunctions.deleteItem(null, 0, 1);
		expect(deletedGrid).toEqual(null);

		deletedGrid = gridFunctions.deleteItem(
			JSON.parse(JSON.stringify(grid)),
			null,
			1
		);
		expect(deletedGrid).toEqual(null);

		deletedGrid = gridFunctions.deleteItem(
			JSON.parse(JSON.stringify(grid)),
			0,
			null
		);
		expect(deletedGrid).toEqual(null);

		deletedGrid = gridFunctions.deleteItem(null, null, null);
		expect(deletedGrid).toEqual(null);
	});

	it("inserts an item to the grid", () => {
		let insertedGrid;

		insertedGrid = gridFunctions.insertItem(
			JSON.parse(JSON.stringify(grid)),
			"iv",
			1,
			1
		);
		expect(insertedGrid[1][1].rotation).toEqual(180);
		expect(insertedGrid[1][1].id).toEqual("iv");

		insertedGrid = gridFunctions.insertItem(
			JSON.parse(JSON.stringify(grid)),
			"bed-1",
			0,
			2,
			-90
		);
		expect(insertedGrid[2][0].rotation).toEqual(-90);
		expect(insertedGrid[2][0].id).toEqual("bed-1");

		insertedGrid = gridFunctions.insertItem(
			JSON.parse(JSON.stringify(grid)),
			null,
			1,
			1
		);
		expect(insertedGrid[1][1]).toEqual("0");

		insertedGrid = gridFunctions.insertItem(null, "iv", 1, 1);
		expect(insertedGrid).toEqual(null);

		insertedGrid = gridFunctions.insertItem(
			JSON.parse(JSON.stringify(grid)),
			"iv",
			null,
			1
		);
		expect(insertedGrid).toEqual(null);

		insertedGrid = gridFunctions.insertItem(
			JSON.parse(JSON.stringify(grid)),
			"iv",
			1,
			null
		);
		expect(insertedGrid).toEqual(null);

		insertedGrid = gridFunctions.insertItem(null, null, null, null);
		expect(insertedGrid).toEqual(null);
	});

	it("can check if a cell is available", () => {
		let isCellAvailable;

		isCellAvailable = gridFunctions.isCellAvailable(null, 0, 1);
		expect(isCellAvailable).toBe(false);

		isCellAvailable = gridFunctions.isCellAvailable(
			JSON.parse(JSON.stringify(grid)),
			null,
			1
		);
		expect(isCellAvailable).toBe(false);

		isCellAvailable = gridFunctions.isCellAvailable(
			JSON.parse(JSON.stringify(grid)),
			0,
			null
		);
		expect(isCellAvailable).toBe(false);

		isCellAvailable = gridFunctions.isCellAvailable(
			JSON.parse(JSON.stringify(grid)),
			1,
			0
		);
		expect(isCellAvailable).toBe(false);

		isCellAvailable = gridFunctions.isCellAvailable(
			JSON.parse(JSON.stringify(grid)),
			1,
			1
		);
		expect(isCellAvailable).toBe(true);
	});

	it("can get the item id of a cell", () => {
		let itemId;

		itemId = gridFunctions.getItemId(null, 0, 1);
		expect(itemId).toEqual(null);

		itemId = gridFunctions.getItemId(JSON.parse(JSON.stringify(grid)), null, 1);
		expect(itemId).toEqual(null);

		itemId = gridFunctions.getItemId(JSON.parse(JSON.stringify(grid)), 0, null);
		expect(itemId).toEqual(null);

		itemId = gridFunctions.getItemId(null, null, null);
		expect(itemId).toEqual(null);

		itemId = gridFunctions.getItemId(JSON.parse(JSON.stringify(grid)), 0, 1);
		expect(itemId).toEqual("wall-1");

		itemId = gridFunctions.getItemId(JSON.parse(JSON.stringify(grid)), 1, 1);
		expect(itemId).toEqual("0");
	});

	it("can get the item id of a cell", () => {
		let itemRotation;

		itemRotation = gridFunctions.getCellRotation(null, 0, 1);
		expect(itemRotation).toEqual(null);

		itemRotation = gridFunctions.getCellRotation(
			JSON.parse(JSON.stringify(grid)),
			null,
			1
		);
		expect(itemRotation).toEqual(null);

		itemRotation = gridFunctions.getCellRotation(
			JSON.parse(JSON.stringify(grid)),
			0,
			null
		);
		expect(itemRotation).toEqual(null);

		itemRotation = gridFunctions.getCellRotation(null, null, null);
		expect(itemRotation).toEqual(null);

		itemRotation = gridFunctions.getCellRotation(
			JSON.parse(JSON.stringify(grid)),
			1,
			0
		);
		expect(itemRotation).toEqual(0);

		itemRotation = gridFunctions.getCellRotation(
			JSON.parse(JSON.stringify(grid)),
			1,
			2
		);
		expect(itemRotation).toEqual(-90);
	});
});
