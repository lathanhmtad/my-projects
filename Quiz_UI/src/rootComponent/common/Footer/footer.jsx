import React from "react";
import classes from "./footer.module.css";
import { Link } from "react-router-dom";

const featureNames = [
  { name: "Quizizz siêu", link: "" },
  { name: "Trường học & Quận ", link: "" },
  {
    name: "Tạo một bài quiz",
    link: "",
  },
  { name: "Tạo một bài học", link: "" },
];

const subjects = [
  { name: "Toán", link: "" },
  { name: "Khoa học Xã hội", link: "" },
  {
    name: "Khoa học",
    link: "",
  },
  { name: "Vật lý", link: "" },
  { name: "Hoá học", link: "" },
  { name: "Sinh học", link: "" },
];

const abouts = [
  { name: "Câu chuyện của chúng ta", link: "" },
  { name: "Blog Quizizz", link: "" },
  {
    name: "Bộ phương tiện",
    link: "",
  },
  { name: "Sự nghiệp", link: "" },
];

const supports = [
  { name: "F.A.Q.", link: "" },
  { name: "Trợ giúp & Hỗ trợ", link: "" },
  {
    name: "Chính sách bảo mật",
    link: "",
  },
  { name: "Điều khoản dịch vụ", link: "" },
  { name: "Tài nguyên dành cho giáo viên", link: "" },
];

const Footer = function Footer(props) {
  return (
    <section className={classes.root}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.column}>
            <h2>Features</h2>
            <ul>
              {featureNames.map((feature, index) => (
                <Link key={index} to={feature.link}>
                  {feature.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className={classes.column}>
            <h2>Môn học</h2>
            <ul>
              {subjects.map((subject, index) => (
                <Link key={index} to={subject.link}>
                  {subject.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className={classes.column}>
            <h2>Môn học</h2>
            <ul>
              {abouts.map((about, index) => (
                <Link key={index} to={about.link}>
                  {about.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className={classes.column}>
            <h2>Support</h2>
            <ul>
              {supports.map((support, index) => (
                <Link key={index} to={support.link}>
                  {support.name}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
