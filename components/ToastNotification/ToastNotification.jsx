import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const showError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

const ToastNotification = () => <ToastContainer />;
export default ToastNotification;