// Global Variables. Just for now to keep demo simple.
var activeElement = {
	element: null,
	activated: false
};
var assets = [];
var keyDown = false;
// The one function to rule them all.
function init()
{
	setup();
	buildGrid();
	buildAssets();
	keyboardEventSetup();
};
// Mouse events functionality on the assets
function attachAssetListeners(obj)
{
	// Hover over the asset
	obj.addEventListener('mouseenter', function () {
		if(this.classList.contains("active")) return;
		this.setAttribute('material', 'color', 'red');
	});
	// No longer hovering over asset
	obj.addEventListener('mouseleave', function () {
		if(this.classList.contains("active")) return;
		this.setAttribute('material', 'color', '#FF00FF');
	});
	// Clicked on asset
	obj.addEventListener('click', function () {
		// Asset already active, remove active modifiers
		if(this.classList.contains("active") && this.getAttribute("isCloned") === "false")
		{
			// Deactivates the selected asset
			this.setAttribute('material', 'color', 'red');
			this.classList.remove("active");
			activeElement.element = null;
			activeElement.activated = false;
		}
		// Clicking on an active asset that is also a clone will delete that clone.
		else if(this.classList.contains("active") && this.getAttribute("isCloned") === "true")
		{
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
			this.classList.add("active");
			activeElement.element = this;
			activeElement.activated = true;
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
				var idContents = this.id.split("-");
				var x = idContents[idContents.length-2];
				var z = idContents[idContents.length-1];
				var horizontal = activeElement.element.getAttribute("horizontal");
				var vertical = activeElement.element.getAttribute("vertical");

				if(horizontal > 0 || vertical > 0)
				{
					for(var i = 0; i <= horizontal; i++)
					{
						for(var j = 0; j <= vertical; j++)
						{
							var id = "cell-" + (Number(x) + i) + "-" + (Number(z) + j);
							var cellToHighlight = document.getElementById(id);
							if(cellToHighlight === null)
							{
								clearCells();
								return;
							}
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
				if(!changeCellsOwned(this)) return;
				// If active object wasn't a clone, make a clone.
				if(activeElement.element.getAttribute("isCloned") === "false")
				{
					// Remove the active color and related class.
					activeElement.element.setAttribute('material', 'color', '#FF00FF');
					activeElement.element.classList.remove("active");
					// Clone the asset.
					activeElement.element = clone(activeElement.element);
					// Make the clone the active asset
					activeElement.element.classList.add("active");
					activeElement.element.setAttribute('material', 'color', '#00FF00');
				}
				// Place the clone in the scene on top of clicked grid cell.
				var assetRotationState = activeElement.element.getAttribute("assetRotation");
				// Local rotation is different from world, this resolves problem.
				if(assetRotationState % 2 === 0)
				{
					activeElement.element.setAttribute('position', {
						x: cellPosition.x + (assetSize.x / 2) - 0.5,
						y: (assetSize.y / 2.0),
						z: cellPosition.z + (assetSize.z / 2) - 0.5
					});
				}
				else
				{
					activeElement.element.setAttribute('position', {
						x: cellPosition.x + (assetSize.z / 2) - 0.5,
						y: (assetSize.y / 2.0),
						z: cellPosition.z + (assetSize.x / 2) - 0.5
					});
				}
				// Make sure clone is manually pushed to HTML DOM.
				activeElement.element.flushToDOM();
			}
		});
	}
};
function buildAssets()
{
	// Makes adjustments to the pretend asset (cube).
	var box = document.getElementById("asset-1");
	box.setAttribute('position', {x: 15, y: 0.5, z: 0});
	box.setAttribute('material', 'color', '#FF00FF');
	// Helps not to duplicate cloned objects.
	box.setAttribute("isCloned", false);
	// Contains which cells it occupies.
	box.setAttribute("cellsOwned", "");
	// Contains what rotation state it has (for later evaluation).
	// 0 is default. 1 is clockwise 90 degrees, 2 is 180 degrees, 3 is is 270 degrees. 
	box.setAttribute("assetRotation", "0");
	// Helps to highlight which cells will be occupied due to shape.
	box.setAttribute("horizontal", 0);
	box.setAttribute("vertical", 0);
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	box.flushToDOM();
	attachAssetListeners(box);
	// Adds this fake asset to the array of assets (easier to search through them)
	assets.push(box);

	var rectangle = document.getElementById("asset-2");
	rectangle.setAttribute('scale', {x: 2, y: 1, z: 1});
	rectangle.setAttribute('position', {x: 15, y: 0.5, z: 2});
	rectangle.setAttribute('material', 'color', '#FF00FF');
	// Helps not to duplicate cloned objects.
	rectangle.setAttribute("isCloned", false);
	// Contains which cells it occupies.
	rectangle.setAttribute("cellsOwned", "");
	// Contains what rotation state it has (for later evaluation).
	// 0 is default. 1 is clockwise 90 degrees, 2 is 180 degrees, 3 is is 270 degrees. 
	rectangle.setAttribute("assetRotation", "0");
	// Helps to highlight which cells will be occupied due to shape.
	rectangle.setAttribute("horizontal", 1);
	rectangle.setAttribute("vertical", 0);
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	rectangle.flushToDOM();
	attachAssetListeners(rectangle);
	// Adds this fake asset to the array of assets (easier to search through them)
	assets.push(rectangle);

	var largeBox = document.getElementById("asset-3");
	largeBox.setAttribute('scale', {x: 2, y: 1, z: 2});
	largeBox.setAttribute('position', {x: 15, y: 0.5, z: 4});
	largeBox.setAttribute('material', 'color', '#FF00FF');
	// Helps not to duplicate cloned objects.
	largeBox.setAttribute("isCloned", false);
	// Contains which cells it occupies.
	largeBox.setAttribute("cellsOwned", "");
	// Contains what rotation state it has (for later evaluation).
	// 0 is default. 1 is clockwise 90 degrees, 2 is 180 degrees, 3 is is 270 degrees. 
	largeBox.setAttribute("assetRotation", "0");
	// Helps to highlight which cells will be occupied due to shape.
	largeBox.setAttribute("horizontal", 1);
	largeBox.setAttribute("vertical", 1);
	// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
	largeBox.flushToDOM();
	attachAssetListeners(largeBox);
	// Adds this fake asset to the array of assets (easier to search through them)
	assets.push(largeBox);
};
function buildGrid()
{
	// Makes adjustments to the grid cell.
	var planes = document.querySelectorAll('a-plane');
	for(var i = 0; i < 10; i++)
	{
		/* i is base x-coord. If cell is increased in scale along x-axis,
		** multiply i by the amount (ie. (i * 10) for scale-x: 10).
		** 0.5 refers to half the cell size, since the plane is drawn out from its center point.
		** (0.05 * i) creates the thin, empty space between cells for the grid effect.
		** Increase or decrease the 0.05 to make gaps thinner or thicker.
		*/
		var xCoord = (i-5) + 0.5 + (0.05 * i);
		for(var j = 0; j < 10; j++)
		{
			/* j is base z-coord. If cell is increased in scale along z-axis,
			** multiply j by the amount (ie. (j * 10) for scale-z: 10).
			** 0.5 refers to half the cell size, since the plane is drawn out from its center point.
			** (0.05 * j) creates the thin, empty space between cells for the grid effect.
			** Increase or decrease the 0.05 to make gaps thinner or thicker.
			*/
			var zCoord = (j-5) + 0.5 + (0.05 * j);
			planes[(i*10)+j].setAttribute('position', {x: xCoord, y: 0, z: zCoord});
			planes[(i*10)+j].setAttribute('rotation', {x: -90, y: 0, z: 0});
			planes[(i*10)+j].setAttribute('material', 'color', '#7BC8A4');
			// Necessary for event listeners.
			planes[(i*10)+j].classList.add("grid");
			// Necessary to easily track state of asset locations.
			planes[(i*10)+j].id = "cell-" + i + "-" + j;
			// Helps not to duplicate cloned objects.
			planes[(i*10)+j].setAttribute("isCloned", false);
			// Sometimes necessary to force the HTML DOM to redraw these pseudo-dom elements.
			planes[(i*10)+j].flushToDOM();
		}
	}
	attachGridCellEventListeners();
};
function checkBoundaries(idContents, x, z, horizontal, vertical)
{
	for(var i = 0; i <= horizontal; i++)
	{
		for(var j = 0; j <= vertical; j++)
		{
			var cell = "cell-" + (Number(x) + i) + "-" + (Number(z) + j);
			var cellToClaim = document.getElementById(cell);
			if(cellToClaim === null)
			{
				return false;
			}
		}
	}
	return true;
};
// Changes cells asset owns unless out of bounds.
function changeCellsOwned(activeCell)
{
	var idContents = activeCell.id.split("-");
	var x = idContents[idContents.length-2];
	var z = idContents[idContents.length-1];
	var horizontal = activeElement.element.getAttribute('horizontal');
	var vertical = activeElement.element.getAttribute('vertical');
	if(!checkBoundaries(idContents, x, z, horizontal, vertical)) return false;
	// Gives the new cells to that asset clone.
	activeElement.element.setAttribute('cellsOwned', '');
	for(var i = 0; i <= horizontal; i++)
	{
		for(var j = 0; j <= vertical; j++)
		{
			var cell = "cell-" + (Number(x) + i) + "-" + (Number(z) + j);
			var cellToClaim = document.getElementById(cell);
			var currentCellsOwned = activeElement.element.getAttribute('cellsOwned');
			if(currentCellsOwned !== '') activeElement.element.setAttribute('cellsOwned', (currentCellsOwned + "," + cell));
			else activeElement.element.setAttribute('cellsOwned', cell);
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
	if (null == obj || "object" != typeof obj) return obj;
	// Create a new object of same type.
	var copyType = obj.getAttribute("geometry")["primitive"];
	var clonedObject = document.createElement("a-" + copyType);
	// Copy over its essential attributes.
	clonedObject.setAttribute("material", obj.getAttribute("material"));
	clonedObject.setAttribute("scale", obj.getAttribute("scale"));
	clonedObject.setAttribute("rotation", obj.getAttribute("rotation"));
	// Contains which cells it occupies.
	clonedObject.setAttribute("cellsOwned", obj.getAttribute("cellsOwned"));
	// Contains what rotation state it has (for later evaluation).
	// 0 is default. 1 is clockwise 90 degrees, 2 is 180 degrees, 3 is is 270 degrees.
	clonedObject.setAttribute("assetRotation", obj.getAttribute("assetRotation"));
	// Helps to highlight which cells will be occupied due to shape.
	clonedObject.setAttribute("horizontal", obj.getAttribute("horizontal"));
	clonedObject.setAttribute("vertical", obj.getAttribute("vertical"));
	// Helps not to duplicate cloned objects.
	clonedObject.setAttribute("isCloned", true);
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
			// Place the clone in the scene on top left grid cell.
			var cellsOwned = activeElement.element.getAttribute('cellsOwned');
			var cellsOwnedContents = cellsOwned.split(",");
			var cornerCell = document.getElementById(cellsOwnedContents[0]);
			var position = cornerCell.getAttribute('position');
			var scale = activeElement.element.getAttribute('scale');
			// Adjust cell that will be occupied under new rotation.
			var horizontal = activeElement.element.getAttribute("horizontal");
			var vertical = activeElement.element.getAttribute("vertical");
			activeElement.element.setAttribute("horizontal", vertical);
			activeElement.element.setAttribute("vertical", horizontal);
			var inBounds = changeCellsOwned(cornerCell);
			if(!inBounds)
			{
				// New position is out of bounds. Change back.
				var horizontal = activeElement.element.getAttribute("horizontal");
				var vertical = activeElement.element.getAttribute("vertical");
				activeElement.element.setAttribute("horizontal", vertical);
				activeElement.element.setAttribute("vertical", horizontal);
			}
			// If clone, Make sure new rotation position is within bounds before rotation.
			if(activeElement.element.getAttribute("isCloned") === 'false' || inBounds)
			{
				// Rotate the actual asset.
				var assetRotation = activeElement.element.getAttribute("rotation");
				activeElement.element.setAttribute("rotation", {x: assetRotation.x, y: (assetRotation.y + 90), z: assetRotation.z});
				// Increments to the next rotation state (used to calculate horizontal and vertical shape change).
				var assetRotationState = activeElement.element.getAttribute("assetRotation");
				assetRotationState++;
				if(assetRotationState >= 4) assetRotationState = 0;
				activeElement.element.setAttribute("assetRotation", assetRotationState);
			}
			// If not a clone, stop here. Keep original asset position the same.
			if(activeElement.element.getAttribute("isCloned") === 'true' && inBounds)
			{
				// Local rotation is different from world, this resolves problem.
				if(assetRotationState % 2 === 0)
				{
					activeElement.element.setAttribute('position', {
						x: position.x + (scale.x / 2) - 0.5,
						y: (scale.y / 2.0),
						z: position.z + (scale.z / 2) - 0.5
					});
				}
				else
				{
					activeElement.element.setAttribute('position', {
						x: position.x + (scale.z / 2) - 0.5,
						y: (scale.y / 2.0),
						z: position.z + (scale.x / 2) - 0.5
					});
				}
			}
			activeElement.element.flushToDOM();
			return;
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
		assets[i].classList.remove("active");
	}
};
function setup()
{
	var mainContainer = document.querySelector('a-scene');
	// Create the grid cells, and append to scene.
	for(var i = 1; i <= 100; i++)
	{
		var plane = document.createElement("a-plane");
		mainContainer.appendChild(plane);
	}
	// Create the assets, and append to scene.
	var box = document.createElement("a-box");
	box.id = "asset-1";
	mainContainer.appendChild(box);
	// Create the assets, and append to scene.
	var rectangle = document.createElement("a-box");
	rectangle.id = "asset-2";
	mainContainer.appendChild(rectangle);
	// Create the assets, and append to scene.
	var largeBox = document.createElement("a-box");
	largeBox.id = "asset-3";
	mainContainer.appendChild(largeBox);
};