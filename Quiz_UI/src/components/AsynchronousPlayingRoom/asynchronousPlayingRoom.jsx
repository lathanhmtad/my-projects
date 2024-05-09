import React, { useContext, useEffect, useState } from "react";
import classes from "./asynchronousPlayingRoom.module.css";
import { useParams } from "react-router-dom";
import mergeClassNames from "merge-class-names";
import { AsynchronousRoomContext } from "../../rootComponent/asynchronousRoom/AsynchronousRoomRouter/context/asynchronousRoomProvider";
import { toast } from "react-toastify";
import { PENDING_TIME } from "../../constant/gameConstant";
import fillRoomName from "../../logic/fillRoomName";
import { useNavigate } from "react-router";
import LoadingIcon from "../../commonComponents/LoadingIcon";

function AsynchronousPlayingRoom(props) {
  const { currentQuestion } = useContext(AsynchronousRoomContext);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const {} = useParams();
  useEffect(() => {
    if (!currentQuestion) {
      navigate(`/join/asynchronous/${fillRoomName(roomId)}/pre-game/nickname`);
    }
  });
  useEffect(() => {
    document.title = "Làm bài kiểm tra";
  }, []);
  if (!currentQuestion) {
    return null;
  }
  return <PlayingRoomContent currentQuestion={currentQuestion} />;
}

function PlayingRoomContent(props) {
  const { currentQuestion } = props;
  const [selected, setSelected] = useState();
  const [answered, setAnswered] = useState(false);
  const {
    currentQuestionIdx,
    count,
    setCount,
    resultTime,
    setResultTime,
    setPoint,
    handleAddAnswer,
  } = useContext(AsynchronousRoomContext);

  useEffect(() => {
    if (currentQuestion) {
      setCount(currentQuestion.duration);
    }
    setSelected();
    setAnswered(false);
    setResultTime(-1);
  }, [currentQuestion.id, setCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((old) => {
        if (old === 1) {
          setAnswered(true);
          handleAddAnswer({
            questionId: currentQuestion.id,
            numberOfRightAnswer: currentQuestion.numberOfKeys,
            point: 0,
            questionAnswerParts: [],
            duration: currentQuestion.duration,
          });
          toast.warning("Bạn chưa có câu trả lời cho câu hỏi này");
          setPoint(0);
          setResultTime(PENDING_TIME);
          clearInterval(intervalId);
          return 0;
        }
        if (old === 0) return old;
        return old - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [currentQuestion, answered, handleAddAnswer, setCount, setResultTime]);

  const handleSelectAnswer = (answer) => {
    setSelected(answer);
    setAnswered(true);
    const point = answer.answerKey
      ? ((count * 1.0) / currentQuestion.duration) * currentQuestion.point
      : 0;
    handleAddAnswer({
      questionId: currentQuestion.id,
      numberOfRightAnswer: currentQuestion.numberOfKeys,
      point,
      questionAnswerParts: [
        {
          answerId: answer.id,
          rightAnswer: answer.answerKey,
        },
      ],
      duration: currentQuestion.duration - count,
    });
    answer.answerKey
      ? toast.info("Câu trả lời chính xác")
      : toast.warning("Câu trả lời không chính xác");
    setPoint(point);
    setCount(0);
    setResultTime(PENDING_TIME);
  };

  return (
    <section className={classes.root}>
      <div className={classes.question}>
        <h2>
          {`Câu ${currentQuestionIdx + 1}. `}
          {currentQuestion.title}
        </h2>
        {resultTime > 0 && (
          <div className={classes.loading}>
            <div>Bạn hãy chờ mọi người cùng hoàn thành câu hỏi này.</div>
            <LoadingIcon />
          </div>
        )}
      </div>
      <div className={classes.answers}>
        {currentQuestion.answers.map((answer, index) => (
          <Answer
            key={answer.id}
            answer={`${String.fromCharCode("A".charCodeAt(0) + index)}. ${
              answer.title
            }`}
            onClick={() => handleSelectAnswer(answer)}
            selected={selected && answer.id === selected.id}
            showResult={resultTime > 0}
            isKey={answer.answerKey}
          />
        ))}
      </div>
    </section>
  );
}

function Answer(props) {
  const { answer, selected, showResult, isKey, ...resProps } = props;
  const rootClassname = mergeClassNames(
    classes.answer,
    (() => {
      if (selected && !showResult) return classes.showPreKey;
      if (selected && showResult && isKey) return classes.showOnKeyRight;
      if (selected && showResult && !isKey) return classes.showOnKeyWrong;
      if (!selected && showResult && isKey) return classes.showRealKey;
    })()
  );
  return (
    <div className={rootClassname} {...resProps}>
      <span>{answer}</span>
    </div>
  );
}

export default AsynchronousPlayingRoom;
