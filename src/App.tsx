import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router";
import IncomePage from "./Pages/IncomePage";
import ExpensesPage from "./Pages/ExpensesPage";
import AddTransactionPage from "./Pages/AddTransactionPage";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { useAppDispatch } from "./store/hooks";
import { dataActions } from "./store/data-slice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    onSnapshot(collection(db, "transactions"), (snapshot) => {
      snapshot.docs.map((doc) =>
        dispatch(
          dataActions.setTransactions(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        )
      );
    });
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<IncomePage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/add" element={<AddTransactionPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
