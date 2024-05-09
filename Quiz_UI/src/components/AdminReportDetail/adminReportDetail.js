import React from "react";
import classes from "./adminReportDetail.module.css";
import Icon from "../../commonComponents/Icon";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import Button from "../../commonComponents/Button";
import { BsCardChecklist } from "@react-icons/all-files/bs/BsCardChecklist";
import { FiEdit } from "@react-icons/all-files/fi/FiEdit";
import { AiOutlineClockCircle } from "@react-icons/all-files/ai/AiOutlineClockCircle";
import { FiTarget } from "@react-icons/all-files/fi/FiTarget";
import { AiOutlineQuestionCircle } from "@react-icons/all-files/ai/AiOutlineQuestionCircle";
import { GrGroup } from "@react-icons/all-files/gr/GrGroup";
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { AiFillPrinter } from "@react-icons/all-files/ai/AiFillPrinter";
import { BsDownload } from "@react-icons/all-files/bs/BsDownload";
import { AiOutlineShareAlt } from "@react-icons/all-files/ai/AiOutlineShareAlt";
import { AiOutlineThunderbolt } from "@react-icons/all-files/ai/AiOutlineThunderbolt";

function AdminReportDetail(props) {
  return (
    <div className={classes.root}>
      <div className={classes.topBlock}>
        <div className={classes.topHeader}>
          <div>
            <Icon>
              <BsDot />
            </Icon>
            <span>Bài kiểm tra này đã kết thúc</span>
          </div>
          <div>
            <Button>Giao bài tập về nhà</Button>
          </div>
        </div>
        <div className={classes.topBody}>
          <div>
            <div className={classes.liveType}>
              <Icon>
                <BsCardChecklist />
              </Icon>
              <span>Trực tiếp</span>
            </div>
            <div className={classes.title}>
              <h3>10 vạn câu hỏi vì sao</h3>
              <div>
                <Icon>
                  <FiEdit />
                </Icon>
                <span>Chỉnh sửa</span>
              </div>
            </div>
            <div className={classes.time}>
              <Icon>
                <AiOutlineClockCircle />
              </Icon>
              <span>December 20th 2022, 4:03 PM (a day ago)</span>
            </div>
            <div className={classes.buttonGroup}>
              <Button>Xem Quiz</Button>
              <Button>Bảng xếp hạng trực tiếp</Button>
            </div>
          </div>
          <div className={classes.topRight}>
            <div>
              <div>
                <div>
                  <Icon>
                    <FiTarget />
                  </Icon>
                  <span>83%</span>
                </div>
                <span>Chính xác</span>
              </div>
              <div>
                <div>
                  <Icon>
                    <AiOutlineQuestionCircle />
                  </Icon>
                  <span>3</span>
                </div>
                <span>Câu hỏi</span>
              </div>
              <div>
                <div>
                  <Icon>
                    <GrGroup />
                  </Icon>
                  <span>2</span>
                </div>
                <span>Số lần chơi</span>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.topFooter}>
          <div className={classes.tabList}>
            <span>Người chơi</span>
            <span>Câu hỏi</span>
            <span>Tổng Quan</span>
          </div>
          <div className={classes.actionList}>
            <Button>
              <Icon>
                <AiOutlineDelete />
              </Icon>
            </Button>
            <Button>
              <Icon>
                <AiFillPrinter />
              </Icon>
            </Button>
            <Button>
              <Icon>
                <BsDownload />
              </Icon>
            </Button>
            <Button
              preIcon={<AiOutlineShareAlt />}
              endIcon={<AiOutlineThunderbolt />}
            >
              Chia sẻ báo cáo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReportDetail;
