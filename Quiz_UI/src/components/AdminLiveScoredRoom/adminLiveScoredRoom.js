import React, { useContext, useEffect, useState } from "react";
import classes from "./adminLiveScoredRoom.module.css";
import Icon from "../../commonComponents/Icon";
import { GiFireworkRocket } from "@react-icons/all-files/gi/GiFireworkRocket";
import Button from "../../commonComponents/Button";
import Overview from "./Overview";
import mergeClassNames from "merge-class-names";
import QuestionList from "./QuestionList";
import statisticApi from "../../api/statisticApi";
import { useParams } from "react-router-dom";
import RoomLoading from "../../commonComponents/RoomLoading";
import { AuthContext } from "../../rootComponent/private/AuthProvider";
import { toast } from "react-toastify";

function AdminLiveScoredRoom(props) {
  const [statistic, setStatistic] = useState();
  const [fetching, setFetching] = useState(true);
  const { roomId } = useParams();
  const { access } = useContext(AuthContext);

  useEffect(() => {
    statisticApi
      .getRoomStatistic(roomId)
      .then((response) => {
        setStatistic(response.data);
        setFetching(false);
      })
      .catch((e) => {
        toast.error("Có lỗi xảy ra!");
        console.error(e);
      })
      .finally();
  }, [roomId, access]);
  console.log(statistic);
  if (fetching || !statistic) return <RoomLoading />;
  return <AdminLiveScoredRoomMain statistic={statistic} />;
}

function AdminLiveScoredRoomMain(props) {
  const [tab, setTab] = useState(0);
  const { statistic } = props;
  const progressStyle = {
    "--accuracy-progress": `${statistic.accuracy * 100}%`,
  };
  useEffect(() => {
    document.title = "Thống kê kết quả phòng thi";
  }, []);

  return (
    <div className={classes.root} style={progressStyle}>
      <div className={classes.mainResultContainer}>
        <div className={classes.mainResult}>
          <h3>Độ chính xác của lớp học</h3>
          <div className={classes.accuracy}>
            <div className={classes.bar}></div>
            <div className={classes.barButton}>{`${(
              statistic.accuracy * 100
            ).toFixed(2)}%`}</div>
          </div>
          <div className={classes.percentList}>
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
            <span>30%</span>
            <span>40%</span>
            <span>50%</span>
            <span>60%</span>
            <span>70%</span>
            <span>80%</span>
            <span>90%</span>
            <span>100%</span>
          </div>
          <div className={classes.message}>
            <span>We did it!</span>
            <Icon>
              <GiFireworkRocket />
            </Icon>
          </div>
          <div className={classes.review}>
            Review questions to reveal the toughest topics for your class
          </div>
          <div className={classes.buttonContainer}>
            <Button>Replay</Button>
            <Button>Assign Practice</Button>
            <Button>Xem lại câu hỏi</Button>
          </div>
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
        {tab === 0 && <Overview answerTimes={statistic.answerTimes} />}
        {tab === 1 && (
          <QuestionList questions={statistic.answerTimes[0].questionAnswers} />
        )}
      </div>
    </div>
  );
}

export default AdminLiveScoredRoom;
