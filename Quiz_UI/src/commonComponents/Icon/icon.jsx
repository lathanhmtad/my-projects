import React from "react";
import classes from "./icon.module.css";
import mergeClassNames from "merge-class-names";

function Icon(props) {
  const { children, icon, className = "", ...restProps } = props;
  const mergedClass = mergeClassNames(classes.root, className);
  return (
    <span className={mergedClass} {...restProps}>
      {children || icon}
    </span>
  );
}

export default Icon;
