import {
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  TextField,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import React, { useEffect, useState } from "react";
import classes from "./AddTransaction.module.css";
import { incomeCategories } from "../../models";
import { expenseCategories } from "../../models";
import { Transaction } from "../../models";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
  ErrorPanel,
} from "@speechly/react-ui";
import { useSpeechContext } from "@speechly/react-client";
import { async } from "@firebase/util";
import { Preview } from "@mui/icons-material";

interface stateStructure {
  amount: string;
  category: string;
  type: string;
  date: any;
}

const initialState: stateStructure = {
  amount: "",
  category: "",
  type: "",
  date: new Date(),
};

const AddTransaction: React.FC = () => {
  //   const [type, setType] = useState<string>("");
  //   const [category, setCategory] = useState<string>("");
  //   const [amount, setAmount] = useState<string>("");
  //   const [date, setDate] = useState<any>(new Date());
  const [formState, setFormState] = useState(initialState);
  const transactionCollections = collection(db, "transactions");
  const navigate = useNavigate();
  const { segment } = useSpeechContext();

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, type: e.target.value }));
    setFormState((prev) => ({ ...prev, category: "" }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, amount: e.target.value }));
  };

  //This needed to call createTransaction in the useEffect
  const addToFirebase = async (data: Transaction) => {
    await addDoc(transactionCollections, data);
  };

  const createTransaction = () => {
    let theDate;
    if (!formState.date?._d) {
      theDate = new Date(formState.date);
    } else {
      theDate = new Date(formState.date?._d);
    }
    const data: Transaction = {
      id: Math.random().toString(),
      type: formState.type,
      category: formState.category,
      date: Timestamp.fromDate(theDate),
      amount: +formState.amount!,
    };
    addToFirebase(data);
    console.log("here");
    setFormState((prev) => initialState);
    // navigate("/");
  };

  console.log(formState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTransaction();
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormState((prev) => ({ ...prev, type: "Expense" }));
      } else if (segment.intent.intent === "add_income") {
        setFormState((prev) => ({ ...prev, type: "Income" }));
      } else if (
        segment.isFinal &&
        segment.intent.intent === "create_transaction"
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        //Resent initial state
        return setFormState(initialState);
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;
        switch (e.type) {
          case "amount":
            setFormState((prev) => ({ ...prev, amount: e.value }));
            break;
          case "category":
            if (incomeCategories.map((each) => each.type).includes(category)) {
              setFormState((prev) => ({
                ...prev,
                type: "Income",
                category: category,
              }));
            } else if (
              expenseCategories.map((each) => each.type).includes(category)
            ) {
              setFormState((prev) => ({
                ...prev,
                type: "Expense",
                category: category,
              }));
            }
            break;
          case "date":
            setFormState((prev) => ({ ...prev, date: e.value }));
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formState.amount &&
        formState.category &&
        formState.type &&
        formState.date
      ) {
        createTransaction();
        // setFormState({ amount: "", type: "", category: "", date: new Date() });
      }
    }
  }, [segment]);

  return (
    <section>
      <header className={classes.header}>
        <h1>Add Transaction</h1>
        <p>
          Try Saying: Add Income for 50 dollars in category business for next
          monday
        </p>
        <br />
        <hr className={classes.hr}></hr>
        <div className={classes.transcript}>
          <p>{segment && segment.words.map((w) => w.value).join(" ")}</p>
        </div>
      </header>
      <main className={classes.main}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            onChange={handleTypeChange}
            value={formState.type}
            variant="outlined"
            select
            label="Type"
            required
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>
          <TextField
            onChange={handleCategoryChange}
            value={formState.category}
            variant="outlined"
            select
            disabled={formState.type ? false : true}
            label="Category"
            required
          >
            {formState.type === "Income"
              ? incomeCategories.map((each) => (
                  <MenuItem key={each.type} value={each.type}>
                    {each.type}
                  </MenuItem>
                ))
              : expenseCategories.map((each) => (
                  <MenuItem key={each.type} value={each.type}>
                    {each.type}
                  </MenuItem>
                ))}
          </TextField>
          <FormControl>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              label="Amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              type="number"
              onChange={handleAmountChange}
              value={formState.amount}
              required
            />
          </FormControl>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label="Date"
              value={formState.date}
              renderInput={(params) => <TextField {...params} required />}
              onChange={(newValue) => {
                setFormState((prev) => ({ ...prev, date: newValue! }));
              }}
            />
          </LocalizationProvider>
          <div className={classes.btns}>
            <button className={classes.btn} type="submit">
              Submit
            </button>
          </div>
        </form>
      </main>
      <footer>
        <div></div>
        <PushToTalkButtonContainer>
          <PushToTalkButton />
          <ErrorPanel />
        </PushToTalkButtonContainer>
      </footer>
    </section>
  );
};

export default AddTransaction;
