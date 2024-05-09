import React from "react";
import classes from "./tag.module.css";
import Icon from "../Icon";
import mergeClassNames from "merge-class-names";

function Tag(props) {
  const {
    children,
    tag,
    preIcon,
    endIcon,
    className = "",
    ...restProps
  } = props;
  const mergedClass = mergeClassNames(classes.root, className);
  return (
    <div className={mergedClass} {...restProps}>
      {!!preIcon && <Icon>{preIcon}</Icon>}
      {children || tag}
      {endIcon && <Icon>{endIcon}</Icon>}
    </div>
  );
}

export default Tag;
