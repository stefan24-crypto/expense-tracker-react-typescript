import React from "react";
import classes from "./Banner.module.css";
import ClearIcon from "@mui/icons-material/Clear";

interface BannerProps {
  message: string;
  AddOrDelete: "Add" | "Delete";
  close: () => void;
}

const Banner: React.FC<BannerProps> = ({ message, AddOrDelete, close }) => {
  return (
    <section
      className={classes.banner}
      style={{ backgroundColor: AddOrDelete === "Add" ? "#02edc5" : "#ff4351" }}
    >
      <p>{message}</p>
      <div className={classes.clear} onClick={close}>
        <ClearIcon />
      </div>
    </section>
  );
};

export default Banner;
