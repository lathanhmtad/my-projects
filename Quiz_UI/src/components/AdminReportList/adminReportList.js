import React, { useContext, useEffect, useState } from "react";
import classes from "./adminReportList.module.css";
import Select from "react-select";
import Icon from "../../commonComponents/Icon";
import { BsCardChecklist } from "@react-icons/all-files/bs/BsCardChecklist";
import Button from "../../commonComponents/Button";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { useNavigate } from "react-router";
import Skeleton from "react-loading-skeleton";
import statisticApi from "../../api/statisticApi";
import fillRoomName from "../../logic/fillRoomName";
import { AuthContext } from "../../rootComponent/private/AuthProvider";
import { toast } from "react-toastify";

const typeOptions = [
  { value: "all", label: "Tất cả các báo cáo" },
  { value: "my", label: "Báo cáo của tôi" },
  { value: "share", label: "Báo cáo chia sẻ" },
];

const statusOptions = [
  { value: "plan", label: "Lên kế hoạch" },
  { value: "process", label: "Đang chạy" },
  { value: "complete", label: "Hoàn thành" },
];

const reportList = [
  {
    title: "Những câu đố tiếng Việt hay",
    count: 10,
    accuracy: 83,
  },
  {
    title: "Những câu đố tiếng Việt hay",
    count: 18,
    accuracy: 67,
  },
  {
    title: "Bài tập địa lý lớp 8",
    count: 35,
    accuracy: 59,
  },
  {
    title: "10 vạn câu hỏi vì sao",
    count: 2,
    accuracy: 100,
  },
];

function AdminReportList(props) {
  const navigate = useNavigate();
  const [reports, setReports] = useState();
  const [fetching, setFetching] = useState(true);
  const { access } = useContext(AuthContext);

  useEffect(() => {
    statisticApi
      .getAllRoomStatistic()
      .then((response) => {
        setReports(response.data);
        setFetching(false);
      })
      .catch((e) => {
        toast.info("Có lỗi xảy ra!");
        console.error(e);
      })
      .finally();
  }, [access]);

  useEffect(() => {
    document.title = "Danh sách thống kê";
  }, []);

  console.log(reports);
  const handleChooseReport = (id) => {
    // navigate("/admin/reports/1/players");
    navigate(`/admin/quiz-room/${fillRoomName(id)}/scored-game`);
  };
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div>
          <Select options={typeOptions} defaultValue={typeOptions[0]} />
        </div>
        <div>
          <Select options={statusOptions} placeholder={"Lọc theo trạng thái"} />
        </div>
      </div>
      <div className={classes.reportTable}>
        <div className={classes.reportHead}>
          <div>
            <input type={"checkbox"} />
          </div>
          <div>Loại</div>
          <div>Tên Quizz</div>
          <div>Tổng người chơi</div>
          <div>Chính xác</div>
          <div>Lớp</div>
          <div>Mã</div>
          <div>Hành động</div>
          <div></div>
        </div>
        <div className={classes.reportList}>
          {reports &&
            reports.map((report, index) => (
              <Report
                key={report.id}
                report={report}
                handleChooseReport={() => handleChooseReport(report.id)}
                index={index}
              />
            ))}
          {fetching &&
            new Array(6)
              .fill(null)
              .map((x, index) => <ReportShimmer key={index} />)}
        </div>
      </div>
    </div>
  );
}

function Report(props) {
  const { report, handleChooseReport, index } = props;
  return (
    <div className={classes.report} onClick={handleChooseReport} key={index}>
      <div>
        <input type={"checkbox"} />
      </div>
      <div>
        <div className={classes.liveType}>
          <Icon>
            <BsCardChecklist />
          </Icon>
          <span>Trực tiếp</span>
        </div>
      </div>
      <div className={classes.name}>
        <h3>{report.lessonTitle}</h3>
        <span>Bắt đầu vào 20 tháng 12 - Hoàn thành 2 ngày trước </span>
      </div>
      <div>{report.answerTimes.length}</div>
      <div>
        <span className={classes.label}>{`${(report.accuracy * 100).toFixed(
          2
        )}%`}</span>
      </div>
      <div></div>
      <div></div>
      <div>
        <Button>Giao bài</Button>
      </div>
      <div>
        <Icon>
          <BsThreeDots />
        </Icon>
      </div>
    </div>
  );
}

function ReportShimmer(props) {
  return (
    <div className={classes.report}>
      <div>
        <Skeleton width={"20px"} height={"20px"} />
      </div>
      <div>
        <div className={classes.liveType}>
          <Skeleton width={"20px"} height={"20px"} />
          <Skeleton width={"50px"} height={"20px"} />
        </div>
      </div>
      <div className={classes.name}>
        <h3>
          <Skeleton width={"200px"} height={"20px"} />
        </h3>
        <Skeleton width={"250px"} height={"20px"} />
      </div>
      <div>
        <Skeleton width={"20px"} />
      </div>
      <div>
        <span className={classes.label}>
          <Skeleton width={"40px"} height={"20px"} />
        </span>
      </div>
      <div></div>
      <div></div>
      <div>
        <Skeleton width={"80px"} height={"40px"} />
      </div>
      <div>
        <Skeleton width={"10px"} width={"20px"} height={"20px"} />
      </div>
    </div>
  );
}

export default AdminReportList;
