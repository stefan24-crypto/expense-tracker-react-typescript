import React from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router";
import IncomePage from "./Pages/IncomePage";
import ExpensesPage from "./Pages/ExpensesPage";
import AddTransactionPage from "./Pages/AddTransactionPage";

const App: React.FC = () => {
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
