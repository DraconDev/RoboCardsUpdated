import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "tachyons";
import App from "./containers/App.jsx";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { searchRobots, requestRobots } from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { compose } from "redux";

const logger = createLogger();

// Combine actions
const rootReducer = combineReducers({ searchRobots, requestRobots });

//
// const middlewares = [thunkMiddleware, logger];

//Check if it's chrome
const isChrome =
  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
console.log("store.js", isChrome);

// Combine Middleware and Chrome Dev tools. Else it doesn't work
const middleWare = isChrome
  ? compose(
      applyMiddleware(thunkMiddleware, logger),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : applyMiddleware(thunkMiddleware, logger);

//Store
const store = createStore(rootReducer, middleWare);

//Render
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
