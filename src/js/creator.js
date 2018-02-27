document.addEventListener("DOMContentLoaded", function(event) {

	var outer = document.getElementById("presets");
	console.log(outer);
	outer.addEventListener('click', function(event) {
		if (event.target.tagName == "BUTTON") {
			event.target.blur();
			let prev = document.querySelectorAll('button.selected');
			console.log(prev);
			if (prev.length) {
				prev[0].classList.remove('selected');
			}
			event.target.classList.add('selected');
		}
	})


	var qset = {
		items: [],
		options: { gridLoader: {} }
	};

	var widget = {
		engineName: "",
		title: ""
	};

	var materiaInterface = {};

	function getJSON(url){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send(null);
		console.log("got " + url)
		return xhr.responseText;
	}

	function generateGrid() {
		let filePath = 'assets/preset-qsets/';
		let filename = 'standard.json';
		let selected = document.querySelectorAll('button.selected');

		if (selected.length) {
			filename = selected[0].getAttribute('filename');
		}
		qset.options.gridLoader.grid = JSON.parse(getJSON(filePath + filename));
		return;
	};


	materiaInterface.initNewWidget = function(w) {
		console.log("new");
	};

	materiaInterface.initExistingWidget = function(
		title,
		widget,
		qset,
		version,
		baseUrl
	) {
		console.log("Existing!");
		document.getElementById("title").value = title;
	};

	materiaInterface.onSaveClicked = function() {
		var title = document.getElementById("title").value;
		qset.options.gridLoader.columns = 30;
		qset.options.gridLoader.rows = 12;
		generateGrid();

		// version 2 has a real .json qset (rather than string)
		const version = 2;
		Materia.CreatorCore.save(title, qset, version);
	};

	materiaInterface.onSaveComplete = function() {
		console.log("save complete!");
		return true;
	};

	return Materia.CreatorCore.start(materiaInterface);
});
