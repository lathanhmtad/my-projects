import React, { useEffect, useState } from "react";
import classes from "./adminLessonList.module.css";
import Icon from "../../commonComponents/Icon";
import Button from "../../commonComponents/Button";
import { AiFillFolderAdd } from "@react-icons/all-files/ai/AiFillFolderAdd";
import Select from "react-select";
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu";
import { FaShare } from "@react-icons/all-files/fa/FaShare";
import { useNavigate } from "react-router";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { AiOutlineImport } from "@react-icons/all-files/ai/AiOutlineImport";
import { BiHistory } from "@react-icons/all-files/bi/BiHistory";
import { FcLike } from "@react-icons/all-files/fc/FcLike";
import { RiDraftLine } from "@react-icons/all-files/ri/RiDraftLine";
import mergeClassNames from "merge-class-names";
import { IoBag } from "@react-icons/all-files/io5/IoBag";
import lessonApi from "../../api/lessonApi";
import Skeleton from "react-loading-skeleton";

const options = [
  { value: "latest", label: "Sắp xếp theo: Gần đây nhất" },
  { value: "oldest", label: "Sắp xếp theo: Cũ nhất" },
];

const menuList = [
  {
    icon: IoBag,
    label: "Tất cả nội dung của tôi",
    quantity: 7,
    active: true,
  },
  {
    icon: BsFillPersonFill,
    label: "Được tạo bởi tôi",
    quantity: 5,
  },
  {
    icon: AiOutlineImport,
    label: "Đã import",
    quantity: 0,
  },
  {
    icon: BiHistory,
    label: "Trước đây đã sử dụng",
    quantity: 2,
  },
  {
    icon: FcLike,
    label: "Được tôi thích",
    quantity: 0,
  },
  {
    icon: RiDraftLine,
    label: "Bản nháp",
    quantity: 0,
  },
];

function AdminLessonList(props) {
  const [lessons, setLessons] = useState(null);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Danh sách bộ câu hỏi";
  }, []);
  useEffect(() => {
    setFetching(true);
    lessonApi
      .getAll()
      .then((response) => {
        setLessons(response.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setFetching(false));
  }, []);

  const handleSelectLesson = (id) => {
    navigate(`/admin/quiz/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftMenu}>
        <div className={classes.library}>
          <h2>Thư viện của tôi</h2>
          <div className={classes.categories}>
            {menuList.map((menuItem, index) => (
              <div
                className={mergeClassNames(
                  classes.category,
                  menuItem.active ? classes.active : ""
                )}
                key={index}
              >
                <Icon>
                  <menuItem.icon />
                </Icon>
                <span>{menuItem.label}</span>
                <span>{menuItem.quantity}</span>
              </div>
            ))}
          </div>
          <h3 className={classes.albumTitle}>Bộ sưu tập</h3>
          <div className={classes.albumContainer}>
            <Button preIcon={<AiFillFolderAdd />} fullWidth={true}>
              Bộ sưu tập mới
            </Button>
          </div>
        </div>
      </div>
      <div className={classes.rightContainer}>
        <div className={classes.header}>
          <div className={classes.buttonGroup}>
            <Button>Tất cả</Button>
            <Button>Quizz</Button>
            <Button>Những bài học</Button>
          </div>
          <div className={classes.sortOption}>
            <Select options={options} />
          </div>
        </div>
        <div className={classes.lessons}>
          {lessons &&
            lessons.map((lesson) => (
              <Lesson
                key={lesson.id}
                lesson={lesson}
                handleSelectLesson={handleSelectLesson}
              />
            ))}
          {fetching &&
            new Array(8)
              .fill(null)
              .map((x, index) => <LessonShimmer key={index} />)}
        </div>
      </div>
    </div>
  );
}

function Lesson(props) {
  const { lesson, handleSelectLesson } = props;
  return (
    <div
      className={classes.lesson}
      key={lesson.id}
      onClick={() => handleSelectLesson(lesson.id)}
    >
      <div className={classes.questionImage}>
        {lesson.image && <img alt={"lesson-images"} src={lesson.image} />}
        {!lesson.image && (
          <div className={classes.emptyImage}>
            <img
              src={
                "https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png"
              }
            />
          </div>
        )}
      </div>
      <div className={classes.lessonContent}>
        <div className={classes.labelList}>
          <span className={classes.type}>{lesson.type}</span>
          {/*{lesson.draf && (*/}
          {/*  <span className={classes.label}>Bản nháp</span>*/}
          {/*)}*/}
        </div>
        <h3>{lesson.title}</h3>
        <div className={classes.infoList}>
          <div>
            <Icon>
              <HiOutlineMenu />
            </Icon>
            <span>{`${lesson.numberOfQuestion} câu hỏi`}</span>
          </div>
          {/*<div>*/}
          {/*  <Icon>*/}
          {/*    <FaGraduationCap />*/}
          {/*  </Icon>*/}
          {/*  <span>{lesson.grade}</span>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <Icon>*/}
          {/*    <GiBookshelf />*/}
          {/*  </Icon>*/}
          {/*  <span>Education</span>*/}
          {/*</div>*/}
        </div>
        <div className={classes.lessonFooter}>
          <div>
            <div>
              <span className={classes.avatar}>
                <img
                  src={
                    "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.18169-1/12027587_1617365158530569_2122292052928066527_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=aWJK9PTWdB0AX-gZZ3W&_nc_ht=scontent-hkg4-2.xx&oh=00_AfBPqAFCt3vLd3FbWD5ndLksvIpoSRD5AqtgDhmaxPGYWw&oe=63D5D000"
                  }
                  alt={""}
                />
              </span>
              <span>Đức đây!</span>
            </div>
            <div>&#x2022;</div>
            <div>2 ngày trước</div>
          </div>
          <div>
            <Button endIcon={<FaShare />}>Chia sẻ</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonShimmer(props) {
  const rootClasses = mergeClassNames(classes.lesson, classes.shimmer);
  return (
    <div className={rootClasses}>
      <div className={classes.questionImage}>
        <Skeleton circle={true} width={"104px"} height={"104px"} />
      </div>
      <div className={classes.lessonContent}>
        <div className={classes.labelList}>
          <Skeleton width={"50px"} height={"20px"} />
          <Skeleton width={"50px"} height={"20px"} />
          <Skeleton width={"50px"} height={"20px"} />
        </div>
        <Skeleton width={"250px"} />
        <div className={classes.infoList}>
          {new Array(3).fill(null).map((x, index) => (
            <div key={index}>
              <Skeleton width={"20px"} height={"20px"} />
              <Skeleton width={"100px"} height={"20px"} />
            </div>
          ))}
        </div>
        <div className={classes.lessonFooter}>
          <div>
            <div>
              <span className={classes.avatar}>
                <Skeleton circle={true} width={"24px"} height={"24px"} />
              </span>
              <Skeleton width={"70px"} height={"20px"} />
            </div>
            <Skeleton width={"20px"} height={"20px"} />
            <Skeleton width={"70px"} height={"20px"} />
          </div>
          <div>
            <Skeleton width={"100px"} height={"40px"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLessonList;
