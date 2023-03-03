import React, { useState } from "react";
import "./ExpenseForm.css";

function ExpenseForm({ onSaveData, onCancel }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  // combined state object: - I personally don't like this approach, if you're gonna use this. Just rely on Redux.
  // provide an object inside the state, the object will contain the individual states
  // be careful about how you update the states, don't overwrite old data with defaults! use spread operator (two ways below)
  //react doesn't update a "state", it overwrites the ENTIRE old state.
  // const [userInput, setUserInput] = useState({
  //   title: "",
  //   amount: "",
  //   date: ""
  // });

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
    // here's how with a combined state object:
    // setUSerInput({
    //     ...userInput,
    //     title: e.target.value
    // })

    // and, another way: when you're updating a state that depends on a previous state change (Array, objects):
    // pass a function to the setter:
    // setUserInput((prevState)=>{
    //     return {...prevState, title: e.target.value}
    // });
  };
  const amountChangeHandler = (e) => {
    setAmount(parseFloat(e.target.value));
  };
  const dateChangeHandler = (e) => {
    setDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const expenseData = {
      id: Math.random(0, 99999),
      title,
      amount,
      date: new Date(date),
    };
    onSaveData(expenseData);
    setTitle("");
    setAmount(0);
    setDate("");
  };

  return (
    // two way binding with the input fields
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            onChange={titleChangeHandler}
            value={title}
            type="text"
            required
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            onChange={amountChangeHandler}
            value={amount}
            type="number"
            min={0.01}
            step={0.01}
            required
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            onChange={dateChangeHandler}
            value={date}
            type="date"
            min="2023-01-01"
            max="2025-12-31"
            required
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;
