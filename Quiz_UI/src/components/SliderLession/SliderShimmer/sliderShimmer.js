import classes from "../sliderLesson.module.css";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";

function SliderShimmer(props) {
  const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div className={classes.lessonRoot}>
      <div className={classes.lessonTitle}>
        <div className={classes.left}>
          <Skeleton width={"20px"} height={"20px"} />
          <Skeleton width={"120px"} height={"20px"} />
        </div>
        <div className={classes.right}>
          <Skeleton width={"120px"} height={"42px"} />
        </div>
      </div>
      <div className={classes.listLesson}>
        <Slider {...settings}>
          {new Array(5).fill(null).map((x, index) => (
            <LessonShimmer key={index} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

function LessonShimmer(props) {
  return (
    <div className={classes.lessonRoot}>
      <div className={classes.lessonContainer}>
        <div className={classes.lessonImageContainer}>
          <Skeleton width={"240px"} height={"160px"} />
        </div>
        <div className={classes.lessonBody}>
          <div className={classes.tagContainer}>
            <Skeleton width={"50px"} height={"20px"} />
          </div>
          <div className={classes.mt8}>
            <Skeleton height={"20px"} />
          </div>
        </div>
        <div className={classes.lessonFooter}>
          <Skeleton width={"50px"} height={"20px"} />
          <Skeleton width={"50px"} height={"20px"} />
          <Skeleton width={"50px"} height={"20px"} />
        </div>
      </div>
    </div>
  );
}

export default SliderShimmer;
