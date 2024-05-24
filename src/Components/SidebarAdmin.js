import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarAdmin = (props) => {

  //Use to send on other route/page
  const navigate=useNavigate();

  //Method to handle navigation of sidebar
  const handleNavigate=(route)=>{
    navigate(route);
  }

  return (
    <div style={{position:"relative"}}>
      <div className="sidebar" style={{top:props.top}}>
        <div className="sidebar-inner">
          <p style={{color:"black"}}>MAIN</p>
        </div>
        <button
          className="tablinks"
          style={{backgroundColor:props.highlight===3?"#dd4814":"inherit",color:props.highlight===3?"#fff":"#dd4814"}}
          onClick={()=>{
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
          style={{backgroundColor:props.highlight===1?"#dd4814":"inherit",color:props.highlight===1?"#fff":"#dd4814"}}
          onClick={()=>{
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
        <button className="tablinks"
          style={{backgroundColor:props.highlight===2?"#dd4814":"inherit",color:props.highlight===2?"#fff":"#dd4814"}}
        
        onClick={()=>{
          handleNavigate("/monthlyRevenueAdmin");
        }}>
          {" "}
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span>Monthly Revenue</span>
        </button>

        <button className="tablinks"
          style={{backgroundColor:props.highlight===4?"#dd4814":"inherit",color:props.highlight===4?"#fff":"#dd4814"}}
        
        onClick={()=>{
          handleNavigate("/projectsDetails");
        }}>
          {" "}
          <span>
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>{" "}
          <span>Projects Details</span>
        </button>

        

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
export default SidebarAdmin;