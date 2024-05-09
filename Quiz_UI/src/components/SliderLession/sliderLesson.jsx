import classes from "./sliderLesson.module.css";
import Icon from "../../commonComponents/Icon";
import { AiFillStar } from "@react-icons/all-files/ai/AiFillStar";
import Button from "../../commonComponents/Button";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Tag from "../../commonComponents/Tag";
import { useContext } from "react";
import { ModalContext } from "../../rootComponent/common/ModalContainer/ModalContext/modalContext";

function SliderLesson(props) {
  const { lessons = [], showPopup, title, to, Popup, ...restProps } = props;
  const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  const { openModal, setClassName } = useContext(ModalContext);
  const handleSelectLesson = (lesson) => {
    openModal(<Popup lesson={lesson} />);
    setClassName(classes.modal);
  };
  return (
    <div className={classes.lessonRoot} {...restProps}>
      <div className={classes.lessonTitle}>
        <div className={classes.left}>
          <Icon>
            <AiFillStar />
          </Icon>
          <h2>{title}</h2>
        </div>
        <div className={classes.right}>
          <Button to={to} endIcon={<AiOutlineRight />}>
            Xem thêm
          </Button>
        </div>
      </div>
      <div className={classes.listLesson}>
        <Slider {...settings}>
          {lessons.map((lesson) => (
            <Lesson
              key={lesson.id}
              image={lesson.image}
              alt={lesson.title}
              type={lesson.type}
              // isNew={true}
              title={lesson.title}
              numberOfQuestion={lesson.numberOfQuestion}
              numberOfPlayed={lesson.numberOfPlayed}
              showPopup={showPopup}
              to={`/admin/quiz/${lesson.id}`}
              onClick={showPopup ? () => handleSelectLesson(lesson) : () => {}}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

function LinkLesson({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
}

function DivLesson({ children, ...restProps }) {
  return <div {...restProps}>{children}</div>;
}

function Lesson(props) {
  const {
    image,
    alt,
    showPopup,
    type,
    isNew,
    title,
    numberOfQuestion,
    numberOfPlayed,
    ...restProps
  } = props;
  const RootTag = showPopup ? DivLesson : LinkLesson;
  return (
    <RootTag className={classes.lessonRoot} {...restProps}>
      <div className={classes.lessonContainer}>
        <div className={classes.lessonImageContainer}>
          {image && <img src={image} alt={alt} />}
          {!image && (
            <div className={classes.emptyImage}>
              <img
                src={
                  "https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png"
                }
              />
            </div>
          )}
        </div>
        <div className={classes.lessonBody}>
          <div className={classes.tagContainer}>
            <Tag>QUIZZ</Tag>
          </div>
          <h3>{title}</h3>
        </div>
        <div className={classes.lessonFooter}>
          <span>{`${numberOfQuestion} câu hỏi`}</span>
          <span>•</span>
          <span>
            <span>{numberOfPlayed}</span> lần luyện tập
          </span>
        </div>
      </div>
    </RootTag>
  );
}

export default SliderLesson;
