import React from "react";
import classes from "./adminLiveRoomController.module.css";
import { AiOutlineExpand } from "@react-icons/all-files/ai/AiOutlineExpand";
import Button from "../../commonComponents/Button";
import Icon from "../../commonComponents/Icon";
import { Link } from "react-router-dom";

function RoomController(props) {
  const { children } = props;

  return (
    <div className={classes.root}>
      <div className={classes.background}></div>
      <div className={classes.header}>
        <div className={classes.headerLeft}>
          <Link to={"/admin/home"} className={classes.logoContainer}>
            <img
              src={`${process.env.PUBLIC_URL}/static/logo2.png`}
              alt={"quizz-logo"}
            />
          </Link>
        </div>
        <div className={classes.headerCenter}></div>
        <div className={classes.headerRight}>
          <Button>
            <Icon>
              <AiOutlineExpand />
            </Icon>
          </Button>
          <Button>Kết thúc</Button>
        </div>
      </div>
      <div className={classes.tmp}></div>
      {children}
    </div>
  );
}

export default RoomController;
