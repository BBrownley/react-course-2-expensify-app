import moment from "moment";

import filtersReducer from "../../reducers/filters";

test("should set up default filter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toBe("amount");
});

test("should set sortBy to date", () => {
  const prevState = {
    text: "",
    sortBy: "amount",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  };
  const newState = filtersReducer(prevState, { type: "SORT_BY_DATE" });
  expect(newState.sortBy).toBe("date");
});

test("should set text filter", () => {
  const prevState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const newState = filtersReducer(prevState, {
    type: "SET_TEXT_FILTER",
    text: "123abc"
  });
  expect(newState.text).toBe("123abc");
});

test("should set start date", () => {
  const prevState = {
    text: "",
    sortBy: "date",
    startDate: moment(0).add(3, "days"),
    endDate: undefined
  };
  const newState = filtersReducer(prevState, {
    type: "SET_START_DATE",
    startDate: moment(0).add(7, "days")
  });
  expect(newState.startDate).toEqual(moment(0).add(7, "days"));
});

test("should set end date", () => {
  const prevState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0).subtract(3, "days")
  };
  const newState = filtersReducer(prevState, {
    type: "SET_END_DATE",
    endDate: moment(0).add(1, "days")
  });
  expect(newState.endDate).toEqual(moment(0).add(1, "days"));
});
