import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastNotificationContainer(props) {
  return <ToastContainer autoClose={6000} draggable={true} />;
}

export default ToastNotificationContainer;
