import React, { useContext } from "react";
import classes from "./lessonPopup.module.css";
import Icon from "../../../commonComponents/Icon";
import { AiOutlineShareAlt } from "@react-icons/all-files/ai/AiOutlineShareAlt";
import Button from "../../../commonComponents/Button";
import { BsPlayFill } from "@react-icons/all-files/bs/BsPlayFill";
import { GrGroup } from "@react-icons/all-files/gr/GrGroup";
import { useNavigate } from "react-router";
import { ModalContext } from "../../../rootComponent/common/ModalContainer/ModalContext/modalContext";

function LessonPopup(props) {
  const { lesson } = props;
  const navigate = useNavigate();
  const { closeModal } = useContext(ModalContext);
  const handlePractice = () => {
    closeModal();
    navigate(`join/practice/${lesson.id}/pre-game`);
  };
  return (
    <div className={classes.root}>
      <div className={classes.imageHeader}>
        <img
          alt={"lesson-image"}
          src={
            "https://quizizz.com/_media/quizzes/e8a1775f-2e8f-4a75-9bdd-9f1dfb795153_400_400"
          }
        />
        <div className={classes.share}>
          <Icon>
            <AiOutlineShareAlt />
          </Icon>
          <span>Chia sẻ</span>
        </div>
        <div className={classes.topFooter}>
          <span>{`${lesson.numberOfQuestion} câu hỏi`}</span>
          <span>{`${lesson.numberOfPlayed} lần luyện tập`}</span>
        </div>
      </div>
      <div className={classes.content}>
        <h3 className={classes.title}>{lesson.title}</h3>
        <div className={classes.split}>
          <div className={classes.avatar}>
            <span>
              <img
                alt={"avatar"}
                src={
                  "https://lh3.googleusercontent.com/a/AEdFTp5gUMN2qn51kbfte_cwnbCDWW-W-p2FCKa9EEbSPg=s96-c?w=90&h=90"
                }
              />
            </span>
            <span>Nguyễn Hoàng Long</span>
          </div>
          <div>
            <span>Lớp:</span>
            <span className={classes.grade}>9th</span>
          </div>
        </div>
        <div className={classes.evaluate}>
          <span>Cấp độ khó</span>
          <span>: Trung bình</span>
        </div>
        <div className={classes.modelQuestion}>
          <h3>Câu hỏi mẫu</h3>
          <div>
            <span>1.</span>
            <span>2.</span>
            <span>3.</span>
          </div>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={handlePractice} endIcon={<BsPlayFill />}>
          Thực hành
        </Button>
        <Button endIcon={<GrGroup />}>Thực hành</Button>
      </div>
    </div>
  );
}

export default LessonPopup;
