import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const action = { type: "@@INIT" };
  const state = expensesReducer(undefined, action);
  expect(state).toEqual([]);
});

test("should add an expense to state", () => {
  const expense = {
    id: "4",
    description: "laptop",
    note: "",
    amount: 65000,
    createdAt: undefined
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const newState = expensesReducer(expenses, action);
  expect(newState).toEqual([...expenses, expense]);
});

test("should remove an expense by id", () => {
  const action = { type: "REMOVE_EXPENSE", id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove an expense if id not found", () => {
  const action = { type: "REMOVE_EXPENSE", id: "-1" };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should edit an expense", () => {
  const id = expenses[2].id;
  const updates = { amount: 200, description: "candy", note: "yummy" };
  const action = { type: "EDIT_EXPENSE", id, updates };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([
    ...expenses.filter(expense => expense.id !== id),
    { ...expenses.find(expense => expense.id === id), ...updates }
  ]);
});

test("should not edit an expense if expense not found", () => {
  const updates = { amount: 200, description: "candy", note: "yummy" };
  const action = { type: "EDIT_EXPENSE", id: "-1", updates };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
