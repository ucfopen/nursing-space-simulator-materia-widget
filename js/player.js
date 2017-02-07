// Global Variables. Just for now to keep demo simple.
var activeElement = {
	activated: false,
	assetRotationState: 0,
	canReplace: [],
	cellsOwned: '',
	element: null,
	horizontal: 0,
	isCloned: 'false',
	vertical: 0
};
var activeCells = [];
var assetsFromFile = {
		"bed": {
			"assetRotationState": 0,
			"canReplace": [],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "#FF00FF",
			"horizontal": 1,
			"id": "asset-3",
			"isCloned": "false",
			"isPermanent": "false",
			"materialSource": "",
			"materialType": "complex",
			"movable": "true",
			"objectSource": "assets/HOSPITAL_BED.obj",
			"position": {"x": -5, "y": 0.5, "z": 12},
			"scale": {"x": 0.1, "y": 0.1, "z": 0.1},
			"tag": "a-obj-model",
			"type": "object",
			"vertical": 0
		},
		// "box": {
		// 	"assetRotationState": 0,
		// 	"canReplace": [],
		// 	"cellsOwned": "",
		// 	"clonable": "false",
		// 	"defaultColor": "#FF00FF",
		// 	"horizontal": 0,
		// 	"id": "asset-1",
		// 	"isCloned": "false",
		// 	"isPermanent": "false",
		// 	"materialType": "primitive",
		// 	"movable": "true",
		// 	"position": {"x": -5, "y": 0.5, "z": 10},
		// 	"scale": {"x": 1, "y": 1, "z": 1},
		// 	"tag": "a-box",
		// 	"type": "object",
		// 	"vertical": 0
		// },
		"door-1": {
			"assetRotationState": 0,
			"canReplace": ["structure"],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "",
			"horizontal": 0,
			"id": "door-1",
			"isCloned": "false",
			"isPermanent": "false",
			"materialType": "textured",
			"movable": "false",
			"objectSource": "assets/DOOR_1.png",
			"position": {"x": -50, "y": -50, "z": -50},
			"repeat": "1 1",
			"scale": {"x":1, "y":3, "z":1},
			"tag": "a-box",
			"type": "structure",
			"vertical": 0
		},
		"door-2": {
			"assetRotationState": 0,
			"canReplace": ["structure"],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "",
			"horizontal": 0,
			"id": "door-1",
			"isCloned": "false",
			"isPermanent": "false",
			"materialType": "textured",
			"movable": "false",
			"objectSource": "assets/DOOR_2.png",
			"position": {"x": -50, "y": -50, "z": -50},
			"repeat": "1 1",
			"scale": {"x":1, "y":3, "z":1},
			"tag": "a-box",
			"type": "structure",
			"vertical": 0
		},
		"largeBox": {
			"assetRotationState": 0,
			"canReplace": [],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "#FF00FF",
			"horizontal": 1,
			"id": "asset-2",
			"isCloned": "false",
			"isPermanent": "false",
			"materialType": "primitive",
			"movable": "true",
			"position": {"x": -5, "y": 0.5, "z": 14},
			"scale": {"x": 2, "y": 1, "z": 2},
			"tag": "a-box",
			"type": "object",
			"vertical": 1
		},
		"viewer": {
			"assetRotationState": 0,
			"canReplace": [],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "#6699FF",
			"horizontal": 0,
			"id": "pov-camera",
			"isCloned": "false",
			"isPermanent": "false",
			"materialType": "primitive",
			"movable": "true",
			"position": {"x": -5, "y": 0.5, "z": 16},
			"scale": {"x":.35, "y":.35, "z":.35},
			"tag": "a-sphere",
			"type": "view",
			"vertical": 0
		},
		"wall-1": {
			"assetRotationState": 0,
			"canReplace": ["structure"],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "#9FCDB1",
			"horizontal": 0,
			"id": "wall-1",
			"isCloned": "false",
			"isPermanent": "false",
			"materialType": "primitive",
			"movable": "false",
			"position": {"x": -5, "y": 1.5, "z": 10},
			"scale": {"x":1, "y":3, "z":1},
			"tag": "a-box",
			"type": "structure",
			"vertical": 0
		},
		"wall-2": {
			"assetRotationState": 0,
			"canReplace": ["structure"],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "#CBC99D",
			"horizontal": 0,
			"id": "wall-2",
			"isCloned": "false",
			"isPermanent": "false",
			"materialType": "primitive",
			"movable": "false",
			"position": {"x": -7, "y": 1.5, "z": 10},
			"scale": {"x":1, "y":3, "z":1},
			"tag": "a-box",
			"type": "structure",
			"vertical": 0
		}
		,
		"wall-3": {
			"assetRotationState": 0,
			"canReplace": ["structure"],
			"cellsOwned": "",
			"clonable": "false",
			"defaultColor": "#86867C",
			"horizontal": 0,
			"id": "wall-3",
			"isCloned": "false",
			"isPermanent": "false",
			"materialType": "primitive",
			"movable": "false",
			"position": {"x": -9, "y": 1.5, "z": 10},
			"scale": {"x":1, "y":3, "z":1},
			"tag": "a-box",
			"type": "structure",
			"vertical": 0
		}
	};
var gridLoader = {
	"columns": 35,
	"content": 	"x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-" +
				"x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-" +
				"w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-d1-0-0-0-0-0-0-0-0-0-0-d1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-w1-w1-w1-d1-d2-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-d1-d2-w1-w1-w1-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"d1-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-d1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"d2-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0-w1-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-w1-w1-w1-d2-d1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-d2-d1-w1-w1-w1-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-d1-0-0-0-0-0-0-0-0-0-0-d1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-w1-0-0-0-0-0-0-0-0-0-0-0-w1-" +
				"w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-w1-" +
				"x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-" +
				"x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x",
	"rows": 30
};
// 0 means unoccupied, 1 mean occupied.
var gridCellsState = [];
var cellSpacing = 0.05;
var assets = [];
var keyDown = false;
var onGround = false;
// The one function to rule them all.
function init()
{
	buildScene();
	keyboardEventSetup();
	var cam = document.getElementById('camera');
	cam.setAttribute('position', {
		x: (gridLoader['columns'] / 2),
		y: 25,
		z: (gridLoader['rows'] / 2)
	});
	cam.flushToDOM();
};
// Mouse events functionality on the assets
function attachAssetListeners(obj)
{
	// Hover over the asset
	obj.addEventListener('mouseenter', function ()
	{
		// If viewpoint is on the ground, don't change color.
		// If mouse hovers over asset that is active, don't change color.
		// If nothing is active AND asset type is structure (ie. wall), don't change color.
		if(onGround) return;
		else if(this.classList.contains('active')) return;
		else if(activeElement.activated === false && this.getAttribute('isCloned') === 'true' && this.getAttribute('clonable') === 'false') return;
		else if(activeElement.activated === false && this.getAttribute('isPermanent') === 'true') return;
		this.setAttribute('material', 'color', 'red');
	});
	// No longer hovering over asset
	obj.addEventListener('mouseleave', function ()
	{
		if(this.classList.contains('active') || onGround) return;
		swapMaterials(this);
	});
	// Clicked on asset
	obj.addEventListener('click', function ()
	{
		// Ignore click when viewpoint is one ground.
		if(onGround) return;
		// Asset already active, remove active modifiers
		if(this.classList.contains('active') && this.getAttribute('isCloned') === 'false')
		{
			// Deactivates the selected asset
			this.setAttribute('material', 'color', 'red');
			this.classList.remove('active');
			activeElement.element = null;
			activeElement.activated = false;
		}
		// Clicking on an active asset that isn't loaded from gridLoader and is also a clone will delete that clone.
		else if(this.classList.contains('active') && this.getAttribute('isCloned') === 'true' && this.getAttribute('isPermanent') === 'false')
		{
			resetCellStates(activeElement.cellsOwned.split(','));
			activeElement.element = null;
			activeElement.activated = false;
			deleteAsset(this);
		}
		// Asset wasn't active before, but some (not cloned) asset types can replace it.
		else if(activeElement.activated === true &&
				activeElement.canReplace.indexOf(this.getAttribute('type')) > -1 &&
				activeElement.isCloned === 'false' &&
				this.getAttribute('isCloned') === 'true')
		{
			this.setAttribute('vertical', activeElement.vertical);
			this.setAttribute('horizontal', activeElement.horizontal);
			// Making sure to replace asset's material with the correct combination of color, .mtl, and/or .obj
			swapMaterials(this, activeElement.element);
			this.classList.add('active');
		}
		// Asset wasn't active before, but will be now.
		else
		{
			if(this.getAttribute('movable') === 'false') return;
			// Activates the selected asset after deactivating all others.
			if(activeElement.activated === true) removeActive();
			this.setAttribute('material', 'color', '#00FF00');
			this.classList.add('active');
			activeElement.element = this;
			activeElement.activated = true;
			activeElement.isCloned = this.getAttribute('isCloned');
			activeElement.assetRotationState = this.getAttribute('assetRotationState');
			activeElement.canReplace = this.getAttribute('canReplace');
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
		cells[i].addEventListener('mouseenter', function ()
		{
			if(onGround) return;
			// Highlight other cells that the asset would otherwise occupy.
			else if(activeElement.activated)
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
							activeCells.push(cellToHighlight);
						}
					}
				}
			}

		});
		// Mouse cursor has left the cell.
		cells[i].addEventListener('mouseleave', function ()
		{
			if(onGround) return;
			else if(activeElement.activated) clearCells();
		});
		// Mouse cursor has clicked the cell.
		cells[i].addEventListener('click', function ()
		{
			if(onGround || activeElement.element.getAttribute('isPermanent') === 'true') return;
			else if(activeElement.activated && activeElement.element.getAttribute('movable') === 'false') return;
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
				// If active object wasn't a clone, make a clone, unless it was a 'structure object, or viewer.
				if(activeElement.isCloned === 'false' && activeElement.element.id !== "pov-camera")
				{
					// Remove the active color and related class.
					swapMaterials(activeElement.element);
					activeElement.element.classList.remove('active');
					// Clone the asset.
					activeElement.element = clone(activeElement.element);
					// Make the clone the active asset
					activeElement.element.classList.add('active');
					activeElement.element.setAttribute('material', 'color', '#00FF00');
					activeElement.isCloned = 'true';
					activeElement.assetRotationState = activeElement.element.getAttribute('assetRotationState');
					activeElement.canReplace = activeElement.element.getAttribute('canReplace');
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
					y: assetSize.y / 2.0,
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
	for(var index in assetsFromFile) 
	{
		if (assetsFromFile.hasOwnProperty(index))
		{
			var attr = assetsFromFile[index];
			// Structure assets are placed when grid is created.
			// if(attr['type'] === 'structure') continue;
			createAsset(attr);
		}
	}
};
function buildCell(i, j)
{
	var mainContainer = document.querySelector('a-scene');
	// Create the grid cells, and append to scene.
	var plane = document.createElement('a-plane');
	mainContainer.appendChild(plane);

	plane.setAttribute('position', {x: i, y: 0, z: j});
	plane.setAttribute('rotation', {x: -90, y: 0, z: 0});
	plane.setAttribute('material', 'color', '#C1D2CC');
	// Necessary for event listeners.
	plane.classList.add('grid');
	// Necessary to easily track state of asset locations.
	plane.id = 'cell-' + i + '-' + j;
	// Helps not to duplicate cloned objects.
	plane.setAttribute('isCloned', 'false');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	plane.flushToDOM();
};
function buildCeiling()
{
	var mainContainer = document.querySelector('a-scene');
	// Create the plane (ceiling), and append to scene.
	var ceiling = document.createElement('a-plane');
	// Identify it for better inspection in Chrome inspector.
	ceiling.id = 'ceiling';
	mainContainer.appendChild(ceiling);
	// Uses the gridLoader string to determine the upper left corner for starting position.
	ceiling.setAttribute('position', {
		x: (gridLoader['columns'] / 2.0) - (0.5),
		y: 3,
		z: (gridLoader['rows'] / 2.0)
	});
	// Renders face of plane downward, invisible from above, but visible at ground-level.
	ceiling.setAttribute('rotation', {x: 90, y: 0, z: 0});
	// Uses the gridLoader string to determine the full dimensions of the "rooms" portion of scene.
	ceiling.setAttribute('height', gridLoader['rows']);
	ceiling.setAttribute('width', gridLoader['columns']);
	// Try to use texture with dimensions at power of 2 (ie. 128x128, 256x256, 512x512).
	ceiling.setAttribute('material', 'src', 'assets/CEILING_TILE.jpg');
	// Again use powers of 2 for best results (ie. "1 1", "2 2", "4 4", "8 8", etc.).
	ceiling.setAttribute('material', 'repeat', '16 16');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	ceiling.flushToDOM();
};
function buildScene()
{
	var grid = gridLoader['content'].split('-');
	// Parses the load string into the gridCellsState for easier building.
	var indexCounter = 0;
	var n = 0;
	do
	{
		gridCellsState[indexCounter] = [];
		for(var w = 0; w < gridLoader['columns']; w++)
		{
			// Creates gridcellsstate as each cell is pulled from loader string.
			gridCellsState[indexCounter][w] = grid[n];
			n++;
		}
		indexCounter++;
	} while(indexCounter < gridLoader['rows']);
	// Uses the gridCellsState double array to populate the scene.
	for(var i = 0; i < gridLoader['columns']; i++)
	{
		for(var j = 0; j < gridLoader['rows']; j++)
		{
			switch(gridCellsState[j][i])
			{
				case '0':
				{
					buildCell(i, j);
					break;
				}
				case 'd1':
				{
					createAsset(assetsFromFile['door-1'], i, j, true);
					break;
				}
				case 'd2':
				{
					createAsset(assetsFromFile['door-2'], i, j, true);
					break;
				}
				case 'w1':
				{
					createAsset(assetsFromFile['wall-1'], i, j, true);
					break;
				}
				case 'w2':
				{
					createAsset(assetsFromFile['wall-2'], i, j, true);
					break;
				}
				case 'x':
				{
					break;
				}
			};
		}
	}
	attachGridCellEventListeners();
	buildCeiling();
	buildAssets();
};
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
			else if(isRotation && ((i !== 0 && j !== 0) && gridCellsState[(Number(z) + j)][(Number(x) + i)] === 1)) return false;
			else if(!isRotation && gridCellsState[(Number(z) + j)][(Number(x) + i)] !== '0') return false;
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
			gridCellsState[(Number(z) + j)][(Number(x) + i)] = 1;
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
	for(var i = 0; i < activeCells.length; i++)
	{
		activeCells[i].setAttribute('material', 'color', '#C1D2CC');
	}
	activeCells = [];
};
// Safely clones an asset object rather than use the one in the sidebar
function clone(obj)
{
	// Make sure an actual object was passed in.
	if (null == obj || 'object' != typeof obj) return obj;
	// Create a new object of same type.
	var clonedObject;
	clonedObject = obj.cloneNode(true);
	clonedObject.id = obj.id + '-clone';
	// Helps not to duplicate cloned objects.
	clonedObject.setAttribute('isCloned', 'true');
	clonedObject.setAttribute('clonable', 'false');
	// Put it in the scene.
	document.querySelector('a-scene').appendChild(clonedObject);
	// Give new object same listeners as the original.
	attachAssetListeners(clonedObject);
	// keep all assets in same array.
	assets.push(clonedObject);
	return clonedObject;
}
function createAsset(details, x, z, isPermanent)
{
	var mainContainer = document.querySelector('a-scene');
	var asset = document.createElement(details['tag']);
	asset.id = details['id'];
	mainContainer.appendChild(asset);
	// Makes adjustments to the asset based off loadString load string or clonable assets.
	if(x === null || x === undefined)
	{
		asset.setAttribute('position', details['position']);
		asset.setAttribute('clonable', 'true');
		asset.setAttribute('movable', 'true');
		// Helps not to duplicate cloned objects.
		asset.setAttribute('isCloned', details['isCloned']);
		asset.setAttribute('isPermanent', 'false');
	}
	else
	{
		asset.setAttribute('position', {
			x: x,
			y: (details['scale'].y / 2),
			z: z
		});
		asset.setAttribute('clonable', 'false');
		asset.setAttribute('isCloned', 'true');
		asset.setAttribute('movable', details['movable']);
		asset.setAttribute('isPermanent', 'true');
	}
	asset.setAttribute('scale', details['scale']);
	if(details['materialType'] === 'primitive') asset.setAttribute('material', 'color', details['defaultColor']);
	else if(details['materialType'] === 'textured')
	{
		asset.setAttribute('objectSource', details['objectSource']);
		asset.setAttribute('material', 'src', details['objectSource']);
		asset.setAttribute('material', 'repeat', details['repeat']);
	}
	else
	{
		asset.setAttribute('objectSource', details['objectSource']);
		asset.setAttribute('src', details['objectSource']);
		asset.setAttribute('materialSource', details['materialSource']);
		if(details['materialSource'] !== '') asset.setAttribute('mtl', details['materialSource']);
		else asset.setAttribute('material', 'color', details['defaultColor']);
	}
	// Contains which cells it occupies.
	asset.setAttribute('cellsOwned', details['cellsOwned']);
	// Contains what rotation state it has (for later evaluation).
	// 0 is default. 1 is clockwise 90 degrees, 2 is 180 degrees, 3 is 270 degrees.
	asset.setAttribute('assetRotationState', details['assetRotationState']);
	// Helps to highlight which cells will be occupied due to shape.
	asset.setAttribute('horizontal', details['horizontal']);
	asset.setAttribute('vertical', details['vertical']);
	// Makes data containing adjustments to the asset.
	asset.setAttribute('type', details['type']);
	asset.setAttribute('defaultColor', details['defaultColor']);
	asset.setAttribute('materialType', details['materialType']);
	asset.setAttribute('canReplace', details['canReplace']);
	// If this asset was created from the gridLoader, set isPermanent to true, otherwise false is default.
	if(isPermanent) asset.setAttribute('isPermanent', 'true');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	asset.flushToDOM();
	attachAssetListeners(asset);
	// Adds this asset to the array of assets, if object type.
	if(x === null || x === undefined) assets.push(asset);
};
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
function removeActive()
{
	activeElement.element = null;
	activeElement.activated = false;
	for(var i = 0; i < assets.length; i++)
	{
		swapMaterials(assets[i]);
		assets[i].classList.remove('active');
	}
};

// Set up the PoV camera.
function placeCamera()
{
	camera = document.getElementById('camera');
	povObj = document.getElementById('pov-camera');
	cam_x_pos = povObj.getAttribute('position').x;
	cam_z_pos = povObj.getAttribute('position').z;
	// Y position on PoV Cameras should *always* be 1.6!
	// https://docs.unrealengine.com/latest/INT/Platforms/VR/ContentSetup/index.html#vrcamerasetup
	camera.setAttribute('position', {
		x: cam_x_pos,
		y: 1.6,
		z: cam_z_pos
	});
	camera.setAttribute('rotation', {
		x: 1,
		y: 1,
		z: 1
	});
	var lookControls = document.createAttribute('look-controls');
	camera.setAttributeNode(lookControls);
	// camera.removeAttribute('mouse-cursor');
	camera.flushToDOM();
	onGround = true;
};
// Simple function to reset camera postion to original settings.
function resetCamera()
{
	camera = document.getElementById('camera');
	camera.setAttribute('position', {
		x: (gridLoader['columns'] / 2),
		y: 25,
		z: (gridLoader['rows'] / 2)
	});
	camera.setAttribute('rotation', {
		x: -90,
		y: 0,
		z: 0
	});
	camera.removeAttribute('look-controls');
	camera.flushToDOM();
	onGround = false;
}
// Resets cell states that an object used to have.
function resetCellStates(cells)
{
	for(var i = 0; i < cells.length; i++)
	{
		var coords = cells[i].split('-');
		gridCellsState[coords[coords.length-1]][coords[coords.length-2]] = '0';
	}
};
// Replaces 1st parameter's material properties with defaults of 2nd parameter,
// unless only one parameter then replace current material with default material
function swapMaterials(toBeReplaced, toBeReplacedWith)
{
	if(toBeReplacedWith === undefined) toBeReplacedWith = toBeReplaced;
	if(toBeReplaced.getAttribute('materialType') === 'primitive')
	{
		toBeReplaced.setAttribute('material', 'color', toBeReplacedWith.getAttribute('defaultColor'));
	}
	else if(toBeReplaced.getAttribute('materialType') === 'textured')
	{
		toBeReplaced.setAttribute('material', 'src', toBeReplacedWith.getAttribute('objectSource'));
		toBeReplaced.setAttribute('material', 'repeat', toBeReplacedWith.getAttribute('repeat'));
		toBeReplaced.setAttribute('material', 'color', '');
	}
	else
	{
		if(toBeReplaced.getAttribute('materialSource') !== '' && toBeReplaced.getAttribute('materialSource') !== null) toBeReplaced.setAttribute('mtl', toBeReplacedWith.getAttribute('materialSource'));
		else toBeReplaced.setAttribute('material', 'color', toBeReplacedWith.getAttribute('defaultColor'));
	}
	toBeReplaced.flushToDOM();
}