import { INIT_DATA } from "../actions";

export default function(state = {}, action) {
	switch (action.type) {
		case INIT_DATA:
			return {
				assets: action.payload.assets,
				categories: action.payload.categories,
				stickerTypes: action.payload.stickerTypes,
				...state
			};

		default:
			return state;
	}
}
