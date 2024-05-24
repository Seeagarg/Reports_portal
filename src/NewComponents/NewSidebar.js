import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./NewSidebar.module.css";

const NewSidebar = (props) => {
  //Use to send on other route/page
  const navigate = useNavigate();

  //Method to handle navigation of sidebar
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className={classes.sidebar_container}>
      <div className={classes.sidebar_sub_container}>
        {/* <!-- 1 --> */}
        <div
          className={classes.tab}
          style={{
            color: props.highlight === 1 ? "#696CFF" : "#6B7281",
          }}
          onClick={() => {
            handleNavigate("/dailyRevenue");
          }}
        >
          <i className="fa-solid fa-chart-simple"></i>
          <span className={`${props.sidebarHide && classes.short}`}>
            Daily Revenue
          </span>
        </div>
        {/* <!-- 2 --> */}
        <div
          className={classes.tab}
          style={{
            color: props.highlight === 2 ? "#696CFF" : "#6B7281",
          }}
          onClick={() => {
            handleNavigate("/monthlyRevenue");
          }}
        >
          <i className="fa-regular fa-chart-bar"></i>
          <span className={`${props.sidebarHide && classes.short}`}>
            Monthly Revenue
          </span>
        </div>

        {localStorage.getItem("userName") != "etho_1234" && (
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 3 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/dashboard");
            }}
          >
            <i className="fa-solid fa-wifi" aria-hidden="true"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Add Networks
            </span>
          </div>
        )}

        {localStorage.getItem("userName") != "etho_1234" && (
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 4 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/add-country-and-add-operator");
            }}
          >
            <i className="fa-solid fa-globe" aria-hidden="true"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Add Country and Add Operator
            </span>
          </div>
        )}

        {localStorage.getItem("userName") != "etho_1234" && (
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 5 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/publisher-traffic");
            }}
          >
            {" "}
            <i className="fa-solid fa-bolt" aria-hidden="true"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Publisher Traffic
            </span>
          </div>
        )}

        {localStorage.getItem("userName") != "etho_1234" && (
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 6 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/publisher-subscription");
            }}
          >
            {" "}
            <i className="fa-solid fa-snowflake" aria-hidden="true"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Publisher Subscription
            </span>
          </div>
        )}

        {localStorage.getItem("userName") == "panz" && (
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 7 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/advertiser");
            }}
          >
            {" "}
            {/* <i className="fa fa-user" aria-hidden="true"></i> */}
            <i className="fa-solid fa-rectangle-ad"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Advertiser
            </span>
          </div>
        )}

        {localStorage.getItem("userName") == "panz" && (
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 8 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/advertiser-traffic");
            }}
          >
            {" "}
            <i className="fa-solid fa-traffic-light"></i>
            {/* <i className="fa-solid fa-rectangle-ad"></i>
            <i className="fa-solid fa-bolt" aria-hidden="true"></i> */}
            <span className={`${props.sidebarHide && classes.short}`}>
              Advertiser Traffic
            </span>
          </div>
        )}

        {localStorage.getItem("userName") == "panz" && (
          <div
            className={classes.tab}
            style={{
              color: props.highlight === 9 ? "#696CFF" : "#6B7281",
            }}
            onClick={() => {
              handleNavigate("/advertiser-subscription");
            }}
          >
            {" "}
            {/* <i className="fa-solid fa-rectangle-ad"></i>
            <i className="fa-solid fa-snowflake" aria-hidden="true"></i> */}
            <i className="fa-solid fa-asterisk"></i>
            <span className={`${props.sidebarHide && classes.short}`}>
              Advertiser Subscription
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default NewSidebar;
