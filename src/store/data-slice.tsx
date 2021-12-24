import { createSlice } from "@reduxjs/toolkit";
import { DUMMY_TRANSACTIONS } from "../dummy";

const dataSlice = createSlice({
  name: "data",
  initialState: { transactions: DUMMY_TRANSACTIONS },
  reducers: {},
});

export const dataActions = dataSlice.actions;
export default dataSlice;
