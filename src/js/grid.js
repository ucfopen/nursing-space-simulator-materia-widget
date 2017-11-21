// Helper function for loadGrid that parses a string to an object
function _getAssetInfo(gridValue) {
	if (gridValue === "0") return gridValue;

	const assetInfo = gridValue.split(".");
	return {
		id: assetInfo[0],
		rotation: parseInt(assetInfo[1])
	};
}

// Sets walls that border the entire scene to face inward. Helps users add wall assets to those walls.
function _setInitialWallRotations(grid) {
	const height = grid.length;
	const width = grid[0].length;

	let rotation = 0;
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (grid[i][j] == "0") continue;
			rotation = 0;

			if (i == 0) grid[i][j].rotation = 270;
			else if (i == height - 1) grid[i][j].rotation = 90;
			if (j == 0) grid[i][j].rotation = 0;
			else if (j == width - 1) grid[i][j].rotation = 180;
		}
	}

	return grid;
}

function _isInBounds(grid, row, col) {
	if (row < 0 || row >= grid.length) return false;
	if (col < 0 || col >= grid[0].length) return false;

	return true;
}

/**
 * takes a string and creates a grid data structure that can be manipulated with the methods below
 *
 * @param {string} gridString string representation of the grid to be loaded
 * @param {int} rows number of rows in the grid
 * @param {int} columns number of columns in the grid
 *
 * @return array representation of the grid string
 */
export function loadGrid(gridString, rows, columns) {
	if (gridString === null || rows === null || columns === null) {
		return null;
	}

	let tempGrid = gridString.split(" ");
	return _setInitialWallRotations(
		[...Array(rows)].map(() => {
			return tempGrid.splice(0, columns).map(gridItem => {
				return _getAssetInfo(gridItem);
			});
		})
	);
}

/**
 * changes a cell rotation by 90 degrees
 *
 * @param {arary} grid grid to be updated
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 *
 * @return updated grid
 */
export function rotateCell(grid, x, z) {
	if (grid === null || x === null || z === null) {
		return null;
	}

	const col = x,
		row = z;

	if (grid[row][col] && grid[row][col] !== "0") {
		grid[row][col].rotation = (grid[row][col].rotation - 90) % 360;
	}

	return grid;
}

/**
 * removes an item from a grid
 *
 * @param {array} grid grid to be updated
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 *
 * @return updated grid
 */
export function deleteItem(grid, x, z) {
	if (grid === null || x === null || z === null) {
		return null;
	}

	const col = x,
		row = z;

	grid[row][col] = "0";

	return grid;
}

/**
 * inserts an item into a grid
 *
 * @param {array} grid grid to be updated
 * @param {string} itemId id of the item to be placed
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 * @param {int} rotation rotation of the item being placed
 *
 * @return updated grid
 */
export function insertItem(grid, itemId, x, z, rotation = 180) {
	if (grid === null || x === null || z === null) {
		return null;
	}

	const col = x,
		row = z;

	grid[row][col] =
		itemId === null
			? (grid[row][col] = "0")
			: {
					id: itemId,
					rotation: rotation
				};

	return grid;
}

/**
 * checks to see if an item is placed in a grid cell
 *
 * @param {array} grid grid to be checked
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 *
 * @return boolean
 */
export function isCellAvailable(grid, x, z) {
	if (grid === null || x === null || z === null) {
		return false;
	}

	const col = x,
		row = z;

	if (!_isInBounds(grid, row, col)) return false;

	return grid[row][col] === "0";
}

/**
 * returns the id of the item placed in a grid cell
 *
 * @param {array} grid grid to be checked
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 *
 * @return id of item in cell
 */
export function getItemId(grid, col, row) {
	if (grid === null || col === null || row === null) {
		return null;
	}

	return grid[row][col] === "0" ? "0" : grid[row][col].id;
}

/**
 * returns the id of the item placed in a grid cell
 *
 * @param {array} grid grid to be checked
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 *
 * @return rotation of item in cell
 */
export function getCellRotation(grid, col, row) {
	if (grid === null || col === null || row === null) {
		return null;
	}

	return grid[row][col] === "0" ? 180 : grid[row][col].rotation;
}
