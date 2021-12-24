import React from "react";
import { expenseCategories, incomeCategories, Transaction } from "../../models";
import classes from "./Summary.module.css";
import TransactionItem from "./Transaction";

interface SummaryProps {
  listofTransactions: Transaction[];
  isIncome: boolean;
}
//Sort Transactions to show most recent on to

const Summary: React.FC<SummaryProps> = ({ listofTransactions, isIncome }) => {
  listofTransactions.sort((a, b) => {
    if (a.date.toDate().getTime() > b.date.toDate().getTime()) return -1;
    return 1;
  });
  return (
    <section>
      <header className={classes.header}>
        <h1>Summary</h1>
      </header>
      <main className={classes.main}>
        {listofTransactions.map((trans) => {
          let thisCategory;
          if (isIncome) {
            thisCategory = incomeCategories.find(
              (each) => each.type === trans.category
            );
          } else {
            thisCategory = expenseCategories.find(
              (each) => each.type === trans.category
            );
          }
          return (
            <TransactionItem
              name={trans.category}
              amount={trans.amount}
              date={trans.date}
              key={trans.id}
              icon={thisCategory?.icon}
              isIncome={isIncome}
              id={trans.id}
            />
          );
        })}
      </main>
    </section>
  );
};

export default Summary;
