//Income
import business from "./images/business.png";
import investments from "./images/investments.png";
import salary from "./images/salary.png";
import savings from "./images/savings.png";
import rent from "./images/rent.png";
import other from "./images/other.png";

//Expenses
import bills from "./images/bill.png";
import clothing from "./images/tshirt.png";
import travel from "./images/plane.png";
import food from "./images/salad.png";
import shopping from "./images/shopping-cart.png";

const incomeColors = [
  "#6818F0",
  "#FF4351",
  "#FD7541",
  "#FFBF36",
  "#00F7C9",
  "#4479F8",
];

export const incomeCategories = [
  { type: "Business", color: incomeColors[0], icon: business },
  { type: "Investments", color: incomeColors[1], icon: investments },
  { type: "Salary", color: incomeColors[2], icon: salary },
  { type: "Savings", color: incomeColors[3], icon: savings },
  { type: "Rental income", color: incomeColors[4], icon: rent },
  { type: "Other", color: incomeColors[5], icon: other },
];

export type IncomeCategory =
  | "Business"
  | "Investments"
  | "Salary"
  | "Savings"
  | "Rental income"
  | "Other";
const expenseColors = [
  "#6818F0",
  "#FF4351",
  "#FD7541",
  "#FFBF36",
  "#00F7C9",
  "#4479F8",
];
export const expenseCategories = [
  { type: "Bills", color: expenseColors[0], icon: bills },
  { type: "Clothes", color: expenseColors[1], icon: clothing },
  { type: "Travel", color: expenseColors[2], icon: travel },
  { type: "Food", color: expenseColors[3], icon: food },
  { type: "Shopping", color: expenseColors[4], icon: shopping },
  { type: "Other", color: expenseColors[5], icon: other },
];

export type ExpenseCategory =
  | "Bills"
  | "Clothes"
  | "Travel"
  | "Food"
  | "Shopping"
  | "Other";

export interface Transaction {
  id: string;
  type: "Income" | "Expense";
  category: IncomeCategory | ExpenseCategory;
  date: Date;
  amount: number;
}
