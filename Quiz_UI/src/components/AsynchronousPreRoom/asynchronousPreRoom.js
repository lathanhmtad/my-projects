import React, { useContext, useEffect, useState } from "react";
import classes from "./asynchronousPreRoom.module.css";
import LoadingButton from "../../commonComponents/LoadingButton";
import { AsynchronousRoomContext } from "../../rootComponent/asynchronousRoom/AsynchronousRoomRouter/context/asynchronousRoomProvider";
import roomApi from "../../api/roomApi";
import { toast } from "react-toastify";
import fillRoomName from "../../logic/fillRoomName";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

function AsynchronousPreRoom(props) {
  const { handleConnectSocket, handleDisconnectSocket } = useContext(
    AsynchronousRoomContext
  );
  const [nickname, setNickname] = useState("");
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Nhập nickname";
  }, []);

  useEffect(() => {
    roomApi
      .checkStarted(roomId)
      .then((response) => {
        if (response.data) {
          toast.error(`Phòng thi ${fillRoomName(roomId)} đã kết thúc`);
          navigate("/join");
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    handleDisconnectSocket();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h2>Tên của bạn là...</h2>
        <div className={classes.inputContainer}>
          <input
            value={nickname}
            placeholder={"Nhập tên của bạn trong phòng thi"}
            onChange={(e) => setNickname(e.target.value)}
            className={classes.input}
          />
        </div>
        <LoadingButton
          className={classes.button}
          onClick={() => handleConnectSocket(nickname)}
          fullWidth={true}
        >
          Bắt đầu
        </LoadingButton>
      </div>
    </div>
  );
}

export default AsynchronousPreRoom;
