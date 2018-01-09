// Helper function for loadGrid that parses a string to an object
function _getAssetInfo(gridValue) {
	if (gridValue === "0") return gridValue;

	const assetInfo = gridValue.split(".");

	return {
		id: assetInfo[0],
		rotation: parseInt(assetInfo[1]),
		stickers: assetInfo.length == 3 ? assetInfo[2].split(",") : null
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
	//return _setInitialWallRotations(
	return (
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
		grid[row][col].rotation = (grid[row][col].rotation - 90 + 360) % 360;
	}

	// rotates the stickers, if available
	if (grid[row][col].stickers)
		grid[row][col].stickers.unshift(grid[row][col].stickers.pop())

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
export function insertItem(grid, itemId, x, z, rotation = 180, stickers = null) {
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
					rotation: rotation,
					stickers: stickers
				};

	// check adjacent spots for stickers to remove if necessary
	if (["wall-1", "door-1", "window"].includes(itemId))
	{
		for (let side = 0; side < 4; side++)
		{
			let adjItem = getItemId(grid, x + 2 - side, z);
			if (side % 2 == 0) {
				adjItem = getItemId(grid, x, z + side - 1);
			}
			if (["wall-1", "door-1", "window"].includes(adjItem))
			{
				if (side % 2 == 0)
					getStickers(grid, x, z + side - 1, true)
				else
					getStickers(grid, x + 2 - side, z, true);
			}
		}
	}

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
 * @return id of item in cell, "0" if it is is out of bounds
 */
export function getItemId(grid, col, row) {
	if (grid === null || col === null || row === null) {
		return null;
	}

	if (!_isInBounds(grid, row, col)) return "0";

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

/**
 * returns two lists of valid X and Z coordinates for a wall to be extended
 * from a given point
 *
 * @param {array} grid grid to be checked
 * @param {int} x the x-component of the wall to be extended
 * @param {int} z the z-component of the wall to be extended
 *
 * @return two lists for valid X and Z points
 */
export function findValidExtends(grid, x, z) {
	let validX = [x];
	let validZ = [z];
	// Valid direction array in order: up, right, bottom, left
	// In third-person view, Z is the horizontal axis, X is vertical
	let dir = [true, true, true, true];
	let level = 1;
	while (dir[0] || dir[1] || dir[2] || dir[3])
	{
		if (dir[0]) // up
		{
			if (isCellAvailable(grid, x + level, z))
				validX.push(x + level);
			else
				dir[0] = false;
		}
		if (dir[1]) // right
		{
			if (isCellAvailable(grid, x, z + level))
				validZ.push(z + level);
			else
				dir[1] = false;
		}
		if (dir[2]) // down
		{
			if (isCellAvailable(grid, x - level, z))
				validX.push(x - level);
			else
				dir[2] = false;
		}
		if (dir[3]) // left
		{
			if (isCellAvailable(grid, x, z - level))
				validZ.push(z - level);
			else
				dir[3] = false;
		}
		level++;
	}
	return [validX, validZ];
}

export function insertWalls(grid, startX, startZ, endX, endZ) {
	// If moving in the Z direction
	if (startX == endX)
	{
		let x = endX;
		let z = Math.min(startZ, endZ);
		let end = Math.max(startZ, endZ);
		while (z <= end)
		{
			if (z != startZ)
				grid = insertItem(grid, "wall-1", x, z, 0);
			z++;
		}
	}
	else
	{
		let z = endZ;
		let x = Math.min(startX, endX);
		let end = Math.max(startX, endX);
		while (x <= end)
		{
			if (x != startX)
				grid = insertItem(grid, "wall-1", x, z, 0);
			x++;
		}
	}
	return grid;
}

export function getStickers(grid, x, z, checkAdj) {
	if (!grid[z][x].stickers)
		grid[z][x].stickers = ["0", "0", "0", "0"];

	if (checkAdj)
	{
		// Check adjacent spots for a wall and remove the sticker if necessary
		for (let side = 0; side < 4; side++)
		{
			let adjItem = getItemId(grid, x + 2 - side, z);
			if (side % 2 == 0) {
				adjItem = getItemId(grid, x, z + side - 1);
			}

			// The "X" is a flag to show that a sticker cannot go on this side
			if (adjItem != "0" && ["wall-1", "door-1", "window"].includes(adjItem)) {
				grid[z][x].stickers[side] = "X";
			}
			else if (grid[z][x].stickers[side] == "X") {
				grid[z][x].stickers[side] = "0"
			}
		}
	}

	return grid[z][x].stickers;
}

export function setSticker(grid, x, z, side, sticker) {
	if (grid[z][x].stickers == null)
		grid[z][x].stickers = ["0", "0", "0", "0"];

	grid[z][x].stickers[side] = sticker;
	return grid;
}
