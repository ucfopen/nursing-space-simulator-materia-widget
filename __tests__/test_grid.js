import {
	getItemId,
	loadGrid,
	rotateCell,
	deleteItem,
	insertItem,
	isCellOccupied
} from "../src/js/grid";

describe("Grid Tests", () => {
	it("loads a grid", () => {
		let gridString = "0 0 0 0";
		const [gridLength, gridWidth] = [2, 2];

		let generatedGrid = loadGrid(gridString, gridLength, gridWidth);

		expect(generatedGrid.length).toEqual(2);
		expect(generatedGrid[0].length).toEqual(2);
		expect(generatedGrid[1].length).toEqual(2);

		gridString = "0 bed-1.0 0 chair.90";

		generatedGrid = loadGrid(gridString, gridLength, gridWidth);

		expect(generatedGrid[0][1]).toEqual({ id: "bed-1", rotation: 0 });
		expect(generatedGrid[1][1]).toEqual({ id: "chair", rotation: 90 });
	});

	it("rotates a cell", () => {
		let grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];

		grid = rotateCell(grid, 0, 1);
		expect(grid[0][1].rotation).toEqual(-90);

		grid = rotateCell(grid, 0, 1);
		expect(grid[0][1].rotation).toEqual(-180);

		grid = rotateCell(grid, 0, 1);
		expect(grid[0][1].rotation).toEqual(-270);

		grid = rotateCell(grid, 0, 1);
		expect(grid[0][1].rotation).toEqual(-0);

		grid = rotateCell(grid, 0, 1);
		expect(grid[0][1].rotation).toEqual(-90);
	});

	it("removes an item from the grid", () => {
		let grid = [["0", { id: "bed-1", rotation: 0 }], ["0", "0"]];

		grid = deleteItem(grid, 0, 1);
		expect(grid[0][1]).toEqual("0");

		grid = deleteItem(grid, 0, 0);
		expect(grid[0][1]).toEqual("0");
	});

	it("inserts an item to the grid", () => {
		let grid = [["0", "0"], ["0", "0"]];

		grid = insertItem(grid, "bed-1", 0, 1);
		expect(grid[0][1]).toEqual({ id: "bed-1", rotation: 180 });

		grid = insertItem(grid, "chair-1", 0, 1);
		expect(grid[0][1]).toEqual({ id: "chair-1", rotation: 180 });
	});

	it("knows if a cell is occupied", () => {
		let grid = [["0", { id: "bed-1", rotation: 180 }], ["0", "0"]];

		expect(isCellOccupied(grid, 0, 1)).toBe(true);

		expect(isCellOccupied(grid, 0, 0)).toBe(false);
	});

	it("returns correct item id", () => {
		let grid = [["0", { id: "bed-1", rotation: 180 }], ["0", "0"]];

		expect(getItemId(grid, 0, 1)).toEqual("bed-1");

		expect(getItemId(grid, 0, 0)).toBe("0");
	});
});
