import React from "react";
import { connect } from "react-redux";

import { editExpense, removeExpense } from "../actions/expenses";

import ExpenseForm from "./ExpenseForm";

export const EditExpensePage = props => {
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={expense => {
          props.editExpense(props.expense.id, expense);
          props.history.push("/");
        }}
      />
      <button
        onClick={() => {
          props.removeExpense(props.expense.id);
          props.history.push("/");
        }}
      >
        Remove Item
      </button>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    expense: state.expenses.find(
      expense => expense.id === props.match.params.id
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: id => dispatch(removeExpense({ id }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
