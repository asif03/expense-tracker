import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transaction from './Transaction';
import { fetchTransactionAsync } from '../../features/transactions/transactionSlice';

const TransactionList = () => {
  const { transactions, isLoading, isError, error } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactionAsync());
  }, [dispatch]);

  let transactionContent;
  if (isLoading) {
    transactionContent = 'Loading..';
  }

  if (!isLoading && isError) {
    transactionContent = error;
  }

  if (!isLoading && !isError && transactions?.length === 0) {
    transactionContent = 'No Transaction found!';
  }

  if (!isLoading && !isError && transactions?.length > 0) {
    transactionContent = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{transactionContent}</ul>
      </div>
    </>
  );
};

export default TransactionList;
