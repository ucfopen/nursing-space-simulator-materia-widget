import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"

import App from "./components/app"
import reducers from "./reducers"

const createStoreWithMiddleware = applyMiddleware()(createStore)

/*
** Places the first--and main--React element in the document.
*/
Namespace("HospitalSim").Engine = (function() {
  var start = function(instance, qset, version) {
    ReactDOM.render(
      <Provider
        store={createStoreWithMiddleware(
          reducers,
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
        <App qset={qset} />
      </Provider>,
      document.querySelector("#sceneContainer")
    )
  }

  // Public
  return { start }
})()
