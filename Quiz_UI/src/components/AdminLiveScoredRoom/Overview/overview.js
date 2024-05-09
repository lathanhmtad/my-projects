import React from "react";
import classes from "./overview.module.css";
import Icon from "../../../commonComponents/Icon";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { GrClose } from "@react-icons/all-files/gr/GrClose";
import Button from "../../../commonComponents/Button";
import { AiOutlineMail } from "@react-icons/all-files/ai/AiOutlineMail";
import Skeleton from "react-loading-skeleton";

function Overview(props) {
  const { answerTimes } = props;
  if (!answerTimes || answerTimes.length === 0) return <OverviewShimmer />;
  return (
    <div className={classes.playerContainer}>
      <div className={classes.playerHeader}>
        <div>
          <Button preIcon={<AiOutlineMail />}>
            Gửi mail cho tất cả phụ huynh
          </Button>
        </div>
        <div className={classes.showTime}>
          <span>Hiển thị thời gian trả lời</span>
          <input type={"checkbox"} />
        </div>
      </div>
      <div className={classes.tablePlayer}>
        <div className={classes.tableTitle}>
          <div></div>
          <div>Tên người tham gia</div>
          <div>Điểm số</div>
          {new Array(answerTimes[0].questionAnswers.length)
            .fill(null)
            .map((x, index) => (
              <div key={index}>{`Q${index + 1}`}</div>
            ))}
          <div></div>
        </div>
        <div className={classes.players}>
          {answerTimes.map((answerTime, index) => (
            <div className={classes.player} key={answerTime.id}>
              <div>{index + 1}</div>
              <div>
                <span>
                  <img
                    alt={"avatar"}
                    src={
                      "https://cf.quizizz.com/join/img/avatars/tablet_sm/monster33.png"
                    }
                  />
                </span>
                <div>{answerTime.nickName}</div>
              </div>
              <div>{answerTime.point}</div>
              {answerTime.questionAnswers.map((questionAnswer) =>
                questionAnswer.rightAnswer ? (
                  <div className={classes.right} key={questionAnswer.id}>
                    <Icon>
                      <FaCheck />
                    </Icon>
                  </div>
                ) : (
                  <div className={classes.wrong} key={questionAnswer.id}>
                    <Icon>
                      <GrClose />
                    </Icon>
                  </div>
                )
              )}
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OverviewShimmer() {
  return (
    <div className={classes.playerContainer}>
      <div className={classes.playerHeader}>
        <div>Chưa có thông tin thống kê</div>
        <div className={classes.showTime}>
          <Skeleton width={"80px"} height={"20px"} />
        </div>
      </div>
      <div className={classes.tablePlayer}>
        <div className={classes.tableTitle}>
          <div></div>
          <div>
            <Skeleton width={"80px"} height={"20px"} />
          </div>
          <div>
            <Skeleton width={"40px"} height={"20px"} />
          </div>
          {new Array(5).fill(null).map((x, index) => (
            <div key={index}>
              <Skeleton width={"20px"} height={"20px"} />
            </div>
          ))}
          <div></div>
        </div>
        <div className={classes.players}>
          {new Array(5).fill(null).map((x, index) => (
            <div className={classes.player} key={index}>
              <div>
                <Skeleton width={"20px"} height={"20px"} />
              </div>
              <div>
                <span>
                  <Skeleton width={"30px"} height={"30px"} circle={true} />
                </span>
                <Skeleton width={"100px"} height={"20px"} />
              </div>
              <div>
                <Skeleton width={"60px"} height={"20px"} />
              </div>
              {new Array(5).fill(null).map((x, index) => (
                <Skeleton key={index} width={"25px"} height={"25px"} />
              ))}
              <div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
