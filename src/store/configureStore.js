import { createStore, combineReducers } from "redux";

import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";

import getVisibleExpenses from "../selectors/expenses";

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  const { expenses, filters } = store.getState();
  console.log(getVisibleExpenses(expenses, filters));
});

export default store;
