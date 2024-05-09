import React, { useContext, useEffect } from "react";
import classes from "./practiceWaitingRoom.module.css";
import Button from "../../commonComponents/Button";
import { FiShare2 } from "@react-icons/all-files/fi/FiShare2";
import { BiRun } from "@react-icons/all-files/bi/BiRun";
import { FaFlagCheckered } from "@react-icons/all-files/fa/FaFlagCheckered";
import { FcVoicePresentation } from "@react-icons/all-files/fc/FcVoicePresentation";
import { RoomContext } from "../../rootComponent/practiceRoom/PracticeRoomRouter/context/practiceRoomProvider";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../commonComponents/LoadingButton";

function PracticeWaitingRoom(props) {
  const { lesson, setStarted, handleStartRoom, startFetching } =
    useContext(RoomContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Phòng chờ";
  }, []);
  if (!lesson) return null;
  return (
    <section className={classes.root}>
      <div className={classes.row}>
        <div className={classes.firstColumn}>
          <div className={classes.info}>
            <div className={classes.imgContainer}>
              <img
                alt={"thumbnail"}
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
              />
            </div>
            <div className={classes.infoContainer}>
              <h2>{lesson.title}</h2>
              <span>
                <span>{lesson.numberOfQuestion}</span> slide
              </span>
            </div>
          </div>
          <div className={classes.owner}>
            <span>
              <FcVoicePresentation />
            </span>
            <span>Qua:</span>
            <span>dieuthanhtb_80954</span>
          </div>
          <div>
            <Button preIcon={<FiShare2 />} fullWidth>
              Chia sẻ
            </Button>
          </div>
        </div>
        <div className={classes.secondColumn}>
          <div className={classes.progressContainer}>
            <div className={classes.top}>
              <BiRun />
              <FaFlagCheckered />
            </div>
            <div className={classes.progress}>
              <progress id="file" value="0" max="100">
                0%
              </progress>
            </div>
            <div className={classes.bottom}>
              <span>Bắt đầu</span>
              <span>Kết thúc</span>
            </div>
            <h2>{`${lesson.numberOfQuestion} slide còn lại`}</h2>
            <LoadingButton
              light={true}
              fetching={startFetching}
              fullWidth
              onClick={handleStartRoom}
            >
              Bắt đầu thôi
            </LoadingButton>
          </div>
        </div>
        <div className={classes.thirdColumn}></div>
      </div>
    </section>
  );
}

export default PracticeWaitingRoom;
