import React from "react";
import { useAppSelector } from "../../store/hooks";
import classes from "./Income.module.css";
import NumberFormat from "react-number-format";
import { incomeCategories } from "../../models";
import { Doughnut } from "react-chartjs-2";
import { Bar, Line } from "react-chartjs-2";
import useDataValues from "../hooks/useDataValues";
import { Chart, registerables } from "chart.js";
import Summary from "../Summary/Summary";

const Income: React.FC = () => {
  Chart.register(...registerables);

  const income = useAppSelector((state) => state.data.transactions).filter(
    (each) => each.type === "Income"
  );
  const totalIncome = income.reduce((acc, each) => acc + each.amount, 0);

  const IncomeLabels = incomeCategories.map((each) => each.type);
  console.log(IncomeLabels);
  const IncomeColors = incomeCategories.map((each) => each.color);

  const data = useDataValues(IncomeLabels, income);
  console.log(data);

  const state = {
    labels: IncomeLabels,
    datasets: [
      {
        label: "Income",
        backgroundColor: IncomeColors,
        borderColor: IncomeColors,
        data: data,
      },
    ],
  };

  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <h1>
          Total Income{" "}
          <span>
            <NumberFormat
              value={totalIncome}
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
          {/* <Doughnut data={state} /> */}
          <Bar
            data={state}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Income",
                  color: "#02edc5",
                  font: {
                    size: 32,
                  },
                },
              },
            }}
          />
        </div>
        <div className={classes.key}>
          {incomeCategories.map((each, i) => {
            const percentage = (data[i] / totalIncome) * 100;
            return (
              <p style={{ color: each.color }} className={classes.stats}>
                <img src={each.icon} alt="icon" className={classes.icon} />
                {each.type} {percentage.toFixed(0)}%
              </p>
            );
          })}
        </div>
      </main>
      <footer>
        <Summary listofTransactions={income} isIncome={true} />
      </footer>
    </section>
  );
};

export default Income;
