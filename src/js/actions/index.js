import { loadGrid } from "../grid";

export const INIT_DATA = "init_data";

export function initData(qset) {
	const grid = loadGrid(
		qset.options.gridLoader.content,
		qset.options.gridLoader.rows,
		qset.options.gridLoader.columns
	);

	const categories = qset.options.categories;
	const stickerTypes = qset.options.stickerTypes;
	const assets = qset.options.assets;

	return {
		type: INIT_DATA,
		payload: { grid, categories, stickerTypes, assets }
	};
}
