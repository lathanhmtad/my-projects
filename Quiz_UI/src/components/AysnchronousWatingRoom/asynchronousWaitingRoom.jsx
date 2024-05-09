import React, { useContext, useEffect } from "react";
import classes from "./asynchronousWaitingRoom.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { AsynchronousRoomContext } from "../../rootComponent/asynchronousRoom/AsynchronousRoomRouter/context/asynchronousRoomProvider";
import fillRoomName from "../../logic/fillRoomName";
import LoadingIcon from "../../commonComponents/LoadingIcon";
import Icon from "../../commonComponents/Icon";
import { GrGroup } from "@react-icons/all-files/gr/GrGroup";

function AsynchronousWaitingRoom(props) {
  const { room, nickname, listActiveUser, starting } = useContext(
    AsynchronousRoomContext
  );
  const navigate = useNavigate();
  const { roomId } = useParams();
  useEffect(() => {
    document.title = "Phòng chờ";
  }, []);
  if (!room || !nickname) {
    navigate(`/join/asynchronous/${fillRoomName(roomId)}/pre-game/nickname`);
    return null;
  }
  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={classes.topSection}>
          <div>
            <div className={classes.avatar}>
              <img src={""} alt={""} />
            </div>
            <div className={classes.nickname}>
              <h2>{nickname}</h2>
              <span>Bạn</span>
            </div>
          </div>
          <div>
            <span>Mã tham gia</span>
            <h2>{fillRoomName(room.id)}</h2>
          </div>
        </div>
        <div className={classes.bottomSection}>
          {!starting && <h2>Chờ máy chủ khởi động</h2>}
          {starting && (
            <div className={classes.loading}>
              <LoadingIcon />
              <h2>Đang tải câu hỏi đầu tiên</h2>
            </div>
          )}
        </div>
      </div>
      <div className={classes.footer}>
        {listActiveUser.length <= 1 && <h3>Bạn là người đầu tiên tham gia</h3>}
        <div className={classes.playerList}>
          {listActiveUser.map((activeUser, index) => (
            <div className={classes.player} key={index}>
              <span className={classes.playerName}>{activeUser.nickname}</span>
              <span className={classes.avatar}>
                <img alt={activeUser.nickname} src={activeUser.avatar} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <span className={classes.countBadge}>
        <Icon>
          <GrGroup />
        </Icon>
        <span>{listActiveUser.length}</span>
      </span>
    </section>
  );
}

export default AsynchronousWaitingRoom;
