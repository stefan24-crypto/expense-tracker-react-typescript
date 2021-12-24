import React from "react";
import classes from "./Transaction.module.css";
import NumberFormat from "react-number-format";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface TransactionItemProps {
  name: string;
  icon: any;
  amount: number;
  date: Date;
  isIncome: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  name,
  icon,
  amount,
  date,
  isIncome,
}) => {
  return (
    <div className={classes.transaction}>
      <div className={classes.left}>
        <img src={icon} className={classes.icon} alt="icon" />
        <div className={classes.info}>
          <h1>{name}</h1>
          <p>{date.toDateString()}</p>
        </div>
      </div>
      <div style={{ color: isIncome ? "#02edc5" : "#ff4351" }} className={classes.amount}>
        <NumberFormat
          displayType="text"
          prefix={isIncome ? "+ $" : "- $"}
          value={amount}
          thousandSeparator
          decimalScale={2}
        />
        <p>{isIncome ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
