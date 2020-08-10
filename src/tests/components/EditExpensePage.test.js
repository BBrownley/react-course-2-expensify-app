import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let wrapper, editExpense, removeExpense, history;

describe("EditExpensePage", () => {
  beforeEach(() => {
    editExpense = removeExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(
      <EditExpensePage
        editExpense={editExpense}
        removeExpense={removeExpense}
        history={history}
        expense={expenses[2]}
      />
    );
  });

  it("should render EditExpensePage", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle editExpense", () => {
    wrapper.find("ExpenseForm").prop("onSubmit")({
      description: "Soda",
      amount: 2000
    });
    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, {
      description: "Soda",
      amount: 2000
    });
    expect(history.push).toHaveBeenLastCalledWith("/");
  });

  it("should handle removeExpense", () => {
    wrapper.find("button").simulate("click");
    expect(removeExpense).toHaveBeenLastCalledWith(expenses[2].id);
    expect(history.push).toHaveBeenLastCalledWith("/");
  });
});
