import React from "react";

import { connect } from "react-redux";
import { addExpense } from "../actions/expenses";

import ExpenseForm from "./ExpenseForm";

export const AddExpensePage = props => (
  <div>
    <h1>Add Expense</h1>
    <ExpenseForm
      onSubmit={expense => {
        props.addExpense(expense);
        props.history.push("/");
      }}
    />
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    addExpense: expense => dispatch(addExpense(expense))
  };
};

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
