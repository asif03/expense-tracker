import React from 'react';
import editImage from '../../assets/images/edit.svg';
import deleteImage from '../../assets/images/delete.svg';
import { useDispatch } from 'react-redux';
import {
  deleteTransactionAsync,
  editActive,
} from '../../features/transactions/transactionSlice';

const Transaction = ({ transaction }) => {
  const { name, amount, type, id } = transaction || {};

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editActive(transaction));
  };

  const handleDelete = () => {
    dispatch(deleteTransactionAsync(id));
  };

  return (
    <li className={`transaction ${type}`} key={id}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button className="link" onClick={handleEdit}>
          <img src={editImage} className="icon" alt="edit" />
        </button>
        <button className="link" onClick={handleDelete}>
          <img src={deleteImage} className="icon" alt="delete" />
        </button>
      </div>
    </li>
  );
};

export default Transaction;
