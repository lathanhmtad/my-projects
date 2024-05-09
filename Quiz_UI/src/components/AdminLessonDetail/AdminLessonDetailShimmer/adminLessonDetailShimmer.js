import React from "react";
import classes from "../adminLessonDetail.module.css";
import mergeClassNames from "merge-class-names";
import Skeleton from "react-loading-skeleton";

function AdminLessonDetailShimmer(props) {
  const rootClasses = mergeClassNames(classes.root, classes.shimmer);
  return (
    <div className={classes.root}>
      <div className={classes.topBlock}>
        <div className={classes.topContainer}>
          <div className={classes.image}>
            <Skeleton width={"120px"} height={"120px"} />
          </div>
          <div className={classes.info}>
            <div className={classes.divide}>
              <div>
                <Skeleton width={"30px"} height={"20px"} />
              </div>
              <div className={classes.actionGroup}>
                {new Array(4).fill(null).map((x, index) => (
                  <Skeleton key={index} width={"46px"} height={"42px"} />
                ))}
              </div>
            </div>
            <h3>
              <Skeleton width={"250px"} height={"20px"} />
            </h3>
            <div className={classes.statistic}>
              <div>
                <Skeleton width={"60px"} height={"20px"} />
              </div>
              <div>&#x2022;</div>
              <div>
                <Skeleton width={"70px"} height={"20px"} />
              </div>
            </div>
            <div className={classes.statistic}>
              <div>
                <Skeleton width={"60px"} height={"20px"} />
              </div>
              <div>&#x2022;</div>
              <div>
                <Skeleton width={"60px"} height={"20px"} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.topFooter}>
          <div className={classes.userInfo}>
            <div>
              <Skeleton circle={true} width={"32px"} height={"32px"} />
            </div>
            <div>
              <Skeleton width={"100px"} height={"20px"} />
              <Skeleton width={"70px"} height={"20px"} />
            </div>
          </div>
          <div className={classes.buttonAction}>
            {new Array(5).fill(null).map((x, index) => (
              <Skeleton key={index} width={"80px"} height={"42px"} />
            ))}
          </div>
        </div>
      </div>
      <div className={classes.controlBlock}>
        <div>
          <div>
            <Skeleton height={"20px"} width={"20px"} />
          </div>
          <div>
            <Skeleton width={"120px"} height={"20px"} />
            <Skeleton width={"60px"} height={"20px"} />
          </div>
        </div>
        <div>
          <div>
            <Skeleton height={"20px"} width={"20px"} />
          </div>
          <div>
            <Skeleton width={"120px"} height={"20px"} />
            <Skeleton width={"100px"} height={"20px"} />
          </div>
        </div>
      </div>
      <div className={classes.questionHeaderBlock}>
        <div>
          <Skeleton width={"30px"} height={"30px"} />
          <Skeleton width={"100px"} height={"20px"} />
        </div>
        <div>
          <Skeleton width={"150px"} height={"42px"} />
          <Skeleton width={"200px"} height={"42px"} />
        </div>
      </div>
      <div className={classes.questionList}>
        {new Array(6).fill(null).map((x, index) => (
          <div className={classes.question} key={index}>
            <div className={classes.questionHeader}>
              <div>
                <Skeleton width={"20px"} height={"20px"} />
                <Skeleton width={"120px"} height={"20px"} />
              </div>
              <div>
                <div className={classes.label}>
                  <Skeleton width={"80px"} height={"20px"} />
                </div>
                <div className={classes.label}>
                  <Skeleton width={"80px"} height={"20px"} />
                </div>
              </div>
            </div>
            <h3>
              <Skeleton width={"350px"} height={"30px"} />
            </h3>
            <div className={classes.br}>
              <Skeleton width={"60px"} height={"10px"} />
            </div>
            <div className={classes.answerList}>
              {new Array(4).fill(null).map((x, index) => (
                <div key={index} className={classes.answer}>
                  <Skeleton width={"25px"} height={"25px"} />
                  <Skeleton width={"150px"} height={"20px"} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminLessonDetailShimmer;
