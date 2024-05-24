import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewMobileMenu.module.css";

const NewMobileMenuAdmin = (props) => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`${classes.mobile_menu_overlay} ${
        props.mobileMenu && classes.show
      }`}
      onClick={() => props.hideMobileMenuHandler()}
    >
      <div
        className={`${classes.mobile_menu_container} ${
          props.mobileMenu && classes.show
        }`}
      >
        <div className={classes.mobile_menu_sub_container}>
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 1 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/dashboardAdmin");
            }}
            id="defaultOpen"
          >
            {" "}
            <i className="fa-solid fa-gauge"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Main Dashboard
            </span>
          </div>
          {/* <!-- 1 --> */}
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 2 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/dailyRevenueAdmin");
            }}
            id="defaultOpen"
          >
            {" "}
            <i className="fa-solid fa-chart-simple"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Daily Revenue
            </span>
          </div>
          {/* <!-- 2 --> */}
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 3 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/monthlyRevenueAdmin");
            }}
          >
            {" "}
            <i className="fa-regular fa-chart-bar"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Monthly Revenue
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewMobileMenuAdmin;
