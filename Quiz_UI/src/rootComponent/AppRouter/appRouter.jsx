import React from "react";
import classes from "./appRouter.module.css";
import "react-loading-skeleton/dist/skeleton.css";
import AdminHeader from "../adminPage/AdminHeader";
import AdminRouter from "../adminPage/AdminRouter";
import Footer from "../common/Footer";
import ToastNotificationContainer from "../common/ToastNotificationContainer";
import ModalContainer from "../common/ModalContainer";
import { ModalProvider } from "../common/ModalContainer/ModalContext/modalContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LeftNav from "../adminPage/LeftNav";
import JoinHeader from "../studentPage/Joinheader";
import JoinRouter from "../studentPage/JoinRouter/joinRouter";
import NotFoundPage from "../common/NotFoundPage";
import AuthProvider from "../private/AuthProvider";
import AdminLiveRoomRouter from "../adminLiveRoom/AdminLiveRoomRouter";
import PracticeRoomRouter from "../practiceRoom/PracticeRoomRouter";
import AsynchronousRoomRouter from "../asynchronousRoom/AsynchronousRoomRouter";
import ScrollToTo from "../ScrollToTop";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../../oauth2/keycloak";
import NotificationProvider from "../notification/context/NotificationProvider";
import AppNotificationContainer from "../notification/NotificationContainer";

function AppRouter(props) {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
            <ScrollToTo>
              <ModalProvider>
                <section className={classes.root}>
                  <Routes>
                    <Route
                      path={"/"}
                      element={<Navigate to={"/admin/home"} />}
                    />
                    <Route
                      path={"/admin/quiz-room/:roomId/*"}
                      element={<AdminLiveRoomRouter />}
                    />
                    <Route
                      path={"/admin/*"}
                      element={
                        <>
                          <section className={classes.leftNav}>
                            <LeftNav />
                          </section>
                          <section className={classes.mainContent}>
                            <AdminHeader />
                            <AdminRouter />
                            <Footer />
                          </section>
                        </>
                      }
                    />
                    <Route
                      path={"/join/practice/:lessonId/*"}
                      element={<PracticeRoomRouter />}
                    />
                    <Route
                      path={"/join/asynchronous/:roomId/*"}
                      element={<AsynchronousRoomRouter />}
                    />
                    <Route
                      path={"/join/*"}
                      element={
                        <>
                          <section className={classes.joinContent}>
                            <JoinHeader />
                            <JoinRouter />
                            <Footer />
                          </section>
                        </>
                      }
                    />
                    <Route path={"*"} element={<NotFoundPage />} />
                  </Routes>
                  <ToastNotificationContainer />
                  <ModalContainer />
                  <AppNotificationContainer />
                </section>
              </ModalProvider>
            </ScrollToTo>
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default AppRouter;
