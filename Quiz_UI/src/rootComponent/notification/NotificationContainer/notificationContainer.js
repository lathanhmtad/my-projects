import React, { useContext, useEffect, useRef } from "react";
import classes from "./notificationContainer.module.css";
import Icon from "../../../commonComponents/Icon";
import { FcInfo } from "@react-icons/all-files/fc/FcInfo";
import { Link } from "react-router-dom";
import { NotificationContext } from "../context/NotificationProvider";
import mergeClassNames from "merge-class-names";

function NotificationContainer(props) {
  const { notifications, open, setOpen } = useContext(NotificationContext);
  const ref = useRef();
  const rootClass = mergeClassNames(classes.root, open ? classes.open : "");
  useEffect(() => {
    const handleCloseNotification = (e) => {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        !document.getElementById("noticeButton")?.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("click", handleCloseNotification);
    return () => {
      window.removeEventListener("click", handleCloseNotification);
    };
  }, [ref]);
  return (
    <section className={rootClass} ref={ref}>
      <div className={classes.container}>
        {notifications &&
          notifications.map((notification) => (
            <Link
              className={mergeClassNames(
                classes.notification,
                notification.userRead ? "" : classes.userNotRead
              )}
              key={notification.id}
              to={notification.redirectUrl}
            >
              <div className={classes.left}>
                <Icon>
                  <FcInfo />
                </Icon>
              </div>
              <div className={classes.right}>{notification.message}</div>
            </Link>
          ))}
      </div>
    </section>
  );
}

export default NotificationContainer;
