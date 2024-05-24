import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewSidebarAdmin.module.css";

const NewSidebarAdmin = (props) => {
  //Use to send on other route/page
  const navigate = useNavigate();

  //Method to handle navigation of sidebar
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className={classes.sidebar_container}>
      <div className={classes.sidebar_sub_container}>
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

        {/* <div
          className={classes.tab}
         
          onClick={() => {
            handleNavigate("/projectsDetails");
          }}
        >
          {" "}
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span>Projects Details</span>
        </div> */}
      </div>
    </div>
  );
};
export default NewSidebarAdmin;
