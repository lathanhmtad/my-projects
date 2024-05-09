import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { ADDED_MESSAGE, LIST_INIT } from "../../common/messageType";
import { useKeycloak } from "@react-keycloak/web";
import { useLocation } from "react-router-dom";
import notificationApi from "../../../api/notificationApi";
import { toast } from "react-toastify";

export const NotificationContext = React.createContext();

function NotificationProvider(props) {
  const [socket, setSocket] = useState(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { keycloak } = useKeycloak();
  const toggleNotification = () => {
    setOpen((old) => {
      if (!old) {
        if (
          notifications.filter(
            (notification) => notification.userRead === false
          ).length > 0 &&
          keycloak.tokenParsed
        ) {
          notificationApi
            .makeAllRead(keycloak.tokenParsed.sub)
            .then(() => {})
            .catch(() => {
              toast.info("Có lỗi xảy ra");
            });
        }
      }
      return !old;
    });
  };
  useEffect(() => {
    if (!open) {
      setNotifications((old) => old.map((x) => ({ ...x, userRead: true })));
    }
  }, [open]);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (keycloak.tokenParsed) {
      const socketConnect = new SockJS("http://localhost:8086/socket");
      const stompClient = Stomp.over(socketConnect);
      stompClient.connect({}, function (frame) {
        setSocket(stompClient);
        console.log("Connected: " + frame);

        stompClient.subscribe(
          "/topic/notification/" + keycloak.tokenParsed.sub,
          function (message) {
            const messageBody = JSON.parse(message.body);
            console.log(messageBody);
            switch (messageBody.type) {
              case LIST_INIT:
                setNotifications(messageBody.body);
                break;
              case ADDED_MESSAGE:
                setNotifications((old) => {
                  return [messageBody.body, ...old];
                });
            }
          }
        );
      });
    }
    return () => {
      if (socket) {
        socket.unsubscribe("/topic/notification/" + keycloak.tokenParsed.sub);
        socket.disconnect();
      }
    };
  }, [keycloak.tokenParsed]);

  return (
    <NotificationContext.Provider
      value={{ notifications, toggleNotification, open, setOpen }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
