import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deleteTransaction,
  fetchTransactions,
  saveTransaction,
  updateTransaction,
} from './transactionAPI';

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: '',
  editing: {},
};

// Thunk functions
export const fetchTransactionAsync = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const transactions = await fetchTransactions();
    return transactions;
  }
);

export const saveTransactionAsync = createAsyncThunk(
  'transactions/saveTransaction',
  async (data) => {
    const transaction = await saveTransaction(data);
    return transaction;
  }
);

export const updateTransactionAsync = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ id, data }) => {
    const transaction = await updateTransaction(id, data);
    return transaction;
  }
);

export const deleteTransactionAsync = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    editActive: (state, action) => {
      state.editing = action.payload;
    },

    editInActive: (state) => {
      state.editing = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTransactionAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.transactions = [];
        state.error = action.error?.message;
      })
      .addCase(saveTransactionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(saveTransactionAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions.push(action.payload);
      })
      .addCase(saveTransactionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateTransactionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateTransactionAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );

        state.transactions[indexToUpdate] = action.payload;
      })
      .addCase(updateTransactionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(deleteTransactionAsync.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.meta.arg
        );
      })
      .addCase(deleteTransactionAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { editActive, editInActive } = transactionsSlice.actions;

export default transactionsSlice.reducer;
