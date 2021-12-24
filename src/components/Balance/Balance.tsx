import React from "react";
import { useAppSelector } from "../../store/hooks";
import classes from "./Balance.module.css";
import NumberFormat from "react-number-format";

const Balance: React.FC = () => {
  const totalIncome = useAppSelector((state) => state.data.transactions)
    .filter((each) => each.type === "Income")
    .reduce((acc, each) => acc + each.amount, 0);
  const totalExpenses = useAppSelector((state) => state.data.transactions)
    .filter((each) => each.type === "Expense")
    .reduce((acc, each) => acc + each.amount, 0);
  const balance = totalIncome - totalExpenses;
  return (
    <section className={classes.section}>
      <h1 className={classes.bal}>Balance </h1>
      <span style={{ color: balance > 0 ? "#02edc5" : "#ff4351" }}>
        <NumberFormat
          value={Math.abs(balance).toFixed(2)}
          prefix="$"
          thousandSeparator
          displayType="text"
          decimalScale={2}
        />
      </span>
    </section>
  );
};

export default Balance;
