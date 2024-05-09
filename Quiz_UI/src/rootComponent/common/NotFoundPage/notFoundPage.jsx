import React from "react";
import classes from "./notFoundPage.module.scss";

function NotFoundPage(props) {
  return (
    <div className={classes.root}>
      <div className={classes.number}>404</div>
      <div className={classes.text}>
        <span>Ooops...</span>
        <br />
        Trang này không tồn tại
      </div>
    </div>
  );
}

export default NotFoundPage;
