import { combineReducers } from "redux";
import Position from "./positionReducer";
import Menu from "./menuReducer";
import Grid from "./gridReducer";
import Tour from "./tourReducer";

const rootReducer = combineReducers({
	grid: Grid,
	menu: Menu,
	position: Position,
	tour: Tour
});

export default rootReducer;
