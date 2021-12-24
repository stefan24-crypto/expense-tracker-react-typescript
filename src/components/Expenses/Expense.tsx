import React from "react";
import { useAppSelector } from "../../store/hooks";
import classes from "./Expense.module.css";
import NumberFormat from "react-number-format";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { expenseCategories } from "../../models";
import useDataValues from "../hooks/useDataValues";
import Summary from "../Summary/Summary";

const Expense: React.FC = () => {
  Chart.register(...registerables);
  const expenses = useAppSelector((state) => state.data.transactions).filter(
    (each) => each.type === "Expense"
  );
  const totalExpenses = expenses.reduce((acc, each) => acc + each.amount, 0);
  const expenseLabels = expenseCategories.map((each) => each.type);
  const expenseColors = expenseCategories.map((each) => each.color);

  const data = useDataValues(expenseLabels, expenses);
  console.log(data);

  const state = {
    labels: expenseLabels,
    datasets: [
      {
        label: "Expenses",
        backgroundColor: expenseColors,
        borderColor: expenseColors,
        data: data,
      },
    ],
  };

  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <h1>
          Total Expenses{" "}
          <span>
            <NumberFormat
              value={totalExpenses.toFixed(2)}
              prefix="$"
              thousandSeparator
              displayType="text"
              decimalScale={2}
            />
          </span>
        </h1>
      </header>
      <main className={classes.main}>
        <div className={classes.chart}>
          <Doughnut
            data={state}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Expenses",
                  color: "#ff4351",
                  font: {
                    size: 32,
                  },
                },
              },
            }}
          />
        </div>
        <div className={classes.key}>
          {expenseCategories.map((each, i) => {
            const percentage = (data[i] / totalExpenses) * 100;
            return (
              <p
                style={{ color: each.color }}
                className={classes.stats}
                key={i}
              >
                <img className={classes.icon} src={each.icon} alt="icons" />
                {each.type} {percentage.toFixed(0)}%
              </p>
            );
          })}
        </div>
      </main>
      <footer>
        <Summary listofTransactions={expenses} isIncome={false} />
      </footer>
    </section>
  );
};

export default Expense;
