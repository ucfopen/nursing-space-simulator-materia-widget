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

export function isInBounds(grid, row, col) {
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
	return [...Array(rows)].map(() => {
		return tempGrid.splice(0, columns).map(gridItem => {
			return _getAssetInfo(gridItem);
		});
	});
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

	if (grid[row][col] && grid[row][col] !== "0" && grid[row][col] !== "X") {
		const rotationNew = (grid[row][col].rotation - 90 + 360) % 360;

		// check the span of the asset, currenly only supports X-span of 2
		const id = grid[row][col].id;
		if (id && HS_ASSETS[id].spanX == 2) {
			const adjSideNew = 3 - ((rotationNew + 180) % 360) / 90;
			const adjXNew = adjSideNew % 2 == 0 ? x : x + 2 - adjSideNew;
			const adjZNew = adjSideNew % 2 == 0 ? z + adjSideNew - 1 : z;

			const rotationOld = grid[row][col].rotation;
			const adjSideOld = 3 - ((rotationOld + 180) % 360) / 90;
			const adjXOld = adjSideOld % 2 == 0 ? x : x + 2 - adjSideOld;
			const adjZOld = adjSideOld % 2 == 0 ? z + adjSideOld - 1 : z;

			if (grid[adjZOld][adjXOld] == "X") {
				grid[adjZOld][adjXOld] = "0";
			}

			if (!isCellAvailable(grid, adjXNew, adjZNew)) {
				// if unable to rotate it, continue trying until either it works
				// or it's back where it started
				grid[row][col].rotation = rotationNew;
				return rotateCell(grid, x, z);
			}

			grid[adjZNew][adjXNew] = "X";
		}

		grid[row][col].rotation = rotationNew;
	}

	// rotates the stickers, if available
	if (grid[row][col].stickers) {
		grid[row][col].stickers.unshift(grid[row][col].stickers.pop());
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

	if (grid[row][col] && grid[row][col] != "0" && grid[row][col] != "X") {
		// check the span of the asset, currenly only supports X-span of 2
		const id = grid[row][col].id;
		if (id && HS_ASSETS[id].spanX == 2) {
			const rotation = grid[row][col].rotation;
			const adjSide = 3 - ((rotation + 180) % 360) / 90;
			const adjX = adjSide % 2 == 0 ? x : x + 2 - adjSide;
			const adjZ = adjSide % 2 == 0 ? z + adjSide - 1 : z;
			if (grid[adjZ][adjX] == "X") {
				grid[adjZ][adjX] = "0";
			}
		}
	}

	grid[row][col] = "0";

	return grid;
}

/**
 * deletes multiple items from the grid
 *
 * @param {int} counter counter for outer for loop
 * @param {int} stopper stopping condition for outer for loop
 * @param {int} innerCounter counter for inner for loop
 * @param {int} innerStopper stopping condition for inner for loop
 * @param {int} innerCounterReset saved value for innerCounter when leaving the inner for loop
 * @param {array} grid grid to be updated
 *
 * @return updated grid
 */
export function massDelete(
	counter,
	stopper,
	innerCounter,
	innerStopper,
	innerCounterReset,
	grid
) {
	for (counter; counter <= stopper; counter++) {
		for (innerCounter; innerCounter <= innerStopper; innerCounter++) {
			grid[counter][innerCounter] = "0";
		}
		innerCounter = innerCounterReset;
	}
	return grid;
}

/**
 * deletes multiple items from the grid
 *
 * @param {int} counter counter for outer for loop
 * @param {int} stopper stopping condition for outer for loop
 * @param {int} innerCounter counter for inner for loop
 * @param {int} innerStopper stopping condition for inner for loop
 * @param {int} innerCounterReset saved value for innerCounter when leaving the inner for loop
 * @param {array} grid grid to be updated
 *
 * @return updated grid
 */
export function massSelect(
	counter,
	stopper,
	innerCounter,
	innerStopper,
	innerCounterReset,
	grid
) {
	var multipleZArray = [];
	var multipleXArray = [];
	for (counter; counter <= stopper; counter++) {
		for (innerCounter; innerCounter <= innerStopper; innerCounter++) {
			if (grid[counter][innerCounter] != "0") {
				multipleZArray.push(counter);
				multipleXArray.push(innerCounter);
			}
		}
		innerCounter = innerCounterReset;
	}
	return [multipleZArray, multipleXArray];
}

/**
 * arranges assetArray order to avoid error when moving multiple assets
 *
 * @param {array} multipleX array that holds the x values for the selected assets
 * @param {array} multipleZ array that holds the z values for the selected assets
 * @param {array} assets array that holds currently selected assets
 * @param {string} direction direction in which the assets are being moved
 *
 * @return array included sorted arrays of assets
 */
export function arrangeItems(multipleX, multipleZ, assets, direction) {
	//combine arrays
	var items = [];
	for (var i = 0; i < assets.length; i++) {
		items.push({ x: multipleX[i], z: multipleZ[i], asset: assets[i] });
	}

	switch (direction) {
		case "xRight":
			items.sort(function(a, b) {
				return a.x > b.x ? -1 : a.x == b.x ? 0 : 1;
			});
			break;
		case "xLeft":
			items.sort(function(a, b) {
				return a.x < b.x ? -1 : a.x == b.x ? 0 : 1;
			});
			break;
		case "zUp":
			items.sort(function(a, b) {
				return a.z < b.z ? -1 : a.z == b.z ? 0 : 1;
			});
			break;
		case "zDown":
			items.sort(function(a, b) {
				return a.z > b.z ? -1 : a.z == b.z ? 0 : 1;
			});
			break;
	}

	//separate the arrays
	for (var j = 0; j < items.length; j++) {
		multipleX[j] = items[j].x;
		multipleZ[j] = items[j].z;
		assets[j] = items[j].asset;
	}
	return [multipleX, multipleZ, assets];
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
export function insertItem(
	grid,
	itemId,
	x,
	z,
	rotation = 180,
	stickers = null
) {
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

	// if an asset spans multiple spaces, flag those spaces as occupied
	if (itemId && HS_ASSETS[itemId].spanX == 2) {
		const adjSide = 3 - ((rotation + 180) % 360) / 90;
		const adjX = adjSide % 2 == 0 ? x : x + 2 - adjSide;
		const adjZ = adjSide % 2 == 0 ? z + adjSide - 1 : z;
		if (isCellAvailable(grid, adjX, adjZ)) {
			grid[adjZ][adjX] = "X";
		}
	}

	// check adjacent spots for stickers to remove if necessary
	if (["wall-1", "door-1", "window"].includes(itemId)) {
		grid = updateStickers(grid, x, z, false);
	}

	return grid;
}

/**
 * checks to see if an item is placed in a grid cell
 *
 * @param {array} grid grid to be checked
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 * @param {int} adjSide adjacent side to be checked as well, if included
 *
 * @return boolean
 */
export function isCellAvailable(grid, x, z, adjSide = null, direction = null) {
	if (grid === null || x === null || z === null || isNaN(x) || isNaN(z)) {
		return false;
	}

	if (direction == "xLeft" && adjSide != null) {
		var col = x - 1,
			row = z;
	} else {
		var col = x,
			row = z;
	}

	if ((direction == "zUp" || direction == "zDown") && adjSide != null) {
		return grid[row][col] == "0" && grid[row][col - 1] == "0";
	}

	if (!isInBounds(grid, row, col)) return false;

	if (grid[row][col].id == "desk" || grid[row][col].id == "bed-1") {
		return true;
	}

	return grid[row][col] === "0";
}

/**
 * returns the item placed in a grid cell
 *
 * @param {array} grid grid to be checked
 * @param {int} col column of gridcell to be checked
 * @param {int} row row of gridcell to be checked
 *
 * @return item in cell, "0" if it is is out of bounds
 */
export function getItem(grid, col, row) {
	if (grid === null || col === null || row === null) {
		return null;
	}

	if (!isInBounds(grid, row, col)) return "0";

	return grid[row][col] === "0" ? "0" : grid[row][col];
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

	if (!isInBounds(grid, row, col)) return "0";

	if (grid[row][col] === "0" || grid[row][col] === "X") {
		return grid[row][col];
	}

	return grid[row][col].id;
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

	if (grid[row][col] === "0" || grid[row][col] === "X") {
		return 180;
	}

	return grid[row][col].rotation;
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
	// Valid direction array in order: up, right, down, left
	let dir = [true, true, true, true];
	let level = 1;
	while (dir[0] || dir[1] || dir[2] || dir[3]) {
		if (dir[0]) {
			// up
			if (isCellAvailable(grid, x, z - level)) validZ.push(z - level);
			else dir[0] = false;
		}
		if (dir[1]) {
			// right
			if (isCellAvailable(grid, x + level, z)) validX.push(x + level);
			else dir[1] = false;
		}
		if (dir[2]) {
			// down
			if (isCellAvailable(grid, x, z + level)) validZ.push(z + level);
			else dir[2] = false;
		}
		if (dir[3]) {
			// left
			if (isCellAvailable(grid, x - level, z)) validX.push(x - level);
			else dir[3] = false;
		}
		level++;
	}
	return [validX, validZ];
}

/**
 * Wall Extend: fills walls from given start to given end
 *
 * @param {array} grid initial grid to fill in to
 * @param {int} startX the x-component of the wall to be extended
 * @param {int} startZ the z-component of the wall to be extended
 * @param {int} endX the x-component of place selected to fill to
 * @param {int} endZ the z-component of place selected to fill to
 *
 * @return new grid with inserted walls
 */
export function insertWalls(grid, startX, startZ, endX, endZ) {
	// If moving in the Z direction
	if (startX == endX) {
		let x = endX;
		let z = Math.min(startZ, endZ);
		let end = Math.max(startZ, endZ);
		while (z <= end) {
			if (z != startZ) grid = insertItem(grid, "wall-1", x, z, 0);
			z++;
		}
	} else {
		let z = endZ;
		let x = Math.min(startX, endX);
		let end = Math.max(startX, endX);
		while (x <= end) {
			if (x != startX) grid = insertItem(grid, "wall-1", x, z, 0);
			x++;
		}
	}
	return grid;
}

/**
 * returns the stickers for a given element, if checkAdj is true,
 * it will check adjacent spaces and flag sides that are adjacent
 * to another wall
 *
 * @param {array} grid initial grid
 * @param {int} x the x-component of the item
 * @param {int} z the z-component of the item
 * @param {boolean} checkAdj whether to check adjacent spaces and set flags
 *
 * @return stickers at given point
 */
export function getStickers(grid, x, z, checkAdj) {
	if (!grid[z][x].stickers) grid[z][x].stickers = ["0", "0", "0", "0"];

	if (checkAdj) {
		grid = updateStickers(grid, x, z, false);
	}

	return grid[z][x].stickers;
}

/**
 * checks adjacent spaces and flags sides that are adjacent
 * to another wall, updates previously flagged sides
 *
 * @param {array} grid initial grid
 * @param {int} x the x-component of the item
 * @param {int} z the z-component of the item
 * @param {boolean} createNew whether to create stickers array if it doesn't exist
 *
 * @return updated grid
 */
export function updateStickers(grid, x, z, createNew) {
	if (createNew && !grid[z][x].stickers)
		grid[z][x].stickers = ["0", "0", "0", "0"];

	for (let side = 0; side < 4; side++) {
		const adjX = side % 2 == 0 ? x : x + 2 - side;
		const adjZ = side % 2 == 0 ? z + side - 1 : z;
		let adjItem = getItemId(grid, adjX, adjZ);

		if (
			adjItem != "0" &&
			["wall-1", "door-1", "window"].includes(adjItem)
		) {
			// The "X" is a flag to show that a sticker cannot go on this side
			if (grid[z][x].stickers) {
				grid[z][x].stickers[side] = "X";
			}

			// Also update the adjacent wall if necessary
			if (
				["wall-1", "door-1"].includes(adjItem) &&
				grid[adjZ][adjX].stickers
			) {
				if (side % 2 == 0) {
					grid[adjZ][adjX].stickers[2 - side] = "X";
				} else {
					grid[adjZ][adjX].stickers[4 - side] = "X";
				}
			}
		} else if (grid[z][x].stickers && grid[z][x].stickers[side] == "X") {
			grid[z][x].stickers[side] = "0";
		}
	}

	return grid;
}

/**
 * sets the sticker for an item at a given position
 *
 * @param {array} grid initial grid to fill in to
 * @param {int} x the x-component of the item
 * @param {int} z the z-component of the item
 * @param {int} side the index of the side to set
 *   (0, 1, 2, 3) ==> (top, right, bottom, left)
 * @param {string} sticker name of sticker to set it to
 *
 * @return modified grid
 */
export function setSticker(grid, x, z, side, sticker) {
	if (grid[z][x].stickers == null) {
		grid[z][x].stickers = ["0", "0", "0", "0"];
	}

	grid[z][x].stickers[side] = sticker;
	return grid;
}

/**
 * returns which of the four adjacent sides are available in order:
 *   top, right, bottom, left
 *
 * @param {array} grid current grid
 * @param {int} x the x-component of the space to check around
 * @param {int} z the z-component of the space to check around
 * @param {object} selectedAsset the asset at that position
 *
 * @return boolean array of length 4
 */
export function getAdjacentSpaces(grid, x, z, selectedAsset) {
	let adjSpaces = [];

	if (selectedAsset.spanX == 2) {
		const rotation = getItem(grid, x, z).rotation;
		if (rotation % 180 == 0) {
			// it's horizontal
			// top
			let adjSide = rotation == 180 ? 3 : 1;
			adjSpaces.push(isCellAvailable(grid, x, z - 1, adjSide));
			// right
			let adjX = rotation == 180 ? x + 1 : x + 2;
			adjSpaces.push(isCellAvailable(grid, adjX, z));
			// bottom
			adjSide = rotation == 180 ? 3 : 1;
			adjSpaces.push(isCellAvailable(grid, x, z + 1, adjSide));
			// right
			adjX = rotation == 180 ? x - 2 : x - 1;
			adjSpaces.push(isCellAvailable(grid, adjX, z));
		} else {
			// vertical
			// top
			let adjZ = rotation == 90 ? z - 2 : z - 1;
			adjSpaces.push(isCellAvailable(grid, x, adjZ));
			// right
			let adjSide = rotation == 90 ? 0 : 2;
			adjSpaces.push(isCellAvailable(grid, x + 1, z, adjSide));
			// bottom
			adjZ = rotation == 90 ? z + 1 : z + 2;
			adjSpaces.push(isCellAvailable(grid, x, adjZ));
			// left
			adjSide = rotation == 90 ? 0 : 2;
			adjSpaces.push(isCellAvailable(grid, x - 1, z, adjSide));
		}
	} else {
		for (let side = 0; side < 4; side++) {
			const adjX = side % 2 == 0 ? x : x + 2 - side;
			const adjZ = side % 2 == 0 ? z + side - 1 : z;
			adjSpaces.push(isCellAvailable(grid, adjX, adjZ));
		}
	}

	return adjSpaces;
}
