import React, { useContext } from "react";
import classes from "./questionList.module.css";
import { GrRadialSelected } from "@react-icons/all-files/gr/GrRadialSelected";
import Button from "../../../commonComponents/Button";
import { FaDotCircle } from "@react-icons/all-files/fa/FaDotCircle";
import Icon from "../../../commonComponents/Icon";
import { ModalContext } from "../../../rootComponent/common/ModalContainer/ModalContext/modalContext";
import QuestionDetail from "../QuestionDetail";
import Skeleton from "react-loading-skeleton";

function QuestionList(props) {
  const { openModal } = useContext(ModalContext);
  const { questions } = props;
  const handleViewDetail = (question) => {
    openModal(<QuestionDetail question={question} />);
  };
  if (!questions) return <QuestionListShimmer />;
  return (
    <div className={classes.root}>
      <div className={classes.rootHeader}>
        <span>Sắp xếp theo độ chính xác</span>
        <input type={"checkbox"} />
      </div>
      <div className={classes.shortcut}>
        {new Array(questions.length).fill(null).map((x, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
      <div className={classes.questions}>
        {questions.map((question, index) => (
          <div
            className={classes.question}
            key={index}
            onClick={() => handleViewDetail(question)}
          >
            <div className={classes.header}>
              <div>
                <Button
                  preIcon={<GrRadialSelected />}
                  className={classes.multiChoice}
                >
                  Nhiều lựa chọn
                </Button>
              </div>
              <div>
                <div>
                  <span>Thời gian trả lời TB</span>
                  <span>12 secs</span>
                </div>
                <div>
                  <span>1 chính xác, 1 không chính xác</span>
                </div>
              </div>
            </div>
            <div className={classes.questionContent}>
              <h3>{`${index + 1}. ${question.title}`}</h3>
              <div className={classes.answerList}>
                {question.questionAnswerParts.map(
                  (questionAnswerPart, index) => (
                    <div className={classes.answer} key={index}>
                      <Icon icon={<FaDotCircle />} />
                      <span>{questionAnswerPart.title}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionListShimmer() {
  return (
    <div className={classes.root}>
      <div className={classes.rootHeader}>
        <span>Chưa có thông tin thông tin thống kê</span>
      </div>
      <div className={classes.shortcut}>
        {new Array(5).fill(null).map((x, index) => (
          <span key={index}>
            <Skeleton width={"32px"} height={"32px"} />
          </span>
        ))}
      </div>
      <div className={classes.questions}>
        {new Array(5).fill(null).map((question, index) => (
          <div className={classes.question} key={index}>
            <div className={classes.header}>
              <div>
                <Skeleton width={"120px"} height={"42px"} />
              </div>
              <div>
                <div>
                  <span>
                    <Skeleton width={"120px"} height={"20px"} />
                  </span>
                  <span>
                    <Skeleton width={"80px"} height={"20px"} />
                  </span>
                </div>
                <div>
                  <span>
                    <Skeleton width={"100px"} height={"20px"} />
                  </span>
                </div>
              </div>
            </div>
            <div className={classes.questionContent}>
              <h3>
                <Skeleton width={"350px"} height={"20px"} />
              </h3>
              <div className={classes.answerList}>
                {new Array(4).fill(null).map((x, index) => (
                  <div className={classes.answer} key={index}>
                    <Icon icon={<FaDotCircle />} />
                    <span>
                      <Skeleton width={"100px"} height={"20px"} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionList;
