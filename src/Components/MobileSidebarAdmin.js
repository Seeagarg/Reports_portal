import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MobileNavbarContext } from "../MobileNavbarContext";

const MobileSidebarAdmin = () => {
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
        <button
          className="tablinks"
          onClick={() => {
            handleNavigate("/dashboardAdmin");
          }}
          id="defaultOpen"
        >
          {" "}
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span>Main Dashboard</span>
        </button>
        {/* <!-- 1 --> */}
        <button
          className="tablinks"
          onClick={() => {
            handleNavigate("/dailyRevenueAdmin");
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
            handleNavigate("/monthlyRevenueAdmin");
          }}
        >
          {" "}
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span>Monthly Revenue</span>
        </button>
        
      </div>
    </div>
  );
};
export default MobileSidebarAdmin;
