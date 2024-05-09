import React from "react";
import classes from "./loadingButton.module.css";
import LoadingIcon from "../LoadingIcon";
import mergeClassNames from "merge-class-names";

function LoadingButton(props) {
  const {
    className,
    fullWidth,
    children,
    label,
    fetching,
    disabled,
    light,
    ...restProps
  } = props;
  const rootClass = mergeClassNames(
    className,
    classes.root,
    fullWidth ? classes.fullWidth : "",
    light ? classes.light : ""
  );
  return (
    <button
      className={rootClass}
      disabled={disabled || fetching}
      {...restProps}
    >
      {fetching && <LoadingIcon />}
      <span>{children || label}</span>
    </button>
  );
}

export default LoadingButton;
