import moment from "moment";

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../actions/filters";

test("Should set up set text filter action object with provided value", () => {
  const action = setTextFilter("rent");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "rent"
  });
});

test("Should set up set text filter action object with no given value", () => {
  const action = setTextFilter("");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});

test("Should set up sort by date action object", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE"
  });
});

test("Should set up sort by amount action object", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});

test("Should set up action object for setting start date", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0)
  });
});

test("Should set up action object for setting end date", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0)
  });
});
