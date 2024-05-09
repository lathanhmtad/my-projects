import React, { useEffect, useState } from "react";
import classes from "./studentHistory.module.css";
import { useKeycloak } from "@react-keycloak/web";
import statisticApi from "../../api/statisticApi";
import { Link } from "react-router-dom";

function StudentHistory(props) {
  const [answerTimes, setAnswerTimes] = useState([]);
  const [fetching, setFetching] = useState(true);
  const { keycloak } = useKeycloak();
  useEffect(() => {
    document.title = "Xem lịch sử";
  }, []);

  useEffect(() => {
    if (keycloak.tokenParsed) {
      statisticApi
        .getAllAnswerTime(keycloak.tokenParsed.sub)
        .then((response) => {
          setAnswerTimes(response.data);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => setFetching(false));
    }
  }, [keycloak.tokenParsed]);

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        {answerTimes.map((answerTime) => (
          <Link
            className={classes.answerTime}
            key={answerTimes.id}
            to={`/join/practice/${answerTime.lessonId}/scored-game/${answerTime.id}`}
          >
            <div>
              <div className={classes.top}>
                <div className={classes.imageContainer}>
                  <img
                    src={
                      "https://quizizz.com/media/resource/gs/quizizz-media/quizzes/4bcf5a95-a02f-417d-9cff-49d2c4d10f25?w=200&h=200"
                    }
                  />
                </div>
                <span
                  className={classes.label}
                >{`${answerTime.questionAnswers.length} Qs`}</span>
              </div>
              <div className={classes.title}>
                <h2>{answerTime.lessonTitle}</h2>
              </div>
            </div>
            <div className={classes.accuracy}>{`Độ chính xác ${(
              answerTime.accuracy * 100
            ).toFixed(0)}%`}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default StudentHistory;
