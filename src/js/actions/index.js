import { loadGrid } from "../grid";
import { initialGrid } from "../initialGrid";

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

	return {
		type: INIT_DATA,
		payload: { grid }
	};
}
