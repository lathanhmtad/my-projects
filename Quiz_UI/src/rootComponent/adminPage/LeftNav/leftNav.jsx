import React from "react";
import classes from "./leftNav.module.css";
import { GrMapLocation } from "@react-icons/all-files/gr/GrMapLocation";
import Icon from "../../../commonComponents/Icon";
import { Link, NavLink } from "react-router-dom";
import { GiBookshelf } from "@react-icons/all-files/gi/GiBookshelf";
import mergeClassNames from "merge-class-names";
import { IoMdAnalytics } from "@react-icons/all-files/io/IoMdAnalytics";

function LeftNav(props) {
  return (
    <div className={classes.root}>
      <Link className={classes.logoSection} to={"/admin/home"}>
        <img alt={"logo"} src={`${process.env.PUBLIC_URL}/static/logo.png`} />
      </Link>
      {/*<div className={classes.actionSection}>*/}
      {/*  <p>Có một tài khoản?</p>*/}
      {/*  <Button className={classes.loginButton}>Đăng nhập</Button>*/}
      {/*  <Button preIcon={<BiAlarmAdd />} className={classes.createButton}>*/}
      {/*    Tạo mới*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <div className={classes.menuSection}>
        <ul>
          <MenuItem
            icon={<GrMapLocation />}
            label={"Khám phá"}
            to={"/admin/home"}
          />
          <MenuItem
            icon={<GiBookshelf />}
            label={"Thư viện của tôi"}
            to={"/admin/private"}
          />
          <MenuItem
            icon={<IoMdAnalytics />}
            label={"Báo cáo"}
            to={"/admin/reports"}
          />
        </ul>
      </div>
    </div>
  );
}

function MenuItem(props) {
  const { icon, label, ...restProps } = props;
  return (
    <NavLink
      className={(navData) =>
        navData.isActive
          ? mergeClassNames(classes.itemRoot, classes.active)
          : classes.itemRoot
      }
      {...restProps}
    >
      <Icon className={classes.iconContainer}>{icon}</Icon>
      <span>{label}</span>
    </NavLink>
  );
}

export default LeftNav;
