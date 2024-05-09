import React from "react";
import classes from "./adminHeader.module.css";
import Button from "../../../commonComponents/Button";
import { FcSearch } from "@react-icons/all-files/fc/FcSearch";
import { useKeycloak } from "@react-keycloak/web";
import { AiOutlineUserSwitch } from "@react-icons/all-files/ai/AiOutlineUserSwitch";
import NoticeButton from "../../../commonComponents/NoticeButton";

function AdminHeader(props) {
  const { keycloak, initialized } = useKeycloak();
  const handleLogin = () => {
    keycloak.login();
  };
  const handleLogout = () => {
    window.localStorage.removeItem("access");
    keycloak.logout();
  };
  const handleRegister = () => {
    keycloak.register();
  };

  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={classes.searchInput}>
          <div className={classes.leftNav}>
            <span className={classes.searchIcon}>
              <FcSearch />
            </span>
            <input type={"text"} name={"search"} placeholder={"Tìm kiếm"} />
          </div>
          <div className={classes.selectContainer}>
            <select>
              <option>Thư viện</option>
              <option>Báo cáo</option>
            </select>
          </div>
        </div>
        <ul className={classes.rightNav}>
          <li>
            <Button to={"/"}>Nhập mã</Button>
            {!keycloak.authenticated && (
              <>
                <Button onClick={handleLogin}>Đăng nhập</Button>
                <Button onClick={handleRegister}>Đăng ký</Button>
              </>
            )}
            {keycloak.authenticated && (
              <>
                <NoticeButton />
                <Button onClick={handleLogout}>Đăng xuất</Button>
                <Button to={"/join"} preIcon={<AiOutlineUserSwitch />}>
                  Student
                </Button>
              </>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AdminHeader;
