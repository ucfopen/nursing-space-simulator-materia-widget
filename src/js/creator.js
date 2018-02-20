document.addEventListener("DOMContentLoaded", function(event) {

	var qset = {
		items: [],
		options: {}
	};

	var widget = {
		engineName: "",
		title: ""
	};

	var materiaInterface = {};
	
	qset.options.gridLoader = {
		grid: "[[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",\"0\",{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}],[{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null},{\"id\":\"wall-1\",\"rotation\":0,\"stickers\":null}]]",
		columns: 30,
		content:
		"wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0 wall-1.0",
		rows: 12
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
		Materia.CreatorCore.save(title, qset, 1);
	};

	materiaInterface.onSaveComplete = function() {
		console.log("save complete!");
		return true;
	};

	return Materia.CreatorCore.start(materiaInterface);
});
