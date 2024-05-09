import React from "react";
import classes from "./questionDetail.module.css";
import Icon from "../../../commonComponents/Icon";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { FiTarget } from "@react-icons/all-files/fi/FiTarget";

function QuestionDetail(props) {
  const { question } = props;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.average}>
          <Icon>
            <AiOutlineClockCircle />
          </Icon>
          <span>Thời gian trung bình: 16 giây</span>
        </div>
        <div className={classes.accuracy}>
          <Icon>
            <FiTarget />
          </Icon>
          <span>
            Chính xác: <span className={classes.fullRight}>100%</span>
          </span>
        </div>
      </div>
      <h3>{question.title}</h3>
      <div className={classes.answerList}>
        {question.questionAnswerParts.map((questionAnswerPart, index) => (
          <div className={classes.answer} key={index}>
            <span>{questionAnswerPart.title}</span>
            <span className={classes.footer}>1 người chơi</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionDetail;
