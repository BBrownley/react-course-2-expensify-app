import { createStore } from "redux";

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ count }) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET"
});

/*

Reducers:

1) Are pure functions
2) Arguments are immutable

*/

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy };
    case "DECREMENT":
      const decrementAmt =
        typeof action.decrementBy === "number" ? action.decrementBy : 1;
      return { count: state.count - decrementAmt };
    case "SET":
      return { count: action.count };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};

let store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 10 }));
store.dispatch(incrementCount({ incrementBy: 100 }));
store.dispatch(decrementCount({ decrementBy: 2 }));
store.dispatch(decrementCount({ decrementBy: 20 }));
store.dispatch(resetCount());
store.dispatch(setCount({ count: 101 }));
