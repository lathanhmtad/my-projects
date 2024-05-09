import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import roomApi from "../../../../api/roomApi";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  RECEIVE_END_ROOM,
  RECEIVE_FIRST_QUESTION,
  RECEIVE_JOIN_ROOM,
  RECEIVE_LAST_QUESTION,
  RECEIVE_LEFT_ROOM,
  RECEIVE_QUESTION,
  RECEIVE_START_ROOM,
} from "../../../common/messageType";
import { useNavigate } from "react-router";
import fillRoomName from "../../../../logic/fillRoomName";
import { toast } from "react-toastify";
import questionAnswerApi from "../../../../api/questionAnswerApi";
import answerTimeApi from "../../../../api/answerTimeApi";
import { useKeycloak } from "@react-keycloak/web";

export const AsynchronousRoomContext = React.createContext();

function AsynchronousRoomProvider({ children }) {
  const [answerTime, setAnswerTime] = useState(null);
  const [nickname, setNickname] = useState("");
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [room, setRoom] = useState(null);
  const [listActiveUser, setListActiveUser] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(-1);
  const [count, setCount] = useState(-1);
  const [resultTime, setResultTime] = useState(-1);
  const [starting, setStarting] = useState(false);
  const [point, setPoint] = useState();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { keycloak } = useKeycloak();

  useEffect(() => {
    roomApi
      .get(roomId)
      .then((response) => setRoom(response.data))
      .catch((e) => console.error(e));
  }, [roomId]);

  useEffect(() => {
    return () => {
      setSocket((oldSocket) => {
        if (oldSocket) {
          console.log("close socket", socket);
          oldSocket.unsubscribe("/topic/room-message/" + roomId);
          oldSocket.disconnect();
        }
      });
    };
  }, []);

  const handleConnectSocket = (nickname) => {
    setNickname(nickname);
    const socket = new SockJS("http://localhost:8087/socket");
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {
        userId: keycloak.tokenParsed?.sub,
        avatar:
          "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.18169-1/12027587_1617365158530569_2122292052928066527_n.jpg?stp=dst-jpg_p320x320&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=vse03D0cXRIAX9pZP4H&_nc_ht=scontent-hkg4-2.xx&oh=00_AfAD7Fu2ZK5_hE3Rw-X7FRecvdwtN7KsJFq4F47ooVVDfw&oe=63D91BC0",
        nickname: nickname,
        username: keycloak.tokenParsed?.name,
      },
      function (frame) {
        setSocket(stompClient);
        setConnected(true);
        console.log("Connected: " + frame);

        stompClient.subscribe(
          "/topic/room-message/" + roomId,
          function (message) {
            const messageBody = JSON.parse(message.body);
            console.log(messageBody);
            switch (messageBody.type) {
              case RECEIVE_LEFT_ROOM:
              case RECEIVE_JOIN_ROOM:
                setListActiveUser(messageBody.message);
                break;
              case RECEIVE_START_ROOM:
                handleStartRoom(messageBody.message);
                break;
              case RECEIVE_QUESTION:
              case RECEIVE_LAST_QUESTION:
              case RECEIVE_FIRST_QUESTION:
                handleReceiveQuestion(messageBody);
                break;
              case RECEIVE_END_ROOM:
                handleEndRoom();
                break;
            }
          }
        );
      }
    );
    navigate(`/join/asynchronous/${fillRoomName(roomId)}/pre-game`);
    toast.info("Bạn đã tham gia phòng " + fillRoomName(roomId));
  };

  const handleDisconnectSocket = () => {
    if (socket) {
      console.log("close socket", socket);
      socket.unsubscribe("/topic/room-message/" + roomId);
      socket.disconnect();
    }
  };

  const handleEndRoom = () => {
    setAnswerTime((oldAnswerTime) => {
      navigate(
        `/join/asynchronous/${fillRoomName(roomId)}/scored-game/${
          oldAnswerTime.id
        }`
      );
      return oldAnswerTime;
    });
  };

  const handleReceiveQuestion = (messageBody) => {
    console.log("Receive and update question: ", messageBody.message);
    setCurrentQuestionIdx((old) => old + 1);
    setCurrentQuestion({ ...messageBody.message });
    setAnswerTime((oldAnswerTime) => {
      if (messageBody.type === RECEIVE_FIRST_QUESTION) {
        setStarting(false);
        navigate(
          `/join/asynchronous/${fillRoomName(roomId)}/playing-game/${
            oldAnswerTime.id
          }`
        );
      }
      return oldAnswerTime;
    });
  };

  const handleStartRoom = (pendingTime) => {
    setStarting(true);
    console.log("Start room pending time: " + pendingTime);
    const dataObject = {
      lessonId: room.lessonId,
      userId: null,
      socketId: null,
      nickName: null,
      room: {
        id: room.id,
      },
      questionAnswers: [],
    };
    answerTimeApi
      .add(dataObject)
      .then((response) => {
        setAnswerTime(response.data);
      })
      .catch((e) => {
        console.log(e);
        navigate(`/join`);
        toast.error("Có lỗi xảy ra");
      });
  };

  const handleAddAnswer = (data) => {
    questionAnswerApi
      .add({
        ...data,
        answerTime: {
          id: answerTime.id,
        },
      })
      .then((response) => {})
      .catch((e) => console.error(e));
  };

  return (
    <AsynchronousRoomContext.Provider
      value={{
        handleConnectSocket,
        listActiveUser,
        nickname,
        room,
        currentQuestionIdx,
        count,
        setCount,
        resultTime,
        setResultTime,
        point,
        setPoint,
        handleAddAnswer,
        currentQuestion,
        starting,
        handleDisconnectSocket,
        socket,
      }}
    >
      {children}
    </AsynchronousRoomContext.Provider>
  );
}

export default AsynchronousRoomProvider;
