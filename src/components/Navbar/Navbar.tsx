import React from "react";
import classes from "./Navbar.module.css";
import logo from "../../images/money.png";
import { Link } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import AddIcon from "@mui/icons-material/Add";

const Navbar: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.logo_div}>
        <img src={logo} className={classes.logo} alt="logo" />
      </div>
      <div className={classes.links}>
        <Link to="/" className={classes.link}>
          <AttachMoneyIcon />
        </Link>
        <Link to="/expenses" className={classes.link}>
          <MoneyOffIcon />
        </Link>
        <Link to="/add" className={classes.link}>
          <AddIcon />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
