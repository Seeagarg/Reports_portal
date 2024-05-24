import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {
  //Use to send on other route/page
  const navigate = useNavigate();

  //Method to handle navigation of sidebar
  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="sidebar" style={{ top: props.top }}>
        <div className="sidebar-inner">
          <p style={{ color: "black" }}>MAIN</p>
        </div>
        {/* <!-- 1 --> */}
        <button
          className="tablinks"
          style={{
            backgroundColor: props.highlight === 1 ? "#dd4814" : "inherit",
            color: props.highlight === 1 ? "#fff" : "#dd4814",
          }}
          onClick={() => {
            handleNavigate("/dailyRevenue");
          }}
          id="defaultOpen"
        >
          {" "}
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span>Daily Revenue</span>
        </button>
        {/* <!-- 2 --> */}
        <button
          className="tablinks"
          style={{
            backgroundColor: props.highlight === 2 ? "#dd4814" : "inherit",
            color: props.highlight === 2 ? "#fff" : "#dd4814",
          }}
          onClick={() => {
            handleNavigate("/monthlyRevenue");
          }}
        >
          {" "}
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span>Monthly Revenue</span>
        </button>

        {localStorage.getItem("userName") != "etho_1234" && (
          <button
            className="tablinks"
            style={{
              backgroundColor: props.highlight === 3 ? "#dd4814" : "inherit",
              color: props.highlight === 3 ? "#fff" : "#dd4814",
            }}
            onClick={() => {
              handleNavigate("/dashboard");
            }}
          >
            {" "}
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>{" "}
            <span>Add Networks</span>
          </button>
        )}

        {localStorage.getItem("userName") != "etho_1234" && (
          <button
            className="tablinks"
            style={{
              backgroundColor: props.highlight === 4 ? "#dd4814" : "inherit",
              color: props.highlight === 4 ? "#fff" : "#dd4814",
            }}
            onClick={() => {
              handleNavigate("/add-country-and-add-operator");
            }}
          >
            {" "}
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>{" "}
            <span>Add Country and Add Operator</span>
          </button>
        )}

        {localStorage.getItem("userName") != "etho_1234" && (
          <button
            className="tablinks"
            style={{
              backgroundColor: props.highlight === 5 ? "#dd4814" : "inherit",
              color: props.highlight === 5 ? "#fff" : "#dd4814",
            }}
            onClick={() => {
              handleNavigate("/publisher-traffic");
            }}
          >
            {" "}
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>{" "}
            <span>Publisher Traffic</span>
          </button>
        )}

        {localStorage.getItem("userName") != "etho_1234" && (
          <button
            className="tablinks"
            style={{
              backgroundColor: props.highlight === 6 ? "#dd4814" : "inherit",
              color: props.highlight === 6 ? "#fff" : "#dd4814",
            }}
            onClick={() => {
              handleNavigate("/publisher-subscription");
            }}
          >
            {" "}
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>{" "}
            <span>Publisher Subscription</span>
          </button>
        )}

        {localStorage.getItem("userName") == "panz" && (
          <button
            className="tablinks"
            style={{
              backgroundColor: props.highlight === 7 ? "#dd4814" : "inherit",
              color: props.highlight === 7 ? "#fff" : "#dd4814",
            }}
            onClick={() => {
              handleNavigate("/advertiser");
            }}
          >
            {" "}
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>{" "}
            <span>Advertiser</span>
          </button>
        )}

        {localStorage.getItem("userName") == "panz" && (
          <button
            className="tablinks"
            style={{
              backgroundColor: props.highlight === 8 ? "#dd4814" : "inherit",
              color: props.highlight === 8 ? "#fff" : "#dd4814",
            }}
            onClick={() => {
              handleNavigate("/advertiser-traffic");
            }}
          >
            {" "}
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>{" "}
            <span>Advertiser Traffic</span>
          </button>
        )}

        {localStorage.getItem("userName") == "panz" && (
          <button
            className="tablinks"
            style={{
              backgroundColor: props.highlight === 9 ? "#dd4814" : "inherit",
              color: props.highlight === 9 ? "#fff" : "#dd4814",
            }}
            onClick={() => {
              handleNavigate("/advertiser-subscription");
            }}
          >
            {" "}
            <span>
              <i className="fa fa-user" aria-hidden="true"></i>
            </span>{" "}
            <span>Advertiser Subscription</span>
          </button>
        )}

        {/* <!-- 3 --> */}
        {/* <button className="tablinks" onClick={()=>{
          handleNavigate("/activation");
        }}>
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span> Activation</span>
        </button> */}
        {/* <!-- 4 --> */}
        {/* <button className="tablinks" onClick={()=>{
          handleNavigate("/unsub");
        }}>
          <span>
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </span>{" "}
          <span>Unsub Manually</span>
        </button> */}
        {/* <!-- 5 --> */}
        {/* <button className="tablinks" onClick={()=>{
          handleNavigate("/bulkUnsub");
        }}>
          <span>
            <i className="fa fa-times-circle-o" aria-hidden="true"></i>
          </span>{" "}
          <span>Bulk Unsub</span>
        </button> */}
        {/* <!-- 6 --> */}
        {/* <button className="tablinks" onClick={()=>{
          handleNavigate("/changePassword");
        }}>
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span> Change Password</span>
        </button> */}
      </div>
    </div>
  );
};
export default Sidebar;
