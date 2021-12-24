import { Timestamp } from "firebase/firestore";
import { Transaction } from "./models";

export const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    type: "Income",
    category: "Business",
    date: new Timestamp(1562524200, 0),
    amount: 134.78,
  },
  {
    id: "t2",
    type: "Expense",
    category: "Bills",
    date: new Timestamp(1612524200, 0),
    amount: 456.56,
  },
  {
    id: "t3",
    type: "Expense",
    category: "Clothes",
    date: new Timestamp(1712524200, 0),
    amount: 553.12,
  },
  {
    id: "t4",
    type: "Income",
    category: "Other",
    date: new Timestamp(1912524200, 0),
    amount: 1234.56,
  },
  {
    id: "t5",
    type: "Expense",
    category: "Shopping",
    date: new Timestamp(1182524200, 0),
    amount: 987.23,
  },
  {
    id: "t6",
    type: "Income",
    category: "Investments",
    date: new Timestamp(1782524200, 0),
    amount: 12435.72,
  },
  {
    id: "t7",
    type: "Income",
    category: "Savings",
    date: new Timestamp(1722524200, 0),
    amount: 255.72,
  },
  {
    id: "t8",
    type: "Income",
    category: "Salary",
    date: new Timestamp(1782524200, 0),
    amount: 4500.23,
  },
  {
    id: "t9",
    type: "Income",
    category: "Rental income",
    date: new Timestamp(1152524200, 0),
    amount: 3124.23,
  },
  {
    id: "t10",
    type: "Expense",
    category: "Other",
    date: new Timestamp(1892524200, 0),
    amount: 524.5,
  },
  {
    id: "t11",
    type: "Expense",
    category: "Food",
    date: new Timestamp(1672524200, 0),
    amount: 123.62,
  },
  {
    id: "t12",
    type: "Expense",
    category: "Travel",
    date: new Timestamp(1562124200, 0),
    amount: 1009.27,
  },
];
