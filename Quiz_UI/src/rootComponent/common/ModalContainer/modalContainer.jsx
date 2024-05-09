import React, { useContext } from "react";
import { ModalContext } from "./ModalContext/modalContext";
import classes from "./modalContainer.module.css";
import mergeClassNames from "merge-class-names";
import Icon from "../../../commonComponents/Icon";
import { GrClose } from "@react-icons/all-files/gr/GrClose";

function ModalContainer(props) {
  const { open, modalContent, closeModal, className } =
    useContext(ModalContext);
  const mergedClass = mergeClassNames(
    classes.root,
    !open && classes.close,
    className
  );
  return (
    <aside className={mergedClass}>
      <button className={classes.bgButton} onClick={() => closeModal()} />
      <div className={classes.container}>
        <Icon
          className={classes.closeButton}
          icon={<GrClose />}
          onClick={() => closeModal()}
        />
        {modalContent}
      </div>
    </aside>
  );
}

export default ModalContainer;
