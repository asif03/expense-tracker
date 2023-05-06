import React from 'react';
import Balance from '../components/transactions/Balance';
import Form from '../components/transactions/Form';
import TransactionList from '../components/transactions/TransactionList';

const Transactions = () => {
  return (
    <>
      <Balance />
      <Form />
      <TransactionList />
    </>
  );
};

export default Transactions;
