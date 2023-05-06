import React from 'react';
import { useSelector } from 'react-redux';

function calculateBalance(transactions) {
  let balance = 0;
  transactions.forEach((transaction) => {
    const { type, amount } = transaction;
    if (type === 'income') {
      balance += Number(amount);
    } else if (type === 'expense') {
      balance -= Number(amount);
    }
  });

  return balance;
}

const Balance = () => {
  const transactions = useSelector((state) => state.transactions.transactions);

  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳</span> {calculateBalance(transactions)}
      </h3>
    </div>
  );
};

export default Balance;
