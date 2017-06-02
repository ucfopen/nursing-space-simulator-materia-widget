import { combineReducers } from "redux"
import Data from "./dataReducer"
import Position from "./positionReducer"
import Menu from "./menuReducer"
import Placement from "./placementReducer"

const rootReducer = combineReducers({
  data: Data,
  position: Position,
  menu: Menu,
  placement: Placement
})

export default rootReducer
