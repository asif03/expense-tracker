import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editInActive,
  saveTransactionAsync,
  updateTransactionAsync,
} from '../../features/transactions/transactionSlice';

const Form = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector((state) => state.transactions);

  const editing = useSelector((state) => state.transactions.editing);

  useEffect(() => {
    const { id } = editing || {};
    if (id) {
      setEditMode(true);
      setName(editing.name);
      setType(editing.type);
      setAmount(editing.amount);
    } else {
      setEditMode(false);
      reset();
    }
  }, [editing]);

  const reset = () => {
    setName('');
    setType('');
    setAmount('');
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(saveTransactionAsync({ name, type, amount: Number(amount) }));
    reset();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateTransactionAsync({
        id: editing?.id,
        data: {
          name: name,
          type: type,
          amount: amount,
        },
      })
    );
    setEditMode(false);
    dispatch(editInActive());
    reset();
  };

  const handleCancelEditMode = () => {
    setEditMode(false);
    dispatch(editInActive());
    reset();
  };

  return (
    <div className="form">
      <form onSubmit={editMode ? handleUpdate : handleSave}>
        <h3>Add new transaction</h3>

        <div className="form-group">
          <label htmlFor="transaction_name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="My Salary"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group radio">
          <label htmlFor="transaction_type">Type</label>
          <div className="radio_group">
            <input
              type="radio"
              value="income"
              name="type"
              required
              checked={type === 'income'}
              onChange={(e) => setType('income')}
            />
            <label htmlFor="transaction_type">Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="type"
              placeholder="Expense"
              checked={type === 'expense'}
              onChange={(e) => setType('expense')}
            />
            <label htmlFor="transaction_type">Expense</label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="transaction_amount">Amount</label>
          <input
            type="number"
            placeholder="300"
            name="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {isLoading && isError && <p>There is some error occur.</p>}
        <button className="btn" type="submit">
          {editMode ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
      {editMode && (
        <button className="btn cancel_edit" onClick={handleCancelEditMode}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
