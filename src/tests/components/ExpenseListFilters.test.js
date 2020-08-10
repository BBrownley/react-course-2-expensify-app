import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import { DateRangePicker } from "react-dates";
import moment from "moment";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

describe("ExpenseListFilters", () => {
  beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
      <ExpenseListFilters
        filters={filters}
        setTextFilter={setTextFilter}
        sortByDate={sortByDate}
        sortByAmount={sortByAmount}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render with alt filters", () => {
    wrapper.setProps({
      filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle text change", () => {
    const value = "rent";
    wrapper.find("input").simulate("change", {
      target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith("rent");
  });

  it("should sort by date", () => {
    wrapper.find("select").simulate("change", {
      target: { value: "date" }
    });

    expect(sortByDate).toHaveBeenCalled();
  });

  it("should sort by amount", () => {
    wrapper.find("select").simulate("change", {
      target: { value: "amount" }
    });
    expect(sortByAmount).toHaveBeenCalled();
  });

  it("should handle date changes", () => {
    const startDate = moment().add(2, "weeks");
    const endDate = moment().add(1, "days");

    wrapper.find(DateRangePicker).prop("onDatesChange")({ startDate, endDate });

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
  });
  it("should handle date focus changes", () => {
    wrapper.find(DateRangePicker).prop("onFocusChange")("endDate");

    expect(wrapper.find(DateRangePicker).prop("focusedInput")).toEqual(
      "endDate"
    );
  });
});
