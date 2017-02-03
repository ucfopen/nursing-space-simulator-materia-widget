// Global Variables. Just for now to keep demo simple.
var activeElement = {
	activated: false,
	assetRotationState: 0,
	cellsOwned: '',
	element: null,
	horizontal: 0,
	isCloned: 'false',
	vertical: 0
};
// 0 means unoccupied, 1 mean occupied.
var GridCellsState = [];
var cellSpacing = 0.05;
var assets = [];
var keyDown = false;
// The one function to rule them all.
function init()
{
	buildGrid();
	buildAssets();
	buildRooms();
	keyboardEventSetup();
};
// Mouse events functionality on the assets
function attachAssetListeners(obj)
{
	// Hover over the asset
	obj.addEventListener('mouseenter', function () {
		if(this.classList.contains('active')) return;
		this.setAttribute('material', 'color', 'red');
	});
	// No longer hovering over asset
	obj.addEventListener('mouseleave', function () {
		if(this.classList.contains('active')) return;
		this.setAttribute('material', 'color', '#FF00FF');
	});
	// Clicked on asset
	obj.addEventListener('click', function () {
		// Asset already active, remove active modifiers
		if(this.classList.contains('active') && this.getAttribute('isCloned') === 'false')
		{
			// Deactivates the selected asset
			this.setAttribute('material', 'color', 'red');
			this.classList.remove('active');
			activeElement.element = null;
			activeElement.activated = false;
		}
		// Clicking on an active asset that is also a clone will delete that clone.
		else if(this.classList.contains('active') && this.getAttribute('isCloned') === 'true')
		{
			resetCellStates(activeElement.cellsOwned.split(','));
			activeElement.element.setAttribute('material', 'color', '#FF00FF');
			activeElement.element = null;
			activeElement.activated = false;
			deleteAsset(this);
		}
		// Asset wasn't active before, but will be now.
		else
		{
			// Activates the selected asset after deactivating all others.
			if(activeElement.activated === true) removesActive();
			this.setAttribute('material', 'color', '#00FF00');
			this.classList.add('active');
			activeElement.element = this;
			activeElement.activated = true;
			activeElement.isCloned = this.getAttribute('isCloned');
			activeElement.assetRotationState = this.getAttribute('assetRotationState');
			activeElement.cellsOwned = this.getAttribute('cellsOwned');
			activeElement.horizontal = this.getAttribute('horizontal');
			activeElement.vertical = this.getAttribute('vertical');
		}
		// Manually ensure a-frame pushes changes to the HTML DOM.
		this.flushToDOM();
	});
}
function attachGridCellEventListeners()
{
	// Attaches mouse events to the grid cells.
	var cells = document.querySelectorAll('.grid');
	for(var i = 0; i < cells.length; i++)
	{
		// Hovering over cell
		cells[i].addEventListener('mouseenter', function () {
			// Highlight other cells that the asset would otherwise occupy.
			if(activeElement.activated)
			{
				var idContents = this.id.split('-');
				var x = idContents[idContents.length-2];
				var z = idContents[idContents.length-1];

				if(checkBoundaries(false, idContents, x, z, activeElement.horizontal, activeElement.vertical))
				{
					for(var i = 0; i <= activeElement.horizontal; i++)
					{
						for(var j = 0; j <= activeElement.vertical; j++)
						{
							var id = 'cell-' + (Number(x) + i) + '-' + (Number(z) + j);
							var cellToHighlight = document.getElementById(id);
							cellToHighlight.setAttribute('material', 'color', '#CC4500');
						}
					}
				}
			}

		});
		// Mouse cursor has left the cell.
		cells[i].addEventListener('mouseleave', function () {
			clearCells();
		});
		// Mouse cursor has clicked the cell.
		cells[i].addEventListener('click', function () {
			// If asset has been activated, place it on this cell.
			if(activeElement.activated)
			{
				// Position of cell you clicked.
				var cellPosition = this.getAttribute('position');
				// Get asset's scale (helps with putting bottom of asset on ground).
				var assetSize = activeElement.element.getAttribute('scale');
				// If cells are out of bounds, function returns false, and new position skipped.
				var idContents = this.id.split('-');
				var x = idContents[idContents.length-2];
				var z = idContents[idContents.length-1];

				if(!checkBoundaries(false, idContents, x, z, activeElement.horizontal, activeElement.vertical)) return;
				// If active object wasn't a clone, make a clone.
				if(activeElement.isCloned === 'false')
				{
					// Remove the active color and related class.
					activeElement.element.setAttribute('material', 'color', '#FF00FF');
					activeElement.element.classList.remove('active');
					// Clone the asset.
					activeElement.element = clone(activeElement.element);
					// Make the clone the active asset
					activeElement.element.classList.add('active');
					activeElement.element.setAttribute('material', 'color', '#00FF00');
					activeElement.isCloned = 'true';
					activeElement.assetRotationState = activeElement.element.getAttribute('assetRotationState');
					activeElement.cellsOwned = activeElement.element.getAttribute('cellsOwned');
					activeElement.horizontal = activeElement.element.getAttribute('horizontal');
					activeElement.vertical = activeElement.element.getAttribute('vertical');
				}
				// Update cells owned by this asset.
				changeCellsOwned(this, false);
				// Place the clone in the scene on top of clicked grid cell.
				// We add one to the horizontal and vertical because of the discrepancies between "size"
				// and "scale" when dealing with imported object assets. Since one blobk is 0 and two blocks
				// is one in either direction, we must first add one to express it's proper "size" in that direction.
				activeElement.element.setAttribute('position', {
					x: cellPosition.x + ((Number(activeElement.horizontal) + 1) / 2.0) - 0.5,
					y: (assetSize.y / 2.0),
					z: cellPosition.z + ((Number(activeElement.vertical) + 1) / 2.0) - 0.5
				});
				// If this is the PoV camera object.
				if(activeElement.element.id === "pov-camera")
				{
					// Calling placeCamera to handle camera arrangements.
					placeCamera();
				}
				// Make sure clone is manually pushed to HTML DOM.
				activeElement.element.flushToDOM();
			}
		});
	}
};
function buildAssets()
{
	var assetsFromFile = {
		"box": {
			"assetRotationState": 0,
			"cellsOwned": "",
			"color": "#FF00FF",
			"horizontal": 0,
			"id": "asset-1",
			"isCloned": "false",
			"materialType": "primitive",
			"moveable": "true",
			"position": {"x": 15, "y": 0.5, "z": 0},
			"scale": {"x": 1, "y": 1, "z": 1},
			"tag": "a-box",
			"type": "object",
			"vertical": 0
		},
		"largeBox": {
			"assetRotationState": 0,
			"cellsOwned": "",
			"color": "#FF00FF",
			"horizontal": 1,
			"id": "asset-2",
			"isCloned": "false",
			"materialType": "primitive",
			"moveable": "true",
			"position": {"x": 15, "y": 0.5, "z": 4},
			"scale": {"x": 2, "y": 1, "z": 2},
			"tag": "a-box",
			"type": "object",
			"vertical": 1
		},
		"bed": {
			"assetRotationState": 0,
			"cellsOwned": "",
			"color": "#FF00FF",
			"horizontal": 0,
			"id": "asset-3",
			"isCloned": "false",
			"material": "",
			"materialType": "complex",
			"moveable": "true",
			"objectSource": "assets/HOSPITAL_BED.obj",
			"position": {"x": 15, "y": 0.5, "z": 2},
			"scale": {"x": 0.1, "y": 0.1, "z": 0.1},
			"tag": "a-obj-model",
			"type": "object",
			"vertical": 1
		},
		"viewer": {
			"assetRotationState": 0,
			"cellsOwned": "",
			"color": "#6699FF",
			"horizontal": 0,
			"id": "pov-camera",
			"isCloned": "false",
			"materialType": "primitive",
			"moveable": "true",
			"position": {"x": 15, "y": 0.5, "z": 6},
			"scale": {"x":.35, "y":.35, "z":.35},
			"tag": "a-sphere",
			"type": "view",
			"vertical": 0
		}
	}
	var mainContainer = document.querySelector('a-scene');
	for(var index in assetsFromFile) 
	{
		if (assetsFromFile.hasOwnProperty(index))
		{
			var attr = assetsFromFile[index];
			var asset = document.createElement(attr['tag']);
			asset.id = attr['id'];
			mainContainer.appendChild(asset);
			// Makes core adjustments to the asset.
			asset.setAttribute('position', attr['position']);
			asset.setAttribute('scale', attr['scale']);
			if(attr['materialType'] === 'primitive') asset.setAttribute('material', 'color', attr['color']);
			else
			{
				asset.setAttribute('src', attr['objectSource']);
				if(attr['material'] !== '') asset.setAttribute('mtl', attr['material']);
				else asset.setAttribute('material', 'color', attr['color']);
			}
			// Helps not to duplicate cloned objects.
			asset.setAttribute('isCloned', attr['isCloned']);
			// Contains which cells it occupies.
			asset.setAttribute('cellsOwned', attr['cellsOwned']);
			// Contains what rotation state it has (for later evaluation).
			// 0 is default. 1 is clockwise 90 degrees, 2 is 180 degrees, 3 is 270 degrees.
			asset.setAttribute('assetRotationState', attr['assetRotationState']);
			// Helps to highlight which cells will be occupied due to shape.
			asset.setAttribute('horizontal', attr['horizontal']);
			asset.setAttribute('vertical', attr['vertical']);
			// Makes data containing adjustments to the asset.
			asset.setAttribute('type', attr['type']);
			asset.setAttribute('materialType', attr['materialType']);
			asset.setAttribute('moveable', attr['moveable']);
			// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
			asset.flushToDOM();
			attachAssetListeners(asset);
			// Adds this asset to the array of assets, if object type.
			if(attr['type'] === 'object') assets.push(asset);
			console.log(asset);
		}
	}

	// Create walls
	for(var j = 1; j <= 6; j++)
	{
		var wall = document.createElement('a-box');
		wall.id = 'wall-' + j;
		mainContainer.appendChild(wall);
	}
	// Create Doors
	for(var k = 1; k <= 4; k++)
	{
		var door = document.createElement('a-box');
		door.id = 'door-' + k;
		mainContainer.appendChild(door);
	}
};
function buildGrid()
{
	var mainContainer = document.querySelector('a-scene');
	// Makes adjustments to the grid cell.
	var planes = document.querySelectorAll('a-plane');
	for(var i = 0; i < 10; i++)
	{
		GridCellsState[i] = [];
		/* i is base x-coord. If cell is increased in scale along x-axis,
		** multiply i by the amount (ie. (i * 10) for scale-x: 10).
		** 0.5 refers to half the cell size, since the plane is drawn out from its center point.
		** (cellSpacing * i) creates the thin, empty space between cells for the grid effect.
		** Increase or decrease the cellSpacing to make gaps thinner or thicker.
		*/
		var xCoord = (i-5) + 0.5 + (cellSpacing * i);
		for(var j = 0; j < 10; j++)
		{
			// Create the grid cells, and append to scene.
			var plane = document.createElement('a-plane');
			mainContainer.appendChild(plane);
			/* j is base z-coord. If cell is increased in scale along z-axis,
			** multiply j by the amount (ie. (j * 10) for scale-z: 10).
			** 0.5 refers to half the cell size, since the plane is drawn out from its center point.
			** (cellSpacing * j) creates the thin, empty space between cells for the grid effect.
			** Increase or decrease the cellSpacing to make gaps thinner or thicker.
			*/
			var zCoord = (j-5) + 0.5 + (cellSpacing * j);
			plane.setAttribute('position', {x: xCoord, y: 0, z: zCoord});
			plane.setAttribute('rotation', {x: -90, y: 0, z: 0});
			plane.setAttribute('material', 'color', '#7BC8A4');
			// Necessary for event listeners.
			plane.classList.add('grid');
			// Necessary to easily track state of asset locations.
			plane.id = 'cell-' + i + '-' + j;
			// Creates gridcellsstate as each cell is made.
			GridCellsState[i][j] = 0;
			// Helps not to duplicate cloned objects.
			plane.setAttribute('isCloned', 'false');
			// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
			plane.flushToDOM();
		}
	}
	attachGridCellEventListeners();
};
function buildRooms()
{
	// Makes adjustments to the left wall.
	var wall = document.getElementById('wall-1');
	wall.setAttribute('position', {x: -5.5, y: 1.5, z: 3.5 - (3 * cellSpacing)});
	wall.setAttribute('scale', {x: 1, y: 3, z: 6 + (5 * cellSpacing)});
	wall.setAttribute('material', 'color', '#A9A9A9');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	wall.flushToDOM();
	// Makes adjustments to the left wall.
	wall = document.getElementById('wall-2');
	wall.setAttribute('position', {x: -5.5, y: 1.5, z: -3 + (3 * cellSpacing)});
	wall.setAttribute('scale', {x: 1, y: 3, z: 4 + (4 * cellSpacing)});
	wall.setAttribute('material', 'color', '#A9A9A9');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	wall.flushToDOM();
	// Makes adjustments to the right wall.
	wall = document.getElementById('wall-3');
	wall.setAttribute('position', {x: 6, y: 1.5, z: 3.5 - (3 * cellSpacing)});
	wall.setAttribute('scale', {x: 1, y: 3, z: 6 + (5 * cellSpacing)});
	wall.setAttribute('material', 'color', '#A9A9A9');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	wall.flushToDOM();
	// Makes adjustments to the right wall.
	wall = document.getElementById('wall-4');
	wall.setAttribute('position', {x: 6, y: 1.5, z: -3 + (3 * cellSpacing)});
	wall.setAttribute('scale', {x: 1, y: 3, z: 4 + (4 * cellSpacing)});
	wall.setAttribute('material', 'color', '#A9A9A9');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	wall.flushToDOM();
	// Makes adjustments to the top wall.
	wall = document.getElementById('wall-5');
	wall.setAttribute('position', {x: 0.25, y: 1.5, z: -5.5 + cellSpacing});
	wall.setAttribute('scale', {x: 12 + (10 * cellSpacing), y: 3, z: 1});
	wall.setAttribute('material', 'color', '#A9A9A9');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	wall.flushToDOM();
	// Makes adjustments to the bottom wall.
	wall = document.getElementById('wall-6');
	wall.setAttribute('position', {x: 0.25, y: 1.5, z: 6 - cellSpacing});
	wall.setAttribute('scale', {x: 8 + (8 * cellSpacing), y: 3, z: 1});
	wall.setAttribute('material', 'color', '#A9A9A9');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	wall.flushToDOM();
	// Makes adjustments to the left door.
	var door = document.getElementById('door-1');
	door.setAttribute('position', {x: -5.5, y: 1.5, z: -0.25});
	door.setAttribute('scale', {x: 1, y: 3, z: 1});
	door.setAttribute('material', 'color', '#593C1F');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	door.flushToDOM();
	// Makes adjustments to the right door.
	door = document.getElementById('door-2');
	door.setAttribute('position', {x: 6, y: 1.5, z: -0.25});
	door.setAttribute('scale', {x: 1, y: 3, z: 1});
	door.setAttribute('material', 'color', '#593C1F');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	door.flushToDOM();
	// Makes adjustments to the bottom-right door.
	door = document.getElementById('door-3');
	door.setAttribute('position', {x: 5, y: 1.5, z: 6 - cellSpacing});
	door.setAttribute('scale', {x: 1, y: 3, z: 1});
	door.setAttribute('material', 'color', '#593C1F');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	door.flushToDOM();
	// Makes adjustments to the bottom-left door.
	door = document.getElementById('door-4');
	door.setAttribute('position', {x: -4.5, y: 1.5, z: 6 - cellSpacing});
	door.setAttribute('scale', {x: 1, y: 3, z: 1});
	door.setAttribute('material', 'color', '#593C1F');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	door.flushToDOM();
}
function changeAttribute(attribute, value)
{
	activeElement.element.setAttribute(attribute, value);
	activeElement[attribute] = value;
	activeElement.element.flushToDOM();
};
function checkBoundaries(isRotation, idContents, x, z, horizontal, vertical)
{
	var cells = activeElement.cellsOwned.split(',');
	for(var i = 0; i <= horizontal; i++)
	{
		for(var j = 0; j <= vertical; j++)
		{
			// Correction to make sure collision isn't with the active object.
			var everythingIsOkFlag = false;
			for(var k = 0; k < cells.length; k++)
			{
				var nextCell = cells[k].split('-');
				if(Number(nextCell[1]) === (Number(x) + i) && Number(nextCell[2]) === (Number(z) + j))
				{
					everythingIsOkFlag = true;
					break;
				}
			}
			// Collision is with same object. Let it go. Don't worry about it.
			if(everythingIsOkFlag) continue;
			var cell = 'cell-' + (Number(x) + i) + '-' + (Number(z) + j);
			var cellToClaim = document.getElementById(cell);
			if(cellToClaim === null) return false;
			else if(isRotation && ((i !== 0 && j !== 0) && GridCellsState[(Number(x) + i)][(Number(z) + j)] === 1)) return false;
			else if(!isRotation && GridCellsState[(Number(x) + i)][(Number(z) + j)] === 1) return false;
		}
	}
	return true;
};
// Changes cells asset owns unless out of bounds.
function changeCellsOwned(activeCell, isRotation)
{
	var idContents = activeCell.id.split('-');
	var x = idContents[idContents.length-2];
	var z = idContents[idContents.length-1];

	if(!checkBoundaries(isRotation, idContents, x, z, activeElement.horizontal, activeElement.vertical)) return false;
	// Resets cell state for previously occupied cells.
	var cells = activeElement.cellsOwned.split(',');
	if(cells[0] !== '')
	{
		resetCellStates(cells);
	}
	// Gives the new cells to that asset clone.
	changeAttribute('cellsOwned', '');
	for(var i = 0; i <= activeElement.horizontal; i++)
	{
		for(var j = 0; j <= activeElement.vertical; j++)
		{
			var cell = 'cell-' + (Number(x) + i) + '-' + (Number(z) + j);
			GridCellsState[(Number(x) + i)][(Number(z) + j)] = 1;
			var cellToClaim = document.getElementById(cell);
			if(activeElement.cellsOwned !== '') changeAttribute('cellsOwned', (activeElement.cellsOwned + ',' + cell));
			else changeAttribute('cellsOwned', cell);
		}
	}
	return true;
};
// Clears the highlighting from all cells on the grid.
function clearCells()
{
	var cells = document.querySelectorAll('.grid');
	for(var i = 0; i < cells.length; i++)
	{
		cells[i].setAttribute('material', 'color', '#7BC8A4');
	}
};
// Safely clones an asset object rather than use the one in the sidebar
function clone(obj)
{
	// Make sure an actual object was passed in.
	if (null == obj || 'object' != typeof obj) return obj;
	// Create a new object of same type.
	var clonedObject;
	// Determine if primitive object or object model.
	if(obj.getAttribute('obj-model') === null) clonedObject = document.createElement('a-' + obj.getAttribute('geometry')['primitive']);
	else
	{
		clonedObject = document.createElement('a-obj-model');
		clonedObject.setAttribute('src', obj.getAttribute('src'));
	}
	// Copy over its essential attributes.
	clonedObject.setAttribute('material', obj.getAttribute('material'));
	clonedObject.setAttribute('scale', obj.getAttribute('scale'));
	clonedObject.setAttribute('rotation', obj.getAttribute('rotation'));
	// Contains which cells it occupies.
	clonedObject.setAttribute('cellsOwned', obj.getAttribute('cellsOwned'));
	// Contains what rotation state it has (for later evaluation).
	// 0 is default. 1 is clockwise 90 degrees, 2 is 180 degrees, 3 is is 270 degrees.
	clonedObject.setAttribute('assetRotationState', obj.getAttribute('assetRotationState'));
	// Helps to highlight which cells will be occupied due to shape.
	clonedObject.setAttribute('horizontal', obj.getAttribute('horizontal'));
	clonedObject.setAttribute('vertical', obj.getAttribute('vertical'));
	// Helps not to duplicate cloned objects.
	clonedObject.setAttribute('isCloned', 'true');
	// Copies classes over to new object.
	for(cls in obj.classList)
	{
		clonedObject.classList.add(cls);
	}
	// Put it in the scene.
	document.querySelector('a-scene').appendChild(clonedObject);
	// Give new object same listeners as the original.
	attachAssetListeners(clonedObject);
	// keep all assets in same array.
	assets.push(clonedObject);
	return clonedObject;
}
// Deletes a cloned asset from all places referenced.
function deleteAsset(obj)
{
	// Flush element from asset collection.
	var flag = false;
	for(var i = 0; i < assets.length; i++)
	{
		if(flag && assets[i+1]) assets[i] = assets[i+1];
		else if(obj === assets[i])
		{
			flag = true;
			if(assets[i+1]) assets[i] = assets[i+1];
		}
	}
	document.querySelector('a-scene').removeChild(obj);
};
function keyboardEventSetup()
{
	document.addEventListener('keydown', function(event)
	{
		const keyName = event.key;

		if (keyName === 'r' && !keyDown)
		{
			keyDown = true;
			var isClone = activeElement.isCloned;
			// Adjust cell that will be occupied under new rotation.
			var horizontal = activeElement.horizontal;
			var vertical = activeElement.vertical;
			changeAttribute('horizontal', vertical);
			changeAttribute('vertical', horizontal);
			if(isClone === 'true')
			{
				// Place the clone in the scene on top left grid cell.
				var cornerCell = document.getElementById(activeElement.cellsOwned.split(',')[0]);
				var cellPosition = cornerCell.getAttribute('position');
				var assetSize = activeElement.element.getAttribute('scale');

				var idContents = cornerCell.id.split('-');
				var x = idContents[idContents.length-2];
				var z = idContents[idContents.length-1];
				var horizontal = activeElement.horizontal;
				var vertical = activeElement.vertical;
				var inBounds = checkBoundaries(true, idContents, x, z, horizontal, vertical);
				if(!inBounds)
				{
					// New position is out of bounds. Change back.
					var horizontal = activeElement.element.getAttribute('horizontal');
					var vertical = activeElement.element.getAttribute('vertical');
					changeAttribute('horizontal', vertical);
					changeAttribute('vertical', horizontal);
				}
				else
				{
					changeCellsOwned(cornerCell, true);
				}
			}
			// If clone, Make sure new rotation position is within bounds before rotation.
			if(isClone === 'false' || inBounds)
			{
				// Rotate the actual asset.
				var rotation = activeElement.element.getAttribute('rotation');
				activeElement.element.setAttribute('rotation', {x: rotation.x, y: (rotation.y + 90), z: rotation.z});
				// Increments to the next rotation state (used to calculate horizontal and vertical shape change).
				activeElement.assetRotationState++;
				if(activeElement.assetRotationState >= 4) activeElement.assetRotationState = 0;
				changeAttribute('assetRotationState', activeElement.assetRotationState);
			}
			// If not a clone, stop here. Keep original asset position the same.
			if(isClone === 'true' && inBounds)
			{
				// We add one to the horizontal and vertical because of the discrepancies between "size"
				// and "scale" when dealing with imported object assets. Since one blobk is 0 and two blocks
				// is one in either direction, we must first add one to express it's proper "size" in that direction.
				activeElement.element.setAttribute('position', {
					x: cellPosition.x + ((Number(activeElement.horizontal) + 1) / 2.0) - 0.5,
					y: (assetSize.y / 2.0),
					z: cellPosition.z + ((Number(activeElement.vertical) + 1) / 2.0) - 0.5
				});
			}
			activeElement.element.flushToDOM();
			return;
		}
		if (keyName === 'Escape' && !keyDown) {
			// Reset the camera position.
			resetCamera();
		}
	}, false);

	document.addEventListener('keyup', function(event)
	{

		const keyName = event.key;
		keyDown = false;
	}, false);
};
// Removes the active class from any object that has it
function removesActive()
{
	activeElement.element = null;
	activeElement.activated = false;
	for(var i = 0; i < assets.length; i++)
	{
		assets[i].setAttribute('material', 'color', '#FF00FF');
		assets[i].classList.remove('active');
	}
};

// Set up the PoV camera.
function placeCamera()
{
	camera = document.getElementById("camera");
	povObj = document.getElementById("pov-camera");
	cam_x_pos = povObj.getAttribute("position").x;
	cam_z_pos = povObj.getAttribute("position").z;
	// Y position on PoV Cameras should *always* be 1.6!
	// https://docs.unrealengine.com/latest/INT/Platforms/VR/ContentSetup/index.html#vrcamerasetup
	camera.setAttribute("position", {
		x: cam_x_pos,
		y: 1.6,
		z: cam_z_pos
	});
	camera.setAttribute("rotation", {x: 1, y: 1, z: 1});
	var lookControls = document.createAttribute("look-controls");
	camera.setAttributeNode(lookControls);
	// camera.removeAttribute("mouse-cursor");
	camera.flushToDOM();
};

// Simple function to reset camera postion to original settings.
function resetCamera()
{
	camera = document.getElementById("camera");
	camera.setAttribute("position", {
		x: 0,
		y: 20,
		z: 0
	});
	camera.setAttribute("rotation", {
		x: -90,
		y: 0,
		z: 0
	});
	camera.removeAttribute("look-controls");
	camera.flushToDOM();
}


// Resets cell states that an object used to have.
function resetCellStates(cells)
{
	for(var i = 0; i < cells.length; i++)
	{
		var coords = cells[i].split('-');
		GridCellsState[coords[coords.length-2]][coords[coords.length-1]] = 0;
	}
};