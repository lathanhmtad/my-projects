import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../../common/NotFoundPage";
import PracticeRoomController from "../../../components/PracticeRoomController";
import PracticeWaitingRoom from "../../../components/PracticeWatingRoom";
import PracticePlayingRoom from "../../../components/PracticePlayingRoom";
import ScoredRoom from "../../../components/ScoredRoom/scoredRoom";
import PracticeRoomProvider from "./context/practiceRoomProvider";

function PracticeRoomRouter(props) {
  return (
    <PracticeRoomProvider>
      <PracticeRoomController>
        <Routes>
          <Route path={"/pre-game"} element={<PracticeWaitingRoom />} />
          <Route
            path={"/playing-game/:answerTimeId"}
            element={<PracticePlayingRoom />}
          />
          <Route path={"/scored-game/:answerTimeId"} element={<ScoredRoom />} />
          <Route path={"*"} element={<NotFoundPage />} />
        </Routes>
      </PracticeRoomController>
    </PracticeRoomProvider>
  );
}

export default PracticeRoomRouter;
