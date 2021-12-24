import React from "react";
import classes from "./Transaction.module.css";
import NumberFormat from "react-number-format";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Timestamp } from "firebase/firestore";
import { doc, deleteDoc } from "@firebase/firestore";
import { db } from "../../firebase";

interface TransactionItemProps {
  name: string;
  icon: any;
  amount: number;
  date: Timestamp;
  isIncome: boolean;
  id: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  name,
  icon,
  amount,
  date,
  isIncome,
  id,
}) => {
  const deleteTransactionHandler = async () => {
    const transactionDoc = doc(db, "transactions", id);
    await deleteDoc(transactionDoc);
  };
  return (
    <div className={classes.transaction} onClick={deleteTransactionHandler}>
      <div className={classes.left}>
        <img src={icon} className={classes.icon} alt="icon" />
        <div className={classes.info}>
          <h1>{name}</h1>
          <p>{date.toDate().toDateString()}</p>
        </div>
      </div>
      <div
        style={{ color: isIncome ? "#02edc5" : "#ff4351" }}
        className={classes.amount}
      >
        <NumberFormat
          displayType="text"
          prefix={isIncome ? "+ $" : "- $"}
          value={amount.toFixed(2)}
          thousandSeparator
          decimalScale={2}
        />
        <p>{isIncome ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
