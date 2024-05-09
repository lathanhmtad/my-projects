import React, { useContext, useEffect, useState } from "react";
import classes from "./adminLivePlayingRoom.module.css";
import { LiveRoomContext } from "../../rootComponent/adminLiveRoom/AdminLiveRoomRouter/context/adminLiveRoomProvider";
import mergeClassNames from "merge-class-names";
import Overview from "../AdminLiveScoredRoom/Overview";
import QuestionList from "../AdminLiveScoredRoom/QuestionList";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function AdminLivePlayingRoom(props) {
  const { statistic, room } = useContext(LiveRoomContext);
  const { roomId } = useParams();
  const [tab, setTab] = useState(0);
  const stateStatistic = statistic
    ? statistic
    : { accuracy: 0, answerTimes: [] };
  const rootStyle = {
    "--right-accuracy": `${stateStatistic.accuracy * 100}% `,
    "--wrong-accuracy": `${100 - stateStatistic.accuracy * 100}%`,
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Theo dõi kết quả phòng thi";
  }, []);
  useEffect(() => {
    if (!room) {
      toast.error("Bạn cần kiểm soát phòng từ đầu!");
      navigate("/admin/home");
    }
  }, [room, roomId]);
  return (
    <div className={classes.root} style={rootStyle}>
      <div className={classes.topContainer}>
        <div className={classes.left}>
          <span>0 pts</span>
        </div>
        <div className={classes.center}>
          <span>{`${(stateStatistic.accuracy * 100).toFixed(2)}%`}</span>
          <span>Chính xác</span>
        </div>
        <div className={classes.right}>
          <span>0pts</span>
        </div>
      </div>
      <div className={classes.bottomContainer}>
        <div className={classes.tabList}>
          <div
            className={mergeClassNames(tab === 0 ? classes.active : "")}
            onClick={() => setTab(0)}
          >
            Tổng quan
          </div>
          <div
            className={mergeClassNames(tab === 1 ? classes.active : "")}
            onClick={() => setTab(1)}
          >
            Câu hỏi
          </div>
        </div>
        {tab === 0 && <Overview answerTimes={stateStatistic.answerTimes} />}
        {tab === 1 && (
          <QuestionList
            questions={stateStatistic.answerTimes[0]?.questionAnswers}
          />
        )}
      </div>
    </div>
  );
}

export default AdminLivePlayingRoom;
