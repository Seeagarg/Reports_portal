import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import classes from "./ServicePage.module.css";
import { ModalContext } from "../ModalContext";
import FormModal from "../Components/FormModal";
import axios from "axios";
import {
  deletePublisher,
  enableDisablePublisher,
  showPublisher,
} from "../Data/Api";
import { toast, ToastContainer } from "react-toastify";
import EditFormModal from "../Components/EditFormModal";
import { EditModalContext } from "../EditModalContext";
import Loader from "../Components/Loader";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InputModal from "../Components/InputModal";
import { InputModalContext } from "../InputModalContext";
import DashboardPage from "./DashboardPage";
import TitleHeader from "../NewComponents/TitleHeader";

const ServicePage = () => {
  const [publisherData, setPublisherData] = useState();
  const [loader, setLoader] = useState("block");
  const { serviceName, id } = useParams();
  const { openHandler } = useContext(ModalContext);
  const { openEditHandler } = useContext(EditModalContext);
  const { openInputHandler } = useContext(InputModalContext);
  const [isShowPublisher, setIsShowPublisher] = useState(false);
  console.log(isShowPublisher, "isp");

  const navigate=useNavigate();

  useEffect(() => {
    fetchDataFromBackend();
    setIsShowPublisher(JSON.parse(localStorage.getItem("showAddPublisher")));
  }, [serviceName, id]);

  const fetchDataFromBackend = async () => {
    setLoader("block");
    let token = localStorage.getItem("userToken");
    let headers = { Authorization: "Bearer " + token };
    try {
      //id send krni hai
      const response = await axios.post(
        `${showPublisher}?service=${serviceName}`,
        "",
        { headers: headers }
      );
      console.log(response.data.data, "data 7126879");
      setPublisherData(response.data.data);
      setLoader("none");
    } catch (error) {
      toast.error(error);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  const handleDelete = async ({ id, name }) => {
    if (window.confirm(`Are you sure you want to delete publisher ${name}`)) {
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      try {
        await axios.post(`${deletePublisher}?id=${id}`, "", {
          headers: headers,
        });

        toast.success("Publisher deleted successfully");
        fetchDataFromBackend();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleChange = async (id, status) => {
    const data = { id, status: status == 1 ? 0 : 1 };
    try {
      // setLoader("block");
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      await axios.post(enableDisablePublisher, data, { headers: headers });
      toast.success("Success");
      // setLoader("none");
      fetchDataFromBackend();
    } catch (error) {
      toast.error(
        error || error?.data?.message || error?.message || error?.status
      );
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Store some information in local storage
      localStorage.setItem("pageRefreshed", "true");
    };

    // Listen for the beforeunload event
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Check if the page was refreshed
    const pageRefreshed = localStorage.getItem("pageRefreshed");
    if (pageRefreshed === "true") {
      // Redirect the user to the desired page on page refresh
      window.location.replace("/dashboard");
    }

    // Cleanup local storage
    localStorage.removeItem("pageRefreshed");
  }, []);

  return (
    <>
      <ToastContainer />
      <Loader value={loader} />
      <DashboardPage serviceName={serviceName} id={id}>
        {isShowPublisher ? (
          <>
            <TitleHeader title={serviceName} icon="" />
            
            <button
              onClick={openHandler}
              className={classes.add_btn}
            >
              Add Publisher 
              <AddIcon />
            </button>
            {publisherData?.length <= 0 ? (
              <Button>No Data</Button>
            ) : (
              <div className={classes.table_container}>
                <div className={classes.table_sub_container}>
                  <table className={classes.table}>
                    <tbody>
                      <tr className={classes.tr_th}>
                        <th className={classes.th}>Client</th>
                        <th className={classes.th}>Name</th>
                        <th className={classes.th}>Amount Per Subscription</th>
                        <th className={classes.th}>Service Url</th>
                        <th className={classes.th}>Postback Url</th>
                        <th className={classes.th}>Promotion Url</th>
                        <th className={classes.th}>Operator</th>
                        <th className={classes.th}>Country</th>
                        <th className={classes.th}>Service</th>
                        <th className={classes.th}>Skip</th>
                        <th className={classes.th}>Daily Cap</th>
                        <th className={classes.th}>Edit</th>
                        <th className={classes.th}>Delete</th>
                        <th className={classes.th}>Enable/Disable</th>
                        <th className={classes.th}>Dummy Hit</th>
                      </tr>

                      {publisherData?.map((data) => {
                        return (
                          <tr className={classes.tr} key={data.id}>
                            <td className={classes.td}>{data.client}</td>
                            <td className={classes.td}>{data.name}</td>
                            <td className={classes.td}>{data.amount}</td>
                            <td className={classes.td} style={{ width: "100%" }}>{data.serviceUrl}</td>
                            <td className={classes.td} style={{ width: "100%" }}>
                              {data.postbackUrl}
                            </td>
                            <td className={classes.td} style={{ width: "100%" }}>
                              {data.promotionUrl}
                              <IconButton
                                aria-label="copy"
                                size="small"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    data.promotionUrl
                                  );
                                }}
                              >
                                <ContentCopyIcon sx={{color:"#696CFF"}} fontSize="small" />
                              </IconButton>
                            </td>
                            <td className={classes.td}>{data.operator}</td>
                            <td className={classes.td}>{data.country}</td>
                            <td className={classes.td}>{data.service}</td>
                            <td className={classes.td}>{data.skipValue}</td>
                            <td className={classes.td}>{data?.dailyCap}</td>
                            <td className={classes.td}>
                              <Button
                                variant="contained"
                                onClick={() => openEditHandler(data.id)}
                              >
                                Edit
                              </Button>
                            </td>
                            <td className={classes.td}>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleDelete({
                                    id: data.id,
                                    name: data.name,
                                  })
                                }
                              >
                                Delete
                              </Button>
                            </td>
                            <td className={classes.td}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={data.status === 1}
                                    onChange={() =>
                                      handleChange(data.id, data.status)
                                    }
                                  />
                                }
                                label="Enable"
                              />
                            </td>
                            <td className={classes.td}>
                              <Button
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={() =>
                                  openInputHandler({
                                    postbackUrl: data.postbackUrl,
                                    service: data.service,
                                    partnerName: data.name,
                                  })
                                }
                              >
                                Hit
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <FormModal
              serviceName={serviceName}
              id={id}
              fetchDataFromBackend={fetchDataFromBackend}
            />
            <EditFormModal fetchDataFromBackend={fetchDataFromBackend} />
            <InputModal fetchDataFromBackend={fetchDataFromBackend} />
          </>
        ) : null}
      </DashboardPage>
    </>
  );
};

export default ServicePage;
