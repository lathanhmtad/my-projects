import React, { useContext } from "react";
import classes from "./question.module.css";
import Icon from "../../../commonComponents/Icon";
import { FaDotCircle } from "@react-icons/all-files/fa/FaDotCircle";
import mergeClassNames from "merge-class-names";
import { ModalContext } from "../../../rootComponent/common/ModalContainer/ModalContext/modalContext";
import QuestionDetail from "../QuestionDetail";

function Question(props) {
  const { className, questionAnswer, questionIndex } = props;
  const mergedClass = mergeClassNames(
    classes.root,
    className,
    questionAnswer && questionAnswer.rightAnswer ? classes.right : classes.wrong
  );
  const { openModal } = useContext(ModalContext);
  const handleOpenQuestion = () => {
    openModal(
      <QuestionDetail
        questionAnswer={questionAnswer}
        questionIndex={questionIndex}
      />
    );
  };
  return (
    <div className={mergedClass} onClick={handleOpenQuestion}>
      <div className={classes.container}>
        <h2>
          <span>{`${questionIndex}.`}</span>
          <span>{questionAnswer.title}</span>
        </h2>
        <ul className={classes.answers}>
          {questionAnswer.questionAnswerParts.map((answer) => (
            <li key={answer.id}>
              <Icon icon={<FaDotCircle />} />
              <span>{answer.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Question;
