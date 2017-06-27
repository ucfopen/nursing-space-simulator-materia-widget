// Helper function for loadGrid that parses a string to an object
function getAssetInfo(gridValue) {
	if (gridValue === "0") return gridValue;

	const assetInfo = gridValue.split(".");
	return {
		id: assetInfo[0],
		rotation: parseInt(assetInfo[1])
	};
}

export function loadGrid(gridString, rows, columns) {
	let tempGrid = gridString.split(" ");
	return [...Array(rows)].map(() => {
		return tempGrid.splice(0, columns).map(gridItem => {
			return getAssetInfo(gridItem);
		});
	});
}

/**
 * changes a cell rotation by 90 degrees
 *
 * @param {arary} grid grid to be updated
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
 * @param {array} grid grid to be updated
 * @param {int} x x coordinate of gridcell to delete item
 * @param {int} y y coordinate of gridcell to delete item
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
 * @param {array} grid grid to be updated
 * @param {string} item item to be placed
 * @param {int} x x coordinate of gridcell to insert item
 * @param {int} y y coordinate of gridcell to insert item
 *
 * @return updated grid
 */
export function insertItem(grid, itemId, x, y, rotation = 180) {
	grid[x][y] = {
		id: itemId,
		rotation: rotation
	};

	return grid;
}

/**
 * checks to see if an item is placed in a grid cell
 *
 * @param {array} grid grid to be checked
 * @param {int} x x coordinate of gridcell to be checked
 * @param {int} y y coordinate of gridcell to be checked
 *
 * @ return boolean
 */
export function isCellAvailable(grid, x, y) {
	return grid[x][y] === "0";
}

export function getItemId(grid, x, y) {
	return grid[x][y] === "0" ? "0" : grid[x][y].id;
}
