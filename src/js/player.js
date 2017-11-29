import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";

function getAssetInfo(gridValue) {
	if (gridValue === "0") return "0";

	let assetInfo = gridValue.split(".");

	return {
		id: assetInfo[0],
		rotation: parseInt(assetInfo[1])
	};
}

function loadGrid(gridString, gLen, gWid) {
	var grid;
	var tempGrid;
	var counter = -1;

	tempGrid = gridString.split(" ");
	grid = new Array(gLen);

	for (let i = 0; i < gLen; i++) {
		grid[i] = new Array(gWid);
		for (let j = 0; j < gWid; j++) {
			counter++;
			grid[i][j] = getAssetInfo(tempGrid[counter]);
		}
	}

	return grid;
}

/*
** Places the first--and main--React element in the document.
*/
Namespace("HospitalSim").Engine = {
	start: function(instance, qset, version) {

		Materia.Engine.resumeGameData();

		let data = {
			assetsFromFile: qset.options.assets,
			categories: qset.options.categories,
			gridLoader: qset.options.gridLoader
		};

		var app = 
		<App
			map={loadGrid(
				data.gridLoader.content,
				data.gridLoader.rows,
				data.gridLoader.columns
			)}
			categories={data.categories}
			assetsFromFile={data.assetsFromFile}
		/>

		ReactDOM.render(
			app, document.querySelector("#sceneContainer")
		);
	},

	resume: function(instance, qset, version, state) {

			console.log("resume called within widget");
			var categories = qset.options.categories;
			var assetsFromFile = qset.options.assets;

			var grid = JSON.parse(state);
			var dom = document.querySelector("#sceneContainer");

			ReactDOM.unmountComponentAtNode(dom);

			ReactDOM.render(
				<App
					map={grid}
					categories={categories}
					assetsFromFile={assetsFromFile}
				/>,
				document.querySelector("#sceneContainer")
			);
	}
};
