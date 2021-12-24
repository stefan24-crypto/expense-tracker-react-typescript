import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_TRANSACTIONS } from "../dummy";
import { Transaction } from "../models";

interface state {
  transactions: Transaction[];
}

const initialState: state = {
  transactions: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
