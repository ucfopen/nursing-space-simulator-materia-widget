import { combineReducers } from "redux";
import Position from "./positionReducer";
import Menu from "./menuReducer";
import Grid from "./gridReducer";
import Tour from "./tourReducer";
import Tooltip from "./tooltipReducer";

const rootReducer = combineReducers({
	grid: Grid,
	menu: Menu,
	position: Position,
	tour: Tour,
	tooltip: Tooltip
});

export default rootReducer;
