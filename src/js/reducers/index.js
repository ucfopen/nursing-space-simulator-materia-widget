import { combineReducers } from "redux";
import Data from "./dataReducer";
import Position from "./positionReducer";
import Menu from "./menuReducer";
import Grid from "./gridReducer";
import Tour from "./tourReducer";

const rootReducer = combineReducers({
	data: Data,
	position: Position,
	menu: Menu,
	grid: Grid,
	tour: Tour
});

export default rootReducer;
