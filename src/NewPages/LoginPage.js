import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, loginMasterApi } from "../Data/Api";
import Post from "../Request/Post";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/Loader";
import axios from "axios";
import classes from "./LoginPage.module.css";
import LoginAnimation from "../Animations/LoginAnimation.json";
import Lottie from "lottie-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [inputType, setInputType] = useState("password");
  const changeInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.username === "admin") {
      try {
        setLoader("block");
        const data = {
          username: credentials.username,
          password: credentials.password,
        };
        const res = await axios.post(loginMasterApi, data);
        localStorage.setItem("clients", JSON.stringify(res.data.data.data));
        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("userName", res.data.username);
        navigate("/dashboardAdmin");
        setLoader("none");
      } catch (error) {
        setLoader("none");
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            error?.data?.data?.message
        );
      }
    } else {
      setLoader("block");
      hitOnBackend();
    }
  };

  const hitOnBackend = () => {
    let promise = Post(loginApi, credentials);
    promise.then((e) => {
      handleCredResponse(e);
    });
  };

  const handleCredResponse = (e) => {
    if (e.response === "error") {
      toast.error(e.error?.response?.data?.message || e.error?.message);
      setLoader("none");
    } else {
      setLoader("none");
      let servicesArray = [];
      e.data.data.map((service) => {
        return servicesArray.push(service.serviceName);
      });
      localStorage.setItem("userToken", e.token);
      localStorage.setItem("userName", e.username);
      // localStorage.setItem("services", JSON.stringify(servicesArray));
      localStorage.setItem("services", JSON.stringify(e.data.data));
      localStorage.setItem("serviceObject", JSON.stringify(e.data.data));
      localStorage.setItem("country", JSON.stringify(e.country));

      navigate("/dailyRevenue");
    }
  };

  const [loader, setLoader] = useState("none");

  return (
    <>
      <Loader value={loader} />
      <ToastContainer />
      <div className={classes.container}>
        <div className={classes.sub_container}>
          <div className={classes.grid_container}>
            <div className={classes.grid_item_1}>
              <div className={classes.animation_container}>
                <Lottie
                  className={classes.animation}
                  animationData={LoginAnimation}
                  autoplay={true}
                  loop={true}
                />
              </div>
            </div>
            <div className={classes.grid_item_2}>
              <div className={classes.heading_container}>
                <h3 className={classes.heading}>Revenue Portal</h3>
              </div>
              <div className={classes.form_container}>
                <form onSubmit={handleSubmit}>
                  <div className={classes.form_sub_container}>
                    <div className={classes.input_form}>
                      <i className="fa fa-user" aria-hidden="true"></i>
                      <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        autoComplete="off"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className={classes.input_form}>
                      <input
                        type={inputType}
                        placeholder="Password"
                        name="password"
                        required
                        style={{ zIndex: "1" }}
                        autoComplete="off"
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                      />
                      <i
                        className={`fa fa-eye ${classes.icon}`}
                        onClick={changeInputType}
                        aria-hidden="true"
                      ></i>
                    </div>
                    <button type="submit" className={classes.login_button}>
                      <i className="fa fa-sign-in" aria-hidden="true"></i>
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section className="login-sec">
        <div className="login-heading">
          <h2>Revenue Portal</h2>
        </div>
        <div className="login-box">
          <div className="login-inner-logo">
            <img src={logo} alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-form">
              <div className="form">
                <div className="succe-massge">
                  <p>Welcome User</p>
                </div>
                <div className="user">
                  <span className="icon-u">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  <span>
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                      autoComplete="off"
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          username: e.target.value,
                        })
                      }
                    />
                  </span>
                </div>
                <div className="password" style={{ position: "relative" }}>
                  <span className="icon-l">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  <span>
                    <input
                      type={inputType}
                      placeholder="Password"
                      name="password"
                      required
                      style={{zIndex:"1"}}
                      autoComplete="off"
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                    />
                  </span>
                  <span className="icon-l-2" onClick={changeInputType}>
                    <i className="fa fa-eye" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="submit-btn">
                  <button type="submit">
                    <span>
                      <i className="fa fa-sign-in" aria-hidden="true"></i>
                    </span>{" "}
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section> */}
    </>
  );
};
export default LoginPage;
