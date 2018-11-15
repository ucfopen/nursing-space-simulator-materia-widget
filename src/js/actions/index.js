import { loadGrid } from "../grid";

// Default grid structure to use as a fallback for old qsets
import defaultData from "../../assets/default.json";

export const INIT_DATA = "init_data";
export function initData(qset, assetData) {
	// The grid state is stored and loaded directly from JSON
	// NOTE: old qsets have the grid structure saved differently; if loading fails, fallback to the default
	let grid = {};
	try {
		grid = JSON.parse(qset.options.gridLoader.grid);
	} catch (error) {
		grid = JSON.parse(defaultData.grid);
	}

	// As these do not change, there is no need to track them in state
	window.HS_CATEGORIES = assetData.categories;
	window.HS_STICKER_TYPES = assetData.stickerTypes;
	window.HS_ASSETS = assetData.assets;

	// Register triangle geometry with Aframe since it's not available as a primitive in the version we're using
	AFRAME.registerGeometry("triangle", {
		schema: {
			vertices: {
				default: ["-1 1 0", "-1 -1 0", "1 -1 0"]
			}
		},
		init: function(data) {
			var geometry = new THREE.Geometry();
			geometry.vertices = data.vertices.map(function(vertex) {
				var points = vertex.split(" ").map(function(x) {
					return parseInt(x);
				});
				return new THREE.Vector3(points[0], points[1], points[2]);
			});
			geometry.computeBoundingBox();
			geometry.faces.push(new THREE.Face3(0, 1, 2));
			geometry.mergeVertices();
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();
			this.geometry = geometry;
		}
	});

	return {
		type: INIT_DATA,
		payload: { grid }
	};
}
