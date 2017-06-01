import { combineReducers } from "redux"
import Data from "./dataReducer"
import Position from "./positionReducer"
import ViewType from "./viewTypeReducer"
import Menu from "./menuReducer"
import Placement from "./placementReducer"

const rootReducer = combineReducers({
  data: Data,
  position: Position,
  thirdPerson: ViewType,
  menu: Menu,
  placement: Placement
})

export default rootReducer
