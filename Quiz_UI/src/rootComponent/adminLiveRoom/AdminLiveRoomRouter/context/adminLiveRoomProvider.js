import React, { useEffect, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import roomApi from "../../../../api/roomApi";
import {
  RECEIVE_END_ROOM,
  RECEIVE_JOIN_ROOM,
  RECEIVE_LEFT_ROOM,
  RECEIVE_START_ROOM,
  RECEIVE_STATISTIC,
} from "../../../common/messageType";
import fillRoomName from "../../../../logic/fillRoomName";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router";

export const LiveRoomContext = React.createContext();

function AdminLiveRoomProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState(null);
  const [statistic, setStatistic] = useState(null);
  const [listActiveUser, setListActiveUser] = useState([]);
  const { keycloak } = useKeycloak();
  const { roomId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    roomApi
      .get(roomId)
      .then((response) => setRoom(response.data))
      .catch((e) => console.error(e));
  }, [roomId]);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8087/socket");
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {
        userId: keycloak.tokenParsed?.sub,
        avatar:
          "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.18169-1/12027587_1617365158530569_2122292052928066527_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=vse03D0cXRIAX9pZP4H&_nc_ht=scontent-hkg4-2.xx&oh=00_AfAD7Fu2ZK5_hE3Rw-X7FRecvdwtN7KsJFq4F47ooVVDfw&oe=63D91BC0",
        username: keycloak.tokenParsed?.name,
        admin: true,
      },
      function (frame) {
        setSocket(stompClient);
        setConnected(true);
        console.log("Connected: " + frame);

        stompClient.subscribe(
          "/topic/room-admin/" + fillRoomName(roomId),
          function (message) {
            const messageBody = JSON.parse(message.body);
            console.log(messageBody);
            switch (messageBody.type) {
              case RECEIVE_STATISTIC:
                setStatistic(messageBody.message);
                break;
              case RECEIVE_LEFT_ROOM:
              case RECEIVE_JOIN_ROOM:
                setListActiveUser(messageBody.message);
                break;
              case RECEIVE_START_ROOM:
                handleReceiveStartRoom(messageBody.message);
                break;
              case RECEIVE_END_ROOM:
                handleEndRoom();
                break;
            }
          }
        );
      }
    );
    return () => {
      if (socket && stompClient) {
        stompClient.disconnect();
        socket.close();
      }
    };
  }, []);

  const handleStartRoom = () => {
    socket.send(
      "/app/start-room/" + fillRoomName(roomId),
      {},
      JSON.stringify({
        type: "",
        body: room.lessonId + "",
      })
    );
  };

  const handleReceiveStartRoom = () => {
    navigate(`/admin/quiz-room/${fillRoomName(roomId)}/playing-game`);
  };

  const handleEndRoom = () => {
    navigate(`/admin/quiz-room/${fillRoomName(roomId)}/scored-game`);
  };

  return (
    <LiveRoomContext.Provider
      value={{
        handleStartRoom,
        listActiveUser,
        statistic,
        socket,
        room,
      }}
    >
      {children}
    </LiveRoomContext.Provider>
  );
}

export default AdminLiveRoomProvider;
