import { addExpense, removeExpense, editExpense } from "../../actions/expenses";

test("Should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({ type: "REMOVE_EXPENSE", id: "123abc" });
});

test("Should setup edit expense action object", () => {
  const action = editExpense("456zfg", { amount: 100, note: "wassup" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "456zfg",
    updates: { amount: 100, note: "wassup" }
  });
});

test("should setup add expense action object with provided values", () => {
  const expenseData = {
    description: "Rent",
    amount: 109500,
    createdAt: 1000,
    note: "This was last month's rent"
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test("should setup add expense action object with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  });
});
