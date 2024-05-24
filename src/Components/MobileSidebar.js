import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MobileNavbarContext } from "../MobileNavbarContext";

const MobileSidebar = () => {
  const { showHandler } = useContext(MobileNavbarContext);

  //Use to send on other route/page
  const navigate = useNavigate();

  //Method to handle navigation of sidebar
  const handleNavigate = (route) => {
    navigate(route);
    showHandler();
  };

  return (
    <div className="mobile-sidebar">
      <div className="mobile-sidebar-header">
        <div className="mobile-sidebar-heading">
          <p>MAIN</p>
        </div>
        {/* <!-- 1 --> */}
        <button
          className="tablinks"
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
      </div>
    </div>
  );
};
export default MobileSidebar;
