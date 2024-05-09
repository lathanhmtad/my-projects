import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [open, setOpen] = useState(false);
  const [className, setClassName] = useState("");
  const openModal = (content) => {
    setOpen(true);
    setClassName("");
    setModalContent(content);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <ModalContext.Provider
      value={{
        modalContent,
        open,
        openModal,
        closeModal,
        className,
        setClassName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
