import React, { useContext, useEffect } from "react";
import classes from "./adminLiveWaitingRoom.module.css";
import Icon from "../../commonComponents/Icon";
import { GrGroup } from "@react-icons/all-files/gr/GrGroup";
import LoadingButton from "../../commonComponents/LoadingButton";
import { Link, useParams } from "react-router-dom";
import Button from "../../commonComponents/Button";
import { FiCopy } from "@react-icons/all-files/fi/FiCopy";
import { ImQrcode } from "@react-icons/all-files/im/ImQrcode";
import { BsLink45Deg } from "@react-icons/all-files/bs/BsLink45Deg";
import { IoTabletLandscape } from "@react-icons/all-files/io5/IoTabletLandscape";
import { HiMail } from "@react-icons/all-files/hi/HiMail";
import { GrList } from "@react-icons/all-files/gr/GrList";
import fillRoomName from "../../logic/fillRoomName";
import { LiveRoomContext } from "../../rootComponent/adminLiveRoom/AdminLiveRoomRouter/context/adminLiveRoomProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import roomApi from "../../api/roomApi";

function AdminLiveWaitingRoom(props) {
  const { handleStartRoom, listActiveUser } = useContext(LiveRoomContext);
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Phòng chờ";
  }, []);

  useEffect(() => {
    roomApi
      .checkStarted(roomId)
      .then((response) => {
        if (response.data) {
          toast.error(`Phòng thi ${fillRoomName(roomId)} đã kết thúc`);
          navigate("/admin/home");
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra");
      })
      .finally(() => {});
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(
        `http://localhost:3000/join/asynchronous/${fillRoomName(
          roomId
        )}/pre-game/nickname`
      )
      .then(() => {
        toast.info("Đã copy link tham gia vào bộ nhớ tạm");
      })
      .catch(() => {
        toast.error("Không thể copy link");
      });
  };
  const handleCopyRoom = () => {
    navigator.clipboard
      .writeText(`${fillRoomName(roomId)}`)
      .then(() => {
        toast.info("Đã lưu mã phòng vào bộ nhớ tạm");
      })
      .catch(() => {
        toast.error("Không thể copy tên phòng");
      });
  };
  return (
    <div className={classes.root}>
      <div className={classes.top}>
        <div className={classes.contentContainer}>
          <div className={classes.topTitle}>Để làm quizz này</div>
          <div className={classes.group}>
            <div>1. Sử dụng bất kỳ thiết bị nào để mở</div>
            <div className={classes.joinLinkContainer}>
              <div>
                <Link
                  to={`/join/asynchronous/${fillRoomName(
                    roomId
                  )}/pre-game/nickname`}
                >
                  joinmyquiz.com
                </Link>
                <Button onClick={handleCopyLink}>
                  <Icon>
                    <FiCopy />
                  </Icon>
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.group}>
            <div>2. Nhập mã tham gia</div>
            <div className={classes.joinLinkContainer}>
              <div>
                <span>{fillRoomName(roomId)}</span>
                <Button onClick={handleCopyRoom}>
                  <Icon>
                    <FiCopy />
                  </Icon>
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.lineGroup}>
            <span></span>
            <span>or</span>
            <span></span>
          </div>
          <div>
            <Button preIcon={<ImQrcode />}>Tham gia qua mã QR</Button>
          </div>
          <div className={classes.shareTitle}>
            <span>hoặc chia sẻ thông qua ...</span>
          </div>
          <div className={classes.share}>
            <Label>
              <Icon>
                <BsLink45Deg />
              </Icon>
            </Label>
            <Label>
              <Icon>
                <IoTabletLandscape />
              </Icon>
            </Label>
            <Label>
              <Icon>
                <HiMail />
              </Icon>
            </Label>
            <Label>
              <Icon>
                <GrList />
              </Icon>
            </Label>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        <span className={classes.countBadge}>
          <Icon>
            <GrGroup />
          </Icon>
          <span>{listActiveUser.length}</span>
        </span>
        <div className={classes.controller}>
          <LoadingButton onClick={handleStartRoom}>Bắt đầu</LoadingButton>
          {listActiveUser.length === 0 && <h3>Chờ người khác tham gia ..</h3>}
          <div className={classes.playerList}>
            {listActiveUser.map((activeUser, index) => (
              <div className={classes.player} key={index}>
                <span className={classes.playerName}>
                  {activeUser.nickname}
                </span>
                <span className={classes.avatar}>
                  <img alt={activeUser.nickname} src={activeUser.avatar} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, callback }) {
  return (
    <div className={classes.labelRoot} onClick={callback}>
      {children}
    </div>
  );
}

export default AdminLiveWaitingRoom;
