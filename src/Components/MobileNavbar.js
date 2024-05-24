import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
// import logo from "../Images/avatar.png";
import { ThemeChangeContext } from "../ThemeChangeContext";
import { MobileNavbarContext } from "../MobileNavbarContext";
import MobileSidebar from "./MobileSidebar";
import MobileSidebarAdmin from "./MobileSidebarAdmin";

const MobileNavbar = ({ service }) => {
  
  const { themeHandler, theme } = useContext(ThemeChangeContext);
  const { show,showHandler } = useContext(MobileNavbarContext);
  //to go on other page
  const navigate = useNavigate();

  //Hook to store service name
  const [client, setClient] = useState("Client");

  //to start on load
  useEffect(() => {
    getServiceFromLocalStorage();
  }, []);

  //To Get Service from Local Storage
  const getServiceFromLocalStorage = () => {
    let client = localStorage.getItem("userName");
    if (client !== null || client !== undefined) {
      setClient(client.toUpperCase());
    }
  };

  //Method to handle logout button
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("services");
    showHandler();
    navigate("/");
  };

  return (
    <>
        <div
          className={`${
            show
              ? "mobile-navbar-nav show-mobile-nav"
              : "mobile-navbar-nav"
          }`}
          style={{ padding: "5px", backgroundColor: theme ? "black" : "#fff" ,overflowY:"scroll"}}
        >
          <div
            className="mobile-navbar-links"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div className="top-logo">
              {/* <img src={logo} alt="logo" /> */}
              <button
                className="bg-green"
                style={{
                  borderStyle: "none",
                  color: "white",
                  borderRadius: "8%",
                  height: "36px",
                }}
              >
                {client}
              </button>
            </div>

            <div className="top-logo">
              {/* <img src={logo} alt="logo" /> */}
              <button
                className="bg-green"
                style={{
                  borderStyle: "none",
                  color: "white",
                  borderRadius: "8%",
                  height: "36px",
                }}
              >
                {service}
              </button>
            </div>

            <div className="top-header-logout">
              <div
                className="date-search-btn"
                onClick={() => {
                  handleLogout();
                }}
              >
                <button className="bg-orange">Logout</button>
              </div>
            </div>

            {client==="ADMIN"?<MobileSidebarAdmin />:<MobileSidebar />}

            <div>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={theme}
                      onChange={() => themeHandler()}
                      color="secondary"
                    />
                  }
                  label="Dark mode"
                />
              </FormGroup>
            </div>
          </div>
        </div>
      
    </>
  );
};
export default MobileNavbar;
