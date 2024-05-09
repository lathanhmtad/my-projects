import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../common/NotFoundPage";
import ScoredRoom from "../../../components/ScoredRoom/scoredRoom";
import AsynchronousRoomProvider from "./context/asynchronousRoomProvider";
import AsynchronousRoomController from "../../../components/AsynchronousRoomController";
import AsynchronousWaitingRoom from "../../../components/AysnchronousWatingRoom";
import AsynchronousPlayingRoom from "../../../components/AsynchronousPlayingRoom";
import AsynchronousPreRoom from "../../../components/AsynchronousPreRoom";

function AsynchronousRoomRouter(props) {
  return (
    <AsynchronousRoomProvider>
      <AsynchronousRoomController>
        <Routes>
          <Route
            path={"/pre-game/nickname"}
            element={<AsynchronousPreRoom />}
          />
          <Route path={"/pre-game"} element={<AsynchronousWaitingRoom />} />
          <Route
            path={"/playing-game/:answerTimeId"}
            element={<AsynchronousPlayingRoom />}
          />
          <Route path={"/scored-game/:answerTimeId"} element={<ScoredRoom />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </AsynchronousRoomController>
    </AsynchronousRoomProvider>
  );
}

export default AsynchronousRoomRouter;
