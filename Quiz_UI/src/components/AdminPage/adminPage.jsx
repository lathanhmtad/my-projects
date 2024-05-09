import React, { useContext, useEffect, useState } from "react";
import classes from "./adminPage.module.css";
import Icon from "../../commonComponents/Icon";
import { AiOutlineRight } from "@react-icons/all-files/ai/AiOutlineRight";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderLesson from "../SliderLession";
import categoryApi from "../../api/categoryApi";
import Skeleton from "react-loading-skeleton";
import SliderShimmer from "../SliderLession/SliderShimmer";
import { AuthContext } from "../../rootComponent/private/AuthProvider";
import { toast } from "react-toastify";

function AdminPage(props) {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 3,
  };

  const [categories, setCategories] = useState();
  const [fetching, setFetching] = useState(true);
  const { access } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Trang chủ admin";
  }, []);

  useEffect(() => {
    categoryApi
      .getAll()
      .then((response) => {
        setCategories(response.data);
        setFetching(false);
      })
      .catch((e) => {
        toast.error("Có lỗi xảy ra!");
        console.error(e);
      })
      .finally();
  }, [access]);

  return (
    <section className={classes.root}>
      <div className={classes.topPage}>
        <h2 className={classes.title}>Bạn sẽ dạy gì hôm nay</h2>
        <div className={classes.inputContainer}>
          <input
            type={"text"}
            name={"search"}
            placeholder={"Tìm kiếm quiz về bất kỳ chủ đề nào"}
          />
          <Icon>
            <AiOutlineRight />
          </Icon>
        </div>
        <div className={classes.listSubject}>
          <Slider {...settings}>
            {categories &&
              categories.map((category) => (
                <SubjectItem
                  key={category.id}
                  src={category.image}
                  alt={category.name}
                  label={category.name}
                />
              ))}
            {fetching &&
              new Array(6)
                .fill(null)
                .map((x, index) => <SubjectShimmer key={index} />)}
          </Slider>
        </div>
      </div>
      <div className={classes.mainPage}>
        {categories &&
          categories.map((category) => (
            <SliderLesson
              key={category.id}
              showPopup={false}
              title={category.name}
              lessons={category.lessons}
            />
          ))}
        {fetching &&
          new Array(4)
            .fill(null)
            .map((x, index) => <SliderShimmer key={index} />)}
      </div>
    </section>
  );
}

function SubjectItem(props) {
  const { src, alt, label, ...restProps } = props;
  return (
    <li {...restProps} className={classes.subjectRoot}>
      <div className={classes.subjectContainer}>
        <div className={classes.subjectImageContainer}>
          <img src={src} alt={alt} className={classes.subjectImage} />
        </div>
        <span className={classes.subjectLabel}>{label}</span>
      </div>
    </li>
  );
}

function SubjectShimmer() {
  return (
    <li className={classes.subjectRoot}>
      <div className={classes.subjectContainer}>
        <div className={classes.subjectImageContainer}>
          <Skeleton circle height="64px" width={"64px"} />
        </div>
        <span className={classes.subjectLabel}>
          <Skeleton width={70} />
        </span>
      </div>
    </li>
  );
}

export default AdminPage;
