import React, { useState } from 'react';

import ExpensesFilter from './ExpenseFilter';
import Card from "../UI/Card";
import ExpensesList from './ExpensesList';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState('2021');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  }

  console.log(props.expenses);
  const filteredExpenses = props.expenses.filter(expense => {
    const d = new Date(expense.date);
    // console.log(parseInt(expense.date));
    return d.getFullYear() === filteredYear;
    // return expense.year == filteredYear;
  });

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler} />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
}

export default Expenses;