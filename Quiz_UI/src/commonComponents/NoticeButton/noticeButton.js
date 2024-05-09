import React, { useContext } from "react";
import classes from "./noticeButton.module.css";
import Icon from "../Icon";
import { GrNotification } from "@react-icons/all-files/gr/GrNotification";
import Button from "../Button";
import { NotificationContext } from "../../rootComponent/notification/context/NotificationProvider";

function NoticeButton(props) {
  const { notifications, toggleNotification } = useContext(NotificationContext);
  const countNotRead = notifications.filter(
    (notification) => notification.userRead === false
  ).length;
  return (
    <Button onClick={toggleNotification} id={"noticeButton"}>
      <span className={classes.noticeButton}>
        {countNotRead > 0 && (
          <span className={classes.quantity}>{countNotRead}</span>
        )}
        <Icon>
          <GrNotification />
        </Icon>
      </span>
    </Button>
  );
}

export default NoticeButton;
