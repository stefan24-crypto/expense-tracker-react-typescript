import React from "react";
import Navbar from "../Navbar/Navbar";
import classes from "./Layout.module.css";
import Balance from "../Balance/Balance";

const Layout: React.FC = ({ children }) => {
  return (
    <section className={classes.app}>
      <Navbar />
      <main className={classes.main}>
        <Balance />
        {children}
      </main>
    </section>
  );
};

export default Layout;
