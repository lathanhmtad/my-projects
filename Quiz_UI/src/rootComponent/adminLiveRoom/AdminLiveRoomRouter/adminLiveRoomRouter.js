import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../common/NotFoundPage";
import AdminLiveRoomProvider from "./context/adminLiveRoomProvider";
import AdminLiveWaitingRoom from "../../../components/AdminLiveWaitingRoom";
import AdminLivePlayingRoom from "../../../components/AdminLivePlayingRoom";
import AdminLiveScoredRoom from "../../../components/AdminLiveScoredRoom";
import AdminLiveRoomController from "../../../components/AdminLiveRoomController";

function AdminLiveRoomRouter(props) {
  return (
    <AdminLiveRoomProvider>
      <AdminLiveRoomController>
        <Routes>
          <Route path={"/startV4"} element={<AdminLiveWaitingRoom />} />
          <Route path={"/playing-game"} element={<AdminLivePlayingRoom />} />
          <Route path={"/scored-game"} element={<AdminLiveScoredRoom />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </AdminLiveRoomController>
    </AdminLiveRoomProvider>
  );
}

export default AdminLiveRoomRouter;
