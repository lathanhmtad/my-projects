import React from "react";
import classes from "./suggestion.module.css";
import mergeClassNames from "merge-class-names";

function Suggestion(props) {
  const { className } = props;
  const mergedClass = mergeClassNames(classes.root, className);
  return (
    <div className={mergedClass}>
      <div className={classes.imageContainer}>
        <img
          src={
            "\thttps://quizizz.com/media/resource/gs/quizizz-media/quizzes/d40d11af-5bd9-4309-8509-aa97b93d6855"
          }
          alt={"suggestion"}
        />
      </div>
      <div className={classes.info}>
        <h3>Art Museum</h3>
        <div className={classes.mainInfo}>
          <span>Played 175 times</span>
          <span>10 questions</span>
        </div>
      </div>
    </div>
  );
}

export default Suggestion;
