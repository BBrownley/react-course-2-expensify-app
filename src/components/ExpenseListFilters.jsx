import React, { useState } from "react";
import { connect } from "react-redux";

import { DateRangePicker } from "react-dates";

import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../actions/filters.js";
//random comment

export const ExpenseListFilters = props => {
  const [focusedInput, setFocusedInput] = useState(null);

  const onDatesChange = ({ startDate, endDate }) => {
    props.setStartDate(startDate);
    props.setEndDate(endDate);
  };

  const onTextChange = e => props.setTextFilter(e.target.value);

  const onSortByChange = e => {
    if (e.target.value === "date") {
      props.sortByDate();
    } else if (e.target.value === "amount") {
      props.sortByAmount();
    }
  };

  return (
    <div>
      <input type="text" value={props.filters.text} onChange={onTextChange} />
      <select value={props.filters.sortBy} onChange={onSortByChange}>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
      <DateRangePicker
        startDate={props.filters.startDate}
        startDateId={"Fgsfdgss"}
        endDate={props.filters.endDate}
        endDateId={"fshfgushf"}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        showClearDates={true}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => {
  return {
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setTextFilter: value => dispatch(setTextFilter(value)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
