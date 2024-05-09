import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminPage from "../../../components/AdminPage";
import NotFoundPage from "../../common/NotFoundPage";
import AdminLessonList from "../../../components/AdminLessonList";
import AdminReportList from "../../../components/AdminReportList";
import AdminLessonDetail from "../../../components/AdminLessonDetail";
import AdminReportDetail from "../../../components/AdminReportDetail";

function AdminRouter(props) {
  return (
    <Routes>
      <Route path={"/home"} exact={true} element={<AdminPage />} />
      <Route path={"/private"} exact={true} element={<AdminLessonList />} />
      <Route
        path={"/quiz/:lessonId"}
        exact={true}
        element={<AdminLessonDetail />}
      />
      <Route
        path={"/reports/:roomId/players"}
        exact={true}
        element={<AdminReportDetail />}
      />
      <Route path={"/reports"} exact={true} element={<AdminReportList />} />
      <Route path={"*"} element={<NotFoundPage />} />
    </Routes>
  );
}

export default AdminRouter;
