import React, { useContext, useEffect, useState } from "react";
import classes from "./scoredRoom.module.css";
import Icon from "../../commonComponents/Icon";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { GiShare } from "@react-icons/all-files/gi/GiShare";
import { ImDatabase } from "@react-icons/all-files/im/ImDatabase";
import Button from "../../commonComponents/Button";
import Question from "./Question";
import Suggestion from "./Suggestion";
import { useParams } from "react-router-dom";
import statisticApi from "../../api/statisticApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../rootComponent/private/AuthProvider";
import RankStatistic from "../../commonComponents/RankStatistic";
import RoomLoading from "../../commonComponents/RoomLoading";

function ScoredRoom(props) {
  const { answerTimeId, lessonId, roomId } = useParams();
  const [fetching, setFetching] = useState(false);
  const { access } = useContext(AuthContext);
  const [answerTimeStatistic, setAnswerTimeStatistic] = useState(null);
  const [rankStatistic, setRankStatistic] = useState(null);
  const [openRankStatistic, setOpenRankStatistic] = useState(false);
  useEffect(() => {
    if (answerTimeId) {
      statisticApi
        .getAnswerTimeStatistic(answerTimeId)
        .then((response) => {
          setAnswerTimeStatistic(response.data);
          setFetching(false);
        })
        .catch((e) => {
          toast.error("Có lỗi xảy ra!");
          console.error(e);
        })
        .finally(() => {});
    }
  }, [answerTimeId, access]);

  useEffect(() => {
    if (lessonId) {
      document.title = "Kết quả thực hành";
    } else {
      document.title = "Kết quả kiểm tra";
    }
  }, []);

  useEffect(() => {
    if (lessonId) {
      statisticApi
        .getAnswerTimeRank(lessonId)
        .then((response) => {
          setRankStatistic(response.data);
        })
        .catch((e) => {
          toast.error("Có lỗi xảy ra!");
          console.error(e);
        })
        .finally(() => {});
    } else if (roomId) {
      statisticApi
        .getRoomRank(roomId)
        .then((response) => {
          setRankStatistic(response.data);
        })
        .catch((e) => {
          toast.error("Có lỗi xảy ra!");
          console.error(e);
        })
        .finally(() => {});
    }
  }, [lessonId, roomId, access]);
  console.log(rankStatistic);
  if (fetching) return <RoomLoading />;
  if (!answerTimeStatistic) return null;
  return (
    <ScoredRoomBody
      answerTimeStatistic={answerTimeStatistic}
      rankStatistic={rankStatistic}
      openRankStatistic={openRankStatistic}
      setOpenRankStatistic={setOpenRankStatistic}
    />
  );
}

function ScoredRoomBody(props) {
  const {
    answerTimeStatistic,
    rankStatistic,
    openRankStatistic,
    setOpenRankStatistic,
  } = props;

  return (
    <section className={classes.root}>
      {
        <RankStatistic
          rankStatistic={rankStatistic}
          openStatistic={openRankStatistic}
          setOpenRankStatistic={setOpenRankStatistic}
        />
      }
      <div className={classes.row}>
        <div className={classes.left}>
          <h2>Bản tóm tắt</h2>
          <div className={classes.summary}>
            <div className={classes.profile}>
              <div className={classes.avatar}>
                <img
                  src={
                    "https://cf.quizizz.com/join/img/avatars/tablet_lg/monster36.png"
                  }
                  alt={"avatar"}
                />
              </div>
              <div className={classes.info}>
                <h3>me</h3>
                <span>
                  <Icon icon={<BsFillPersonFill />} />
                  <span>Solo review</span>
                </span>
              </div>
              <div className={classes.share}>
                <Button>
                  <GiShare />
                </Button>
              </div>
            </div>
            <div className={classes.accuracy}>
              <h4>Chính xác</h4>
              <div className={classes.progress}>
                <progress
                  id="file"
                  value={answerTimeStatistic.accuracy * 100}
                  max="100"
                ></progress>
              </div>
            </div>
            <div className={classes.score}>
              <div className={classes.scoreLeft}>
                <h4>Điểm số</h4>
                <span>{answerTimeStatistic.point}</span>
              </div>
              <div className={classes.scoreRight}>
                <Button>
                  <ImDatabase />
                </Button>
              </div>
            </div>
          </div>
          <div className={classes.action}>
            {
              <Button
                fullWidth={true}
                to={`/join/practice/${answerTimeStatistic.lessonId}/pre-game`}
              >
                Bắt đầu lại
              </Button>
            }
            <Button fullWidth={true} onClick={() => setOpenRankStatistic(true)}>
              Xem bảng xếp hạng
            </Button>
          </div>
          <div className={classes.statistic}>
            <h3>Thống kê hiệu suất</h3>
            <div className={classes.statisticRow}>
              <div>
                <span>{answerTimeStatistic.numberOfRight}</span>
                <span>Chính xác</span>
              </div>
              <div>
                <span>{answerTimeStatistic.numberOfWrong}</span>
                <span>Không chính xác</span>
              </div>
              <div>
                <span>{`${answerTimeStatistic.averageDuration.toFixed(
                  2
                )}s`}</span>
                <span>Thời gian / ques.</span>
              </div>
            </div>
          </div>
          <div className={classes.preview}>
            <h2>Xem lại câu hỏi</h2>
            <p>Nhấp vào các câu hỏi để xem câu trả lời</p>
            <div className={classes.questions}>
              {answerTimeStatistic.questionAnswers.map((question, index) => (
                <Question
                  key={question.id}
                  questionAnswer={answerTimeStatistic.questionAnswers[index]}
                  questionIndex={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={classes.right}>
          <div className={classes.rightContainer}>
            <h2>Bạn cũng có thể thích...</h2>
            <div className={classes.suggested}>
              <Suggestion />
              <Suggestion />
              <Suggestion />
              <Suggestion />
              <Suggestion />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScoredRoom;
