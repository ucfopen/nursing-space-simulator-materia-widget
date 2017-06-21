// Helper function for loadGrid
const _getAssetInfo = function(gridValue) {
	if (gridValue === "0") return gridValue;

	const assetInfo = gridValue.split(".");

	return {
		id: assetInfo[0],
		rotation: parseInt(assetInfo[1])
	};
};

/**
 * Takes a string representation of a grid and creates a two dimensional array to
 * represent the grid.
 *
 * @param {string} gridString string representing the simulator grid system
 * @param {int} rows number of rows the grid should have
 * @param {int} columns number of columns the grid should have
 *
 * @return two dimensional array containing grid
 */
export function loadGrid(gridString, rows, columns) {
	let tempGrid = gridString.split(" ");
	let grid = new Array(rows);
	let counter = 0;

	for (let i = 0; i < rows; i++) {
		grid[i] = new Array(columns);
		for (let j = 0; j < columns; j++) {
			grid[i][j] = _getAssetInfo(tempGrid[counter++]);
		}
	}

	return grid;
}

/**
 * changes a cell rotation by 90 degrees
 *
 * @param {arary} grid json grid to be updated
 * @param {int} x x coordinate of gridcell to be rotated
 * @param {int} y y coordinate of gridcell to be rotated
 *
 * @return updated grid
 */
export function rotateCell(grid, x, y) {
	grid[x][y].rotation = (grid[x][y].rotation - 90) % 360;

	return grid;
}

/**
 * removes an item from a grid
 *
 * @param {array} grid json grid to be updated
 * @param {int} x coordinate of gridcell to delete item
 * @param {int} y coordinate of gridcell to delete item
 *
 * @return updated grid
 */
export function deleteItem(grid, x, y) {
	grid[x][y] = "0";

	return grid;
}

/**
 * inserts an item into a grid
 *
 * @param {array} grid 
 * @param {string} item item to be placed
 * @param {int} x coordinate of gridcell to insert item
 * @param {int} y coordinate of gridcell to insert item
 *
 * @return updated grid
 */
export function insertItem(grid, item, x, y) {
	grid[x][y] = {
		id: item,
		rotation: 180
	};

	return grid;
}
