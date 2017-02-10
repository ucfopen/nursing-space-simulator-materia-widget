AFRAME.registerComponent('asset-picker', {
	schema: {
		showAmount: { type: 'number', default: 5 },
		itemWidth: { type: 'number', default: 5 },
		itemHeight: { type: 'number', default: 5 }
	},

	init: function() {
		var self = this;
		this.assetList = [];
		this.currentIndex = 0;
		this.showAmount = this.data.showAmount;

		// Create Back Button
		this.previousElement = document.createElement('a-plane');
		this.previousElement.setAttribute('material', 'color', '#FF0000');
		this.previousElement.setAttribute('rotation', {x: -90, y: 0, z: 0 });
		this.previousElement.setAttribute('width', this.data.itemWidth);
		this.previousElement.setAttribute('height', this.data.itemHeight);
		this.previousElement.setAttribute('position', {x: 0, y: 0, z: 0});

		this.previousElement.addEventListener('click', this.previous);
		this.el.appendChild(this.previousElement);

		// Create Next Button
		this.nextElement = document.createElement('a-plane');		
		this.nextElement.setAttribute('material', 'color', '#0000FF');
		this.nextElement.setAttribute('rotation', {x: -90, y: 0, z: 0 });
		this.nextElement.setAttribute('width', this.data.itemWidth);
		this.nextElement.setAttribute('height', this.data.itemHeight);
		this.nextElement.setAttribute('position', {x: (this.data.itemWidth + 0.25) * ( this.showAmount + 1 ), y: 0, z: 0});
		this.nextElement.addEventListener('click', this.next);

		this.el.appendChild(this.nextElement);

		// Create individual item placeholders
		this.items = [];
		for(var i = 0; i < this.showAmount; i++) {
			var item = document.createElement('a-plane');
			item.id = "item-" + i;
			item.setAttribute('material', 'color', '#000000');
			item.setAttribute('rotation', {x: -90, y: 0, z: 0 });
			item.setAttribute('width', this.data.itemWidth);
			item.setAttribute('height', this.data.itemHeight);
			item.setAttribute('position', {x: (this.data.itemWidth + 0.25) * ( i + 1 ), y: 0, z: 0});
			
			// IIFE to preserve i
			item.addEventListener('click', (function(n) {
				return function(e) { self.itemClicked(e, n); };
			}) (i), false);
			this.items.push(item);
			this.el.appendChild(item);
		}

	},

	update: function() { },

	itemClicked: function(e, i) {
		console.log(i + " item was clicked");
	},

	next: function() {

	},

	previous: function() {

	}

});