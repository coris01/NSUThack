import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Expenses from "./components/Expenses/Expenses";
import NewExpense from './components/NewExpense/NewExpense';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    title: 'Toilet Paper',
    amount: 94.12,
    date: new Date(2020, 7, 14),
  },
  { id: 'e2', title: 'New TV', amount: 799.49, date: new Date(2021, 2, 12) },
  {
    id: 'e3',
    title: 'Car Insurance',
    amount: 294.67,
    date: new Date(2021, 2, 28),
  },
  {
    id: 'e4',
    title: 'New Desk (Wooden)',
    amount: 450,
    date: new Date(2021, 5, 12),
  },
];

function Savee(props) {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const location = useLocation();
  let config = {
    headers: {
      Authorization: 'Bearer ' + location.state.data.token,
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8080/feed/posts', config)
      .then(result => {
        console.log(result.data);
        setExpenses(result.data.posts);
      });
  }, []);

  const addExpenseHandler = (expense) => {
    // setExpenses((prevExpenses) => {
    //   return [expense, ...prevExpenses];
    // });
    // console.log(expense);
    // const month = expense.date.toLocaleString('en-US', { month: 'long' });
    // const day = expense.date.toLocaleString('en-US', { day: '2-digit' });
    // const year = expense.date.getFullYear();
    const d = {
      date: expense.date,
      amount: expense.amount,
      title: expense.title
    }
    axios.post('http://localhost:8080/feed/post', d, config)
      .then(result => {
        console.log(result.data);
        setExpenses(result.data.post);
      });
  };

  return (
    <div >
      {console.log(location)}
      <NewExpense onAddExpense={addExpenseHandler} />
      {console.log(expenses)}
      <Expenses expenses={expenses} />
    </div>
  );
}

export default Savee;
