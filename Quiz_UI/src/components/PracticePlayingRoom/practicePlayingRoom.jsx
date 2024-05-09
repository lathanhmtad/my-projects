import React, { useContext, useEffect, useState } from "react";
import classes from "./practicePlayingRoom.module.css";
import { RoomContext } from "../../rootComponent/practiceRoom/PracticeRoomRouter/context/practiceRoomProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PENDING_TIME } from "../../constant/gameConstant";
import mergeClassNames from "merge-class-names";
import LoadingIcon from "../../commonComponents/LoadingIcon";

function PracticePlayingRoom(props) {
  const { lesson, currentQuestion, started } = useContext(RoomContext);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Làm bài luyện tập";
  }, []);
  useEffect(() => {
    if (!lesson || !started) {
      navigate(`/join/practice/${params.lessonId}/pre-game`);
      toast.error("Bạn cần tham gia bài kiểm tra từ đầu!");
    }
  }, [params.lessonId, navigate, lesson]);
  if (!lesson || !currentQuestion) return null;
  return (
    <PlayingRoomContent lesson={lesson} currentQuestion={currentQuestion} />
  );
}

function PlayingRoomContent(props) {
  const { lesson, currentQuestion } = props;
  const [selected, setSelected] = useState();
  const [answered, setAnswered] = useState(false);
  const {
    count,
    setCount,
    resultTime,
    setResultTime,
    handleNextQuestion,
    handleAddAnswer,
    currentQuestionIdx,
    answerList,
    setFetching,
    setPoint,
    answerTime,
    submitAnswerTime,
  } = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentQuestion) {
      setCount(currentQuestion.duration);
    }
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
  useEffect(() => {
    let timeoutId = -1;
    if (resultTime === 1) {
      timeoutId = setTimeout(() => {
        if (!currentQuestion.isLast) {
          handleNextQuestion();
        } else {
          handleNextQuestion();
          submitAnswerTime();
        }
      }, 1000);
    } else if (resultTime > 1) {
      timeoutId = setTimeout(() => {
        setResultTime(resultTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [
    resultTime,
    currentQuestion,
    handleNextQuestion,
    lesson.id,
    navigate,
    setResultTime,
  ]);

  if (!lesson) return null;
  return (
    <section className={classes.root}>
      <div className={classes.question}>
        <h2>
          {`Câu ${currentQuestionIdx + 1}. `}
          {currentQuestion.title}
        </h2>
        {resultTime > 0 && (
          <div className={classes.loading}>
            <div>{`Câu hỏi tiếp theo sẽ xuất hiện sau ${resultTime}s`}</div>
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

export default PracticePlayingRoom;
