import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
// import logo from "../Images/avatar.png";
import { ThemeChangeContext } from "../ThemeChangeContext";
import { MobileNavbarContext } from "../MobileNavbarContext";
import {FaBars, FaRegWindowClose} from "react-icons/fa";

const Header = ({ service }) => {
  const {show,showHandler}=useContext(MobileNavbarContext);
  const { themeHandler, theme } = useContext(ThemeChangeContext);
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
    navigate("/");
  };

  return (
    <>
      <header
        className="main-header"
        style={{ padding: "5px", backgroundColor: theme ? "black" : "#fff" }}
      >
        <button className="toggle-btn" onClick={()=>showHandler()} style=
          {{
            borderStyle: "none",
            color:theme?"#fff":"black",
          }}>
          {show  ? <FaRegWindowClose />  : <FaBars /> }
        </button>
        <div className="top-header">
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
      </header>
    </>
  );
};
export default Header;
