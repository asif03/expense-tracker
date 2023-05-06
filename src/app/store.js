import { configureStore } from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionSlice';

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `transactions`, handled by `transactionsReducer`
    transactions: transactionsReducer,
  },
});
