import React from "react";
import classes from "./roomLoading.module.css";
import LoadingIcon from "../LoadingIcon";

function RoomLoading(props) {
  return (
    <section className={classes.root}>
      <LoadingIcon className={classes.loadingIcon} />
    </section>
  );
}

export default RoomLoading;
