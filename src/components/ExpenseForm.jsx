import React, { useState } from "react";

import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";

import moment from "moment";

const ExpenseForm = props => {
  const [description, setDescription] = useState(
    props.expense ? props.expense.description : ""
  );
  const [amount, setAmount] = useState(
    props.expense ? (props.expense.amount / 100).toFixed(2) : ""
  );
  const [note, setNote] = useState(props.expense ? props.expense.note : "");
  const [date, setDate] = useState(
    props.expense ? moment(props.expense.createdAt) : moment()
  );
  const [dateFocused, toggleDateFocused] = useState(false);
  const [errors, setErrors] = useState([]);

  const onAmountChange = amount => {
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      setAmount(amount);
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    setErrors([
      ...(!description ? ["Please fill out the description field"] : []),
      ...(!amount ? ["Please fill out the amount field"] : [])
    ]);

    if (description && amount) {
      props.onSubmit({
        description,
        amount: parseFloat(amount) * 100,
        note,
        createdAt: date.valueOf() // in ms
      });
    }
  };

  return (
    <form onSubmit={e => onSubmit(e)}>
      <br />
      <br />
      <input
        type="text"
        placeholder="Description"
        autoFocus
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Amount"
        autoFocus
        value={amount}
        onChange={e => onAmountChange(e.target.value)}
      />
      <br />
      <br />
      <textarea
        placeholder="Add a note for your expense (optional)"
        value={note}
        onChange={e => setNote(e.target.value)}
      ></textarea>
      <br />
      <br />
      <SingleDatePicker
        date={date}
        onDateChange={newDate => {
          if (newDate) {
            setDate(newDate);
          }
        }}
        focused={dateFocused}
        onFocusChange={({ focused }) => toggleDateFocused(focused)}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />
      <br />
      <br />
      <ul>
        {errors.map((error, index) => (
          <li className="expense-form__error" key={index}>
            {error}
          </li>
        ))}
      </ul>
      <button>{props.expense ? "Edit" : "Add"} expense</button>
    </form>
  );
};

export default ExpenseForm;
