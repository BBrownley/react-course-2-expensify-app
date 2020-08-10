import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "./styles/dist/styles.min.css";
import "react-dates/lib/css/_datepicker.css";

// Redux
import store from "./store/configureStore";

import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";

const usingPlayground = false;

const loadPlaygroundFile = async _ => {
  await import("./playground/hoc.js");
};

if (!usingPlayground) {
  ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>,
    document.getElementById("root")
  );
} else {
  loadPlaygroundFile();
}

store.dispatch(
  addExpense({ description: "Water bill", amount: 1000, createdAt: 100 })
);
store.dispatch(
  addExpense({ description: "Gas bill", amount: 200, createdAt: 200 })
);
store.dispatch(
  addExpense({ description: "Rent", amount: 150, createdAt: 300 })
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
