import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

import { SingleDatePicker } from "react-dates";

test("should render ExpenseForm component correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseForm with expense data", () => {
  // Write code here
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error on invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find(".expense-form__error")).toHaveLength(2);
});

test("should set description on input change", () => {
  const value = "New description";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(
    wrapper
      .find("input")
      .at(0)
      .props().value
  ).toBe("New description");
});

test("should set description on textarea change", () => {
  const value = "New note value";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("textarea")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(
    wrapper
      .find("textarea")
      .at(0)
      .props().value
  ).toBe("New note value");
});

test("should set amount if valid input", () => {
  const value = "12.23";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(
    wrapper
      .find("input")
      .at(1)
      .props().value
  ).toBe("12.23");
});

test("should not set amount if invalid input", () => {
  const value = "12.232";
  const wrapper = shallow(<ExpenseForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(
    wrapper
      .find("input")
      .at(1)
      .props().value
  ).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find(".expense-form__error")).toHaveLength(0);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt.valueOf()
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onDateChange")(now);
  expect(wrapper.find(SingleDatePicker).prop("date")).toEqual(now);
});

test("should set calendar focus on change", () => {
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused: true });
  expect(wrapper.find(SingleDatePicker).prop("focused")).toEqual(true);
});
