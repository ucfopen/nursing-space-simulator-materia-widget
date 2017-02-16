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
var activeClicked = null;
var activeHover = null;
var activeCells = [];
// 0 means unoccupied, 1 mean occupied.
var gridCellsState = [];
var cellSpacing = 0.05;
var assets = [];
var keyDown = false;
var onGround = false;

var assetIndex = 0;
var assetsShown = 4;
var assetCatalog = [];

// The one function to rule them all.
function init()
{
	buildScene();
	keyboardEventSetup();
	var cam = document.getElementById('camera');
	cam.setAttribute('position', {
		x: (data.gridLoader['columns'] / 2),
		y: 25,
		z: (data.gridLoader['rows'] / 2)
	});
	cam.flushToDOM();
	// Create an observer to observe camera attributes (meant for POV).
	cam.addEventListener('componentchanged', function (evt)
	{
		// Using orbital controls, move decapitated body around y-axis.
		if (evt.detail.name === 'rotation')
		{
			activeElement.element.setAttribute('rotation', {
				x: activeElement.element.getAttribute('rotation').x,
				y: cam.getAttribute('rotation').y,
				z: activeElement.element.getAttribute('rotation').z
			});
		}
	});
};

// attach click listeners to the Asset Picker
function attachUIListeners() 
{
	var prev = document.getElementById("previous-asset");
	var next = document.getElementById("next-asset");

	prev.addEventListener('click', function(e) { updateAssetPicker(-1); });
	next.addEventListener('click', function(e) { updateAssetPicker(1); })

	for(var assetEl of document.getElementsByClassName('asset')) {
		assetEl.addEventListener('click', function(e){ 
			var name = this.innerHTML;
			console.log(name);
			// TODO set activeElement
		});
	}
}
// Mouse events functionality on the assets
function attachAssetListeners(obj)
{
	// Hover over the asset
	obj.addEventListener('mouseenter', function ()
	{
		// If viewpoint is on the ground, don't change color.
		// If mouse hovers over asset that is active, don't change color.
		// If there is an active asset and it can't replace the hovered assets type, don't change color.
		// If nothing is active AND asset os permanent fixture loaded from gridString (ie. wall), don't change color.
		if(onGround) return;
		else if(this.classList.contains('active')) return;
		else if(activeElement.activated === true && activeElement.element.getAttribute('canReplace').indexOf(this.getAttribute('type')) <= -1 && this.getAttribute('isCloned') === 'true') return;
		else if(activeElement.activated === false && this.getAttribute('isPermanent') === 'true') return;
		makeActiveHover(this);
	});
	// No longer hovering over asset
	obj.addEventListener('mouseleave', function ()
	{
		if(this.classList.contains('active') || onGround) return;
		if(activeHover !== null) removeActiveHover();
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
			if(activeHover !== null) removeActiveHover();
			if(activeClicked !== null) removeActiveClicked();
			activeElement.element = null;
			activeElement.activated = false;
			deleteAsset(this);
		}
		// Asset wasn't active before, and some (not cloned) asset types can replace it.
		else if(activeElement.activated === true &&
				activeElement.canReplace.indexOf(this.getAttribute('type')) > -1 &&
				activeElement.isCloned === 'false' &&
				this.getAttribute('isCloned') === 'true')
		{
			this.setAttribute('vertical', activeElement.vertical);
			this.setAttribute('horizontal', activeElement.horizontal);
			// Making sure to replace asset's material with the correct combination of color, .mtl, and/or .obj
			swapMaterials(this, activeElement.element);
		}
		// Asset wasn't active before, but will be now.
		else
		{
			if(this.getAttribute('movable') === 'false') return;
			// Activates the selected asset after deactivating all others.
			if(activeElement.activated === true) removeActive();
			this.classList.add('active');
			activeElement.element = this;
			activeElement.activated = true;
			activeElement.isCloned = this.getAttribute('isCloned');
			activeElement.assetRotationState = this.getAttribute('assetRotationState');
			activeElement.canReplace = this.getAttribute('canReplace');
			activeElement.cellsOwned = this.getAttribute('cellsOwned');
			activeElement.horizontal = this.getAttribute('horizontal');
			activeElement.vertical = this.getAttribute('vertical');

			if(activeHover !== null) removeActiveHover();
			makeActiveClicked();
		}
		// Manually ensure a-frame pushes changes to the HTML DOM.
		this.flushToDOM();
	});
};
function attachGridCellEventListeners()
{
	// Attaches mouse events to the grid cells.
	var cells = document.querySelectorAll('.grid');
	for(var i = 0; i < cells.length; i++)
	{
		// Hovering over cell
		cells[i].addEventListener('mouseenter', highlightCells);
		// Mouse cursor has left the cell.
		cells[i].addEventListener('mouseleave', function ()
		{
			if(onGround) return;
			else if(activeElement.activated) clearCells();
		});
		// Mouse cursor has clicked the cell.
		cells[i].addEventListener('click', function ()
		{
			if(onGround || activeElement.activated === 'false' || activeElement.element.getAttribute('isPermanent') === 'true') return;
			else if(activeElement.activated && activeElement.element.getAttribute('movable') === 'false') return;
			// If asset has been activated, place it on this cell.
			if(activeElement.activated)
			{
				// Position of cell you clicked.
				var cellPosition = this.getAttribute('position');
				// Get asset's scale (helps with putting bottom of asset on ground).
				var assetPosY = activeElement.element.getAttribute('position').y;
				// If cells are out of bounds, function returns false, and new position skipped.
				var idContents = this.id.split('-');
				var x = idContents[idContents.length-2];
				var z = idContents[idContents.length-1];
				if(!checkBoundaries(false, idContents, x, z, activeElement.horizontal, activeElement.vertical)) return;

				// Stand-in variable in case we're not using the active asset.
				var theElementToMove = activeElement.element;
				// If active object wasn't a clone, make a clone, unless it was a 'structure object, or viewer.
				if(activeElement.isCloned === 'false' && activeElement.element.id !== 'pov-camera')
				{
					// Remove the active color and related class.
					swapMaterials(activeElement.element);
					// Update cells owned by this asset.
					changeCellsOwned(this, false);
					// Clone the asset.
					theElementToMove = clone(activeElement.element);
					// Remove activeElement's cells owned now.
					activeElement.cellsOwned = '';
				}
				else
				{
					// Update cells owned by this asset.
					changeCellsOwned(this, false);
				}
				// Place the clone in the scene on top of clicked grid cell.
				// We add one to the horizontal and vertical because of the discrepancies between 'size'
				// and 'scale' when dealing with imported object assets. Since one blobk is 0 and two blocks
				// is one in either direction, we must first add one to express it's proper 'size' in that direction.
				theElementToMove.setAttribute('position', {
					x: cellPosition.x + ((Number(theElementToMove.getAttribute('horizontal')) + 1) / 2.0) - 0.5,
					y: assetPosY,
					z: cellPosition.z + ((Number(theElementToMove.getAttribute('vertical')) + 1) / 2.0) - 0.5
				});
				// Make sure clone is manually pushed to HTML DOM.
				theElementToMove.flushToDOM();
				if(activeClicked !== null) removeActiveClicked();
				makeActiveClicked();
				// If this is the PoV camera object.
				if(activeElement.element.id === 'pov-camera')
				{
					// Calling placeCamera to handle camera arrangements.
					placeCamera();
				}
				this.setAttribute('material', 'color', '#C1D2CC');
			}
		});
	}
};
function buildAssets()
{
	var assetContainer = document.getElementById('asset-picker');
	var assetItems = document.getElementsByClassName('asset');
	assetsShown = assetItems.length;

	for(var index in data.assetsFromFile) 
	{
		if (data.assetsFromFile.hasOwnProperty(index))
		{
			var attr = data.assetsFromFile[index];
			createAsset(attr);
			assetCatalog.push({'name': index, 'details': attr});

		}
	}
	updateAssetPicker(0);
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
		x: (data.gridLoader['columns'] / 2.0) - (0.5),
		y: 3,
		z: (data.gridLoader['rows'] / 2.0)
	});
	// Renders face of plane downward, invisible from above, but visible at ground-level.
	ceiling.setAttribute('rotation', {x: 90, y: 0, z: 0});
	// Uses the gridLoader string to determine the full dimensions of the 'rooms' portion of scene.
	ceiling.setAttribute('height', data.gridLoader['rows']);
	ceiling.setAttribute('width', data.gridLoader['columns']);
	// Try to use texture with dimensions at power of 2 (ie. 128x128, 256x256, 512x512).
	ceiling.setAttribute('material', 'src', 'assets/CEILING_TILE.jpg');
	// Again use powers of 2 for best results (ie. '1 1', '2 2', '4 4', '8 8', etc.).
	ceiling.setAttribute('material', 'repeat', '16 16');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	ceiling.flushToDOM();
};
function buildScene()
{
	var grid = data.gridLoader['content'].split('-');
	// Parses the load string into the gridCellsState for easier building.
	var indexCounter = 0;
	var n = 0;
	do
	{
		gridCellsState[indexCounter] = [];
		for(var w = 0; w < data.gridLoader['columns']; w++)
		{
			// Creates gridcellsstate as each cell is pulled from loader string.
			gridCellsState[indexCounter][w] = grid[n];
			n++;
		}
		indexCounter++;
	} while(indexCounter < data.gridLoader['rows']);
	// Uses the gridCellsState double array to populate the scene.
	for(var i = 0; i < data.gridLoader['columns']; i++)
	{
		for(var j = 0; j < data.gridLoader['rows']; j++)
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
					createAsset(data.assetsFromFile['door-1'], i, j, true);
					break;
				}
				case 'd2':
				{
					createAsset(data.assetsFromFile['door-2'], i, j, true);
					break;
				}
				case 'w1':
				{
					createAsset(data.assetsFromFile['wall-1'], i, j, true);
					break;
				}
				case 'w2':
				{
					createAsset(data.assetsFromFile['wall-2'], i, j, true);
					break;
				}
				case 'w3':
				{
					createAsset(data.assetsFromFile['wall-3'], i, j, true);
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
	attachUIListeners();
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
			// Correction to make sure collision isn't with the active object./*
			var everythingIsOkFlag = true;
			for(var k = 0; k < cells.length; k++)
			{
				var nextCell = cells[k].split('-');
				if(Number(nextCell[1]) !== (Number(x) + i) && Number(nextCell[2]) !== (Number(z) + j))
				{
					everythingIsOkFlag = false;
					break;
				}
			}
			// Collision is with same object. Let it go. Don't worry about it.
			if(everythingIsOkFlag) continue;
			var cell = 'cell-' + (Number(x) + i) + '-' + (Number(z) + j);
			var cellToClaim = document.getElementById(cell);
			if(cellToClaim === null) return false;
			if(isRotation && gridCellsState[(Number(z) + j)][(Number(x) + i)] === 1) return false;
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
	clonedObject.id = obj.id + '-clone-' + Math.random(100000);
	// Helps not to duplicate cloned objects.
	clonedObject.setAttribute('isCloned', 'true');
	clonedObject.setAttribute('clonable', 'false');
	clonedObject.classList.remove('active');
	// Put it in the scene.
	document.querySelector('a-scene').appendChild(clonedObject);
	// Give new object same listeners as the original.
	attachAssetListeners(clonedObject);
	// keep all assets in same array.
	assets.push(clonedObject);
	return clonedObject;
};
function createAsset(details, x, z, isPermanent)
{
	var mainContainer = document.querySelector('a-scene');
	var asset = document.createElement(details['tag']);
	asset.id = details['id'];
	mainContainer.appendChild(asset);
	// Makes adjustments to the asset based off loadString load string or clonable assets.
	if(x === null || x === undefined)
	{
		asset.setAttribute('position', {
			x: details['position'].x,
			y: details['position'].y,
			z: details['position'].z
		});
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
	asset.setAttribute('rotation', details['rotation']);
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

// Highlights grid cells, typically when mouse hovers over them.
function highlightCells()
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
			/** Dan's ghost object code -- Start
			**activeElement.element.setAttribute('position', {
			**	x: Number(x),
			**	y: 1,
			**	z: Number(z),
			**});
			**activeElement.element.setAttribute('material', 'transparent', true);
			**activeElement.element.setAttribute('material', 'opacity', '0.35');
			**Dan's ghost object Code -- End **/
			
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
		/** Dan's ghost object code -- Start
		// hide it
		**else 
		**{
		**	activeElement.element.setAttribute('material', 'opacity', '0');
		**}
		**Dan's ghost object Code -- End **/
	}
};
// All keyboard events are handled here.
function keyboardEventSetup()
{
	document.addEventListener('keydown', function(event)
	{
		const keyName = event.key;

		if (keyName === 'r' && !keyDown && !onGround)
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
				var assetPosY = activeElement.element.getAttribute('position').y;

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
				// We add one to the horizontal and vertical because of the discrepancies between 'size'
				// and 'scale' when dealing with imported object assets. Since one blobk is 0 and two blocks
				// is one in either direction, we must first add one to express it's proper 'size' in that direction.
				activeElement.element.setAttribute('position', {
					x: cellPosition.x + ((Number(activeElement.horizontal) + 1) / 2.0) - 0.5,
					y: assetPosY,
					z: cellPosition.z + ((Number(activeElement.vertical) + 1) / 2.0) - 0.5
				});
			}
			// clear and rehighlight cells on rotation
			var originCell;
			if(activeCells.length > 0) {
				// Origin Cell is assumed to be first in list (usually horz and vert = 0)
				originCell = activeCells[0];
				clearCells();
				// call highlightCells() using the originCell as the 'this'
				highlightCells.apply(originCell);
			}

			activeElement.element.flushToDOM();
			if(activeClicked !== null) removeActiveClicked();
			makeActiveClicked();
			return;
		}
		// Move camera toward top of screen
		if ( (keyName === 'w' || keyName === 'ArrowUp') && !onGround )
		{
			var cam = document.getElementById('camera');
			cam.setAttribute('position', {
				x: cam.getAttribute('position').x,
				y: cam.getAttribute('position').y,
				z: cam.getAttribute('position').z - 1,
			});
		}
		// Move camera toward bottom of screen
		if ( (keyName === 's' || keyName === 'ArrowDown') && !onGround )
		{
			var cam = document.getElementById('camera');
			cam.setAttribute('position', {
				x: cam.getAttribute('position').x,
				y: cam.getAttribute('position').y,
				z: cam.getAttribute('position').z + 1,
			});
		}
		// Move camera toward left of screen
		if ( (keyName === 'a' || keyName === 'ArrowLeft') && !onGround )
		{
			var cam = document.getElementById('camera');
			cam.setAttribute('position', {
				x: cam.getAttribute('position').x - 1,
				y: cam.getAttribute('position').y,
				z: cam.getAttribute('position').z,
			});
		}
		// Move camera toward right of screen
		if ( (keyName === 'd' || keyName === 'ArrowRight') && !onGround )
		{
			var cam = document.getElementById('camera');
			cam.setAttribute('position', {
				x: cam.getAttribute('position').x + 1,
				y: cam.getAttribute('position').y,
				z: cam.getAttribute('position').z,
			});
		}
		// Move camera into the screen
		if (keyName === 'z' && !onGround)
		{
			var cam = document.getElementById('camera');
			cam.setAttribute('position', {
				x: cam.getAttribute('position').x,
				y: cam.getAttribute('position').y - 1,
				z: cam.getAttribute('position').z,
			});
		}
		// Move camera away from the screen
		if (keyName === 'x' && !onGround)
		{
			var cam = document.getElementById('camera');
			cam.setAttribute('position', {
				x: cam.getAttribute('position').x,
				y: cam.getAttribute('position').y + 1,
				z: cam.getAttribute('position').z,
			});
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
// Creates and places the green plane beneath the active asset.
function makeActiveClicked()
{
	var position;
	var size = {};
	position = activeElement.element.getAttribute('position');
	var horizontal = Number(activeElement.element.getAttribute('horizontal'))
	var vertical = Number(activeElement.element.getAttribute('vertical'));
	if(horizontal === 0) size.x = 1.5;
	else size.x = 1 + ((horizontal + 1) * 0.5);
	if(vertical === 0) size.y = 1.5;
	else size.y = 1 + ((vertical + 1) * 0.5);
	size.z = 1;

	var mainContainer = document.querySelector('a-scene');
	activeClicked = document.createElement('a-plane');
	activeClicked.id = 'active-hover';
	activeClicked.setAttribute('material', 'color', '#00FF00');
	activeClicked.setAttribute('rotation', {x: -90, y: 0, z: 0 });
	activeClicked.setAttribute('width', size.x);
	activeClicked.setAttribute('height', size.y);
	mainContainer.appendChild(activeClicked);

	activeClicked.setAttribute('position', {x: position.x, y: 0, z: position.z});
	activeClicked.setAttribute('scale', {x: size.x, y: size.y, z: size.z});
	activeClicked.setAttribute('material', 'transparent', true);
	activeClicked.setAttribute('material', 'opacity', '0.5');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	activeClicked.flushToDOM();
};

// Creates and places the yellow plane beneath the asset where the mouse is hovering.
function makeActiveHover(asset)
{
	var position;
	var size = {};
	position = asset.getAttribute('position');
	var horizontal = Number(asset.getAttribute('horizontal'))
	var vertical = Number(asset.getAttribute('vertical'));
	if(horizontal === 0) size.x = 1.5;
	else size.x = 1 + ((horizontal + 1) * 0.5);
	if(vertical === 0) size.y = 1.5;
	else size.y = 1 + ((vertical + 1) * 0.5);
	size.z = 1;

	var mainContainer = document.querySelector('a-scene');
	activeHover = document.createElement('a-plane');
	activeHover.id = 'active-hover';
	activeHover.setAttribute('material', 'color', 'yellow');
	activeHover.setAttribute('rotation', {x: -90, y: 0, z: 0 });
	activeHover.setAttribute('width', size.x);
	activeHover.setAttribute('height', size.y);
	mainContainer.appendChild(activeHover);

	activeHover.setAttribute('position', {x: position.x, y: 0, z: position.z});
	activeHover.setAttribute('scale', {x: size.x, y: size.y, z: size.z});
	activeHover.setAttribute('material', 'transparent', true);
	activeHover.setAttribute('material', 'opacity', '0.5');
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	activeHover.flushToDOM();
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
		x: 0,
		y: 0,
		z: 0
	});
	var lookControls = document.createAttribute('look-controls');
	camera.setAttributeNode(lookControls);
	// camera.removeAttribute('mouse-cursor');
	camera.flushToDOM();
	onGround = true;
};
// Removes the active class from any object that has it
function removeActive()
{
	activeElement.element = null;
	activeElement.activated = false;
	if(activeClicked !== null) removeActiveClicked();
	for(var i = 0; i < assets.length; i++)
	{
		swapMaterials(assets[i]);
		assets[i].classList.remove('active');
	}
};
// Removes activeClicked from scene.
function removeActiveClicked()
{
	var mainContainer = document.querySelector('a-scene');
	mainContainer.removeChild(activeClicked);
	activeClicked = null;
};
// Removes activeHover from scene.
function removeActiveHover()
{
	var mainContainer = document.querySelector('a-scene');
	mainContainer.removeChild(activeHover);
	activeHover = null;
};
// Simple function to reset camera postion to original settings.
function resetCamera()
{
	camera = document.getElementById('camera');
	camera.setAttribute('position', {
		x: (data.gridLoader['columns'] / 2),
		y: 25,
		z: (data.gridLoader['rows'] / 2)
	});
	camera.setAttribute('rotation', {
		x: -90,
		y: 0,
		z: 0
	});
	camera.removeAttribute('look-controls');
	camera.flushToDOM();
	onGround = false;
};
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
		toBeReplaced.setAttribute('defaultColor', toBeReplacedWith.getAttribute('defaultColor'));
	}
	else if(toBeReplaced.getAttribute('materialType') === 'textured')
	{
		toBeReplaced.setAttribute('material', 'src', toBeReplacedWith.getAttribute('objectSource'));
		toBeReplaced.setAttribute('objectSource', toBeReplacedWith.getAttribute('objectSource'));
		toBeReplaced.setAttribute('material', 'repeat', toBeReplacedWith.getAttribute('repeat'));
		toBeReplaced.setAttribute('repeat', toBeReplacedWith.getAttribute('repeat'));
		toBeReplaced.setAttribute('material', 'color', '');
		toBeReplaced.setAttribute('defaultColor', '');
	}
	else
	{
		if(toBeReplaced.getAttribute('materialSource') !== '' && toBeReplaced.getAttribute('materialSource') !== null)
		{
			toBeReplaced.setAttribute('mtl', toBeReplacedWith.getAttribute('materialSource'));
			toBeReplaced.setAttribute('materialSource', toBeReplacedWith.getAttribute('materialSource'));
		}
		else
		{
			toBeReplaced.setAttribute('material', 'color', toBeReplacedWith.getAttribute('defaultColor'));
			toBeReplaced.setAttribute('defaultColor', toBeReplacedWith.getAttribute('defaultColor'));
		}
	}
	toBeReplaced.flushToDOM();
};
// update the assetpicker icons by advancing assetIndex forward or backward via change variable
function updateAssetPicker(change) {
	var updatedIndex = Math.max(0, Math.min(assetIndex + change, assetCatalog.length - assetsShown));
	// TODO only update if updatedIndex is different then assetIndex ??
	assetIndex = updatedIndex;
	var i = assetIndex;
	for(var assetEl of document.getElementsByClassName('asset')) {
		assetEl.innerHTML = assetCatalog[i++].name;
		assetEl.style.background = "url('../assets/HOSPITAL_BED_2D.png') no-repeat center center";
		assetEl.style.backgroundSize = "100% 100%";
	}
}