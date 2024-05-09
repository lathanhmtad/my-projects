import React, { useContext } from "react";
import classes from "./asynchronousRoomController.module.css";
import Button from "../../commonComponents/Button";
import { IoClose } from "@react-icons/all-files/io5/IoClose";
import { FaMusic } from "@react-icons/all-files/fa/FaMusic";
import { FaMedal } from "@react-icons/all-files/fa/FaMedal";
import { BsFullscreen } from "@react-icons/all-files/bs/BsFullscreen";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import mergeClassNames from "merge-class-names";
import RoomLoading from "../../commonComponents/RoomLoading";
import { useNavigate } from "react-router";
import { RiArrowGoBackFill } from "@react-icons/all-files/ri/RiArrowGoBackFill";
import { RiArrowGoForwardFill } from "@react-icons/all-files/ri/RiArrowGoForwardFill";
import { AsynchronousRoomContext } from "../../rootComponent/asynchronousRoom/AsynchronousRoomRouter/context/asynchronousRoomProvider";
import RankStatistic from "../../commonComponents/RankStatistic";

function AsynchronousRoomController(props) {
  const { children } = props;
  const { currentQuestion, count, statistic, openStatistic } = useContext(
    AsynchronousRoomContext
  );
  const navigate = useNavigate();
  const rightClass = mergeClassNames(
    classes.correct
    // count === 0 && resultTime > 0 && lastResult ? classes.pickStatus : ""
  );
  const wrongClass = mergeClassNames(
    classes.wrong
    // count === 0 && resultTime > 0 && !lastResult ? classes.pickStatus : ""
  );
  const progressStyle = {
    "--progress-time": `${
      currentQuestion && count > 0
        ? 100 -
          ((currentQuestion.duration - count) / currentQuestion.duration) * 100
        : 0
    }%`,
  };

  const handleClose = () => {
    navigate("/join");
  };

  return (
    <div className={classes.root} style={progressStyle}>
      <div className={classes.header}>
        <div className={classes.timeProgress}>
          <span />
        </div>
        <div className={classes.left}>
          <Button onClick={handleClose}>
            <IoClose />
          </Button>
          <Button>
            <FaMusic />
          </Button>
          <Button>
            <AiFillSetting />
          </Button>
        </div>
        <div className={classes.right}>
          <Button>
            <FaMedal />
          </Button>
          <Button>
            <BsFullscreen />
          </Button>
        </div>
      </div>
      <div className={classes.main}>
        {false ? <RoomLoading /> : children}
        {statistic && (
          <RankStatistic
            rankStatistic={statistic.chartStatistic}
            openStatistic={openStatistic}
          />
        )}
      </div>
      <div className={classes.footer}>
        <div className={classes.left}></div>
        <div className={classes.right}>
          <Button>
            <RiArrowGoBackFill />
          </Button>
          <Button>
            <RiArrowGoForwardFill />
          </Button>
        </div>
        <div className={rightClass}>
          <div className={classes.correctContent}>
            <span>Điểm trả lời</span>
            <span>{`+340`}</span>
          </div>
        </div>
        <div className={wrongClass}>
          <div className={classes.wrongContent}>
            <span>Câu trả lời chưa chính xác</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsynchronousRoomController;
