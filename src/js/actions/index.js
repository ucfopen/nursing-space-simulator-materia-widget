import { loadGrid } from "../grid";

export const INIT_DATA = "init_data";
export function initData(qset) {
	// loadGrid function may be needed if structure of grid state changes
	// in future releases
	// const grid = loadGrid(
	// 	qset.options.gridLoader.content,
	// 	qset.options.gridLoader.rows,
	// 	qset.options.gridLoader.columns
	// );

	// The grid state is stored and loaded directly from JSON
	const grid = JSON.parse(qset.options.gridLoader.grid);

	// As these do not change, there is no need to track them in state
	window.HS_CATEGORIES = qset.options.categories;
	window.HS_STICKER_TYPES = qset.options.stickerTypes;
	window.HS_ASSETS = qset.options.assets;

	AFRAME.registerGeometry('triangle', {
        schema: {
            vertices: {
                default: ['-1 1 0', '-1 -1 0', '1 -1 0'],
              }
		},
		init: function (data) {
			var geometry = new THREE.Geometry();
			geometry.vertices = data.vertices.map(function (vertex) {
				var points = vertex.split(' ').map(function(x){return parseInt(x);});
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
