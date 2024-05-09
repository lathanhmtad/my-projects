import React, { useEffect, useState } from "react";
import lessonApi from "../../../../api/lessonApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import answerTimeApi from "../../../../api/answerTimeApi";
import questionAnswerApi from "../../../../api/questionAnswerApi";
import statisticApi from "../../../../api/statisticApi";

export const RoomContext = React.createContext();

function PracticeRoomProvider({ children }) {
  const [lesson, setLesson] = useState(null);
  const [started, setStarted] = useState(false);
  const [answerTime, setAnswerTime] = useState();
  const [fetching, setFetching] = useState(false);
  const [startFetching, setStartFetching] = useState(false);
  const [rankStatistic, setRankStatistic] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  const [count, setCount] = useState(-1);
  const [resultTime, setResultTime] = useState(-1);
  const [point, setPoint] = useState();
  const [openRankStatistic, setOpenRankStatistic] = useState(true);
  const { lessonId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (lessonId) {
      setFetching(true);
      lessonApi
        .getById(lessonId)
        .then((lesson) => {
          setLesson(lesson.data);
        })
        .catch((e) => {
          console.error(e);
          toast.error("Có lỗi xảy ra");
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [lessonId]);
  useEffect(() => {
    setCurrentQuestionIdx(0);
    setAnswerList([]);
    setResultTime(-1);
    setStarted(false);
  }, [location.pathname]);
  const handleAddAnswer = (data) => {
    questionAnswerApi
      .add({
        ...data,
        answerTime: {
          id: answerTime.id,
        },
      })
      .then((response) => {
        setAnswerList((old) => {
          return [...old, response.data];
        });
      })
      .catch((e) => console.error(e));
    statisticApi
      .getAfterQuestionRank(answerTime.id, data.questionId)
      .then((response) => setRankStatistic(response.data))
      .catch((e) => console.log(e));
  };

  const handleStartRoom = () => {
    setStartFetching(true);
    const dataObject = {
      lessonId: lesson.id,
      userId: null,
      socketId: null,
      nickName: null,
      room: null,
      questionAnswers: [],
    };
    answerTimeApi
      .add(dataObject)
      .then((response) => {
        setAnswerTime(response.data);
        console.log(response.data);
        setStarted(true);
        navigate(
          `/join/practice/${lesson.id}/playing-game/${response.data.id}`
        );
        setCount(lesson.questions[0].duration);
      })
      .catch((e) => {
        toast.error("Có lỗi xảy ra");
        console.log(e);
        navigate(`/join/practice/${lesson.id}/pre-game`);
      })
      .finally(() => setStartFetching(false));
  };
  const currentQuestion = (() => {
    if (
      lesson &&
      lesson.questions &&
      lesson.questions.length &&
      lesson.questions.length > currentQuestionIdx
    ) {
      if (lesson.questions.length - 1 === currentQuestionIdx) {
        return {
          ...lesson.questions[currentQuestionIdx],
          isLast: true,
        };
      }
      return lesson.questions[currentQuestionIdx];
    }
  })();
  const handleSubmit = () => {};
  const handleNextQuestion = () => {
    setCurrentQuestionIdx((old) => old + 1);
    setResultTime(-1);
    setCount(-1);
  };
  const handleGoToNextQuestion = () => {
    const data = [
      ...answerList,
      {
        questionId: currentQuestion.id,
        numberOfRightAnswer: currentQuestion.numberOfKeys,
        point: 0,
        questionAnswerParts: [],
        duration: currentQuestion.duration,
      },
    ];
    if (currentQuestionIdx !== lesson.questions.length) {
      setAnswerList((answers) => data);
      handleNextQuestion();
    }
    if (currentQuestionIdx === lesson.questions.length - 1) {
      submitAnswerTime();
    }
  };

  const submitAnswerTime = () => {
    setOpenRankStatistic(true);
    navigate(`/join/practice/${lesson.id}/scored-game/${answerTime.id}`);
    toast.info("Bạn đã hoàn thành bài thi");
  };

  const handleGoToPreviousQuestion = () => {
    setCurrentQuestionIdx((old) => old - 1);
    setAnswerList((answers) => answers.slice(0, answers.length - 1));
    questionAnswerApi
      .delete(answerList[answerList.length - 1].id)
      .catch((e) => console.log(e));
    setResultTime(-1);
    setCount(-1);
  };

  const checkLastQuestionResult = () => {
    if (
      answerList.length === 0 ||
      !currentQuestion ||
      !currentQuestion.numberOfKeys
    )
      return false;
    return (
      answerList[answerList.length - 1] &&
      answerList[answerList.length - 1].questionAnswerParts &&
      answerList[answerList.length - 1].questionAnswerParts.filter(
        (questionAnswerPart) => questionAnswerPart.rightAnswer
      ).length === currentQuestion.numberOfKeys
    );
  };
  return (
    <RoomContext.Provider
      value={{
        lesson,
        fetching,
        answerList,
        handleAddAnswer,
        currentQuestion,
        handleSubmit,
        handleNextQuestion,
        setLesson,
        count,
        setCount,
        resultTime,
        setResultTime,
        checkLastQuestionResult,
        currentQuestionIdx,
        answerTime,
        setAnswerTime,
        setFetching,
        setStarted,
        started,
        point,
        setPoint,
        handleGoToNextQuestion,
        handleGoToPreviousQuestion,
        submitAnswerTime,
        handleStartRoom,
        rankStatistic,
        openRankStatistic,
        setOpenRankStatistic,
        setRankStatistic,
        startFetching,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export default PracticeRoomProvider;
