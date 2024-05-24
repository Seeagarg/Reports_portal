import React, { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  publisherSubscriptionApi,
  publisherSubscriptionServicesApi,
} from "../Data/Api";
import moment, { utc } from "moment";
import { useNavigate } from "react-router-dom";
import classes from "./DailyRevenuePage.module.css";
import NewSidebar from "../NewComponents/NewSidebar";
import NewHeader from "../NewComponents/NewHeader";
import { DataGrid } from "@mui/x-data-grid";
import ThemeComponent from "../NewComponents/ThemeComponent";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import TitleHeader from "../NewComponents/TitleHeader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PublisherSubscriptionPage = ({ hide }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("block");
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("yyyy-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    moment(new Date()).format("yyyy-MM-DD")
  );

  const [startDateForCalendar, setStartDateForCalendar] = useState(new Date());
  const [endDateForCalendar, setEndDateForCalendar] = useState(new Date());

  const [services, setServices] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [service, setService] = useState("");
  const [publisher, setPublisher] = useState("");

  const [sidebarHide, setSidebarHide] = useState(() =>
    localStorage.getItem("sidebar")
      ? JSON.parse(localStorage.getItem("sidebar"))
      : false
  );
  const sidebarHandler = () => {
    localStorage.setItem("sidebar", JSON.stringify(!sidebarHide));
    setSidebarHide(JSON.parse(localStorage.getItem("sidebar")));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName") == "etho_1234") {
      navigate("/dailyRevenue");
    }
  }, []);

  const fetchServices = async () => {
    try {
      setLoading("block");
      const client = localStorage.getItem("userName");
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      const data = { client, startDate, endDate };
      const res = await axios.post(publisherSubscriptionServicesApi, data, {
        headers: headers,
      });
      setServices(res?.data?.services);
      setPublishers(res?.data?.publisher);

      let newService = { servicename: "All" };

      setServices((prevServices) => {
        // Inserting the new service at the first index
        return [newService, ...prevServices];
      });

      setService(newService?.servicename);

      let newPublisher = { partner: "All" };
      setPublishers((prevPublishers) => {
        // Inserting the new service at the first index
        return [newPublisher, ...prevPublishers];
      });
      setPublisher(newPublisher?.partner);

      setLoading("none");
    } catch (error) {
      // console.log(error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          error?.response?.data?.message ||
          error
      );
      setLoading("none");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  async function fetchDataFromBackend(
    showLoading,
    dateStart,
    dateEnd,
    serviceName,
    publisherName
  ) {
    try {
      const client = localStorage.getItem("userName");
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      let data = {};
      if (service == "All" || service == "") {
        data = {
          client,
          startDate: dateStart,
          endDate: dateEnd,
          service: "All",
          publisher: publisherName,
        };
      } else {
        data = {
          client,
          startDate: dateStart,
          endDate: dateEnd,
          service: serviceName,
          publisher: publisherName,
        };
      }
      if (showLoading) {
        setLoading("block");
      }
      // const data = { client, startDate, endDate };
      const res = await axios.post(publisherSubscriptionApi, data, {
        headers: headers,
      });
      setData(res.data.data);
      setLoading("none");
      // console.log(res, "2");
    } catch (error) {
      // console.log(error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          error?.response?.data?.message ||
          error
      );
      setLoading("none");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }

  useEffect(() => {
    fetchServices();
    fetchDataFromBackend(true, startDate, endDate, service, publisher);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDataFromBackend(null, startDate, endDate, service, publisher);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [startDate, endDate, service, publisher]);

  const submitHandler = async (e) => {
    e.preventDefault();
    fetchDataFromBackend(true, startDate, endDate, service, publisher);
  };
  const handleServiceChange = (service) => {
    setService(service);
  };

  const handlePublisherChange = (publisher) => {
    setPublisher(publisher);
  };

  const convertStartDate = (utcDate) => {
    setStartDateForCalendar(utcDate);
    setStartDate(moment(new Date(utcDate)).format("yyyy-MM-DD"));
  };

  const convertEndDate = (utcDate) => {
    setEndDateForCalendar(utcDate);
    setEndDate(moment(new Date(utcDate)).format("yyyy-MM-DD"));
  };

  return (
    <>
      <Loader value={loading} />
      <ToastContainer />
      <div className={`${classes.main} ${sidebarHide && classes.short}`}>
        <div className={`${classes.sidebar} ${sidebarHide && classes.short}`}>
          <div
            className={`${classes.sidebar_header} ${
              sidebarHide && classes.short
            }`}
          >
            <img
              src="/assets/images/logo.png"
              alt="Revenue portal"
              className={classes.sidebar_logo}
            />
            <h3 className={classes.dashboard_text}>Dashboard</h3>
          </div>
          <div className={classes.sidebar_icon}>
            <div className={classes.circle} onClick={sidebarHandler}>
              {sidebarHide ? (
                <i
                  className={`fa-solid fa-arrow-right ${classes.arrow_icon}`}
                ></i>
              ) : (
                <i
                  className={`fa-solid fa-arrow-left ${classes.arrow_icon}`}
                ></i>
              )}
            </div>
          </div>
          <NewSidebar highlight={6} sidebarHide={sidebarHide} />
        </div>
        <div className={classes.container}>
          {hide ? null : (
            <NewHeader service="Publisher Subscription" highlight={6} />
          )}
          <div className={classes.sub_container}>
            <form className={classes.form} onSubmit={submitHandler}>
              <div className={classes.service}>
                <Dropdown
                  value={service}
                  onChange={(e) => handleServiceChange(e.value)}
                  options={services?.map((data) => ({
                    label: data?.servicename,
                    value: data?.servicename,
                  }))}
                  placeholder="Select a Service"
                  style={{ width: "100%" }}
                />
              </div>

              <div className={classes.partner}>
                <Dropdown
                  value={publisher}
                  onChange={(e) => handlePublisherChange(e.value)}
                  options={publishers?.map((data) => ({
                    label: data?.partner,
                    value: data?.partner,
                  }))}
                  placeholder="Select a Partner"
                  style={{ width: "100%" }}
                />
              </div>

              <div className={classes.start_date}>
                <Calendar
                  // value={startDate}
                  value={startDateForCalendar}
                  onChange={(e) => convertStartDate(e.value)}
                  showIcon
                  // touchUI
                  showButtonBar
                  placeholder="Start Date"
                  style={{ width: "100%" }}
                />
              </div>
              <div className={classes.end_date}>
                <Calendar
                  // value={endDate}
                  value={endDateForCalendar}
                  onChange={(e) => convertEndDate(e.value)}
                  showIcon
                  // touchUI
                  showButtonBar
                  placeholder="End Date"
                  style={{ width: "100%" }}
                />
              </div>
              <button type="submit" className={classes.search_btn}>
                Search
              </button>
            </form>

            <TitleHeader
              title="Publisher Subscription"
              icon={
                <i className="fa-solid fa-snowflake" aria-hidden="true"></i>
              }
            />

            {data ? (
              <div className={classes.table_container}>
                <ThemeComponent>
                  {/* <DataGrid
                      rows={data?.map((row, index) => ({
                        ...row,
                        id: index,
                      }))}
                      getRowId={(row) => row.id}
                      columns={[
                        {
                          field: "partner",
                          sortable: false,
                          minWidth: 150,
                          headerName: "Partner",
                        },
                        {
                          field: "servicename",
                          sortable: false,
                          minWidth: 150,
                          headerName: "Service",
                        },
                        {
                          field: "queue",
                          sortable: false,
                          minWidth: 150,
                          headerName: "Queue",
                          renderCell: (params) =>
                            params.value === undefined || params.value === null
                              ? 0
                              : params.value,
                        },
                        {
                          field: "sent",
                          sortable: false,
                          minWidth: 150,
                          headerName: "Sent",
                          renderCell: (params) =>
                            params.value === undefined || params.value === null
                              ? 0
                              : params.value,
                        },
                        {
                          field: "skip",
                          sortable: false,
                          minWidth: 150,
                          headerName: "Skip",
                          renderCell: (params) =>
                            params.value === undefined || params.value === null
                              ? 0
                              : params.value,
                        },
                        {
                          field: "duplicateRec",
                          sortable: false,
                          minWidth: 150,
                          headerName: "Duplicate Record",
                          renderCell: (params) =>
                            params.value === undefined || params.value === null
                              ? 0
                              : params.value,
                        },
                        {
                          field: "total",
                          sortable: false,
                          minWidth: 150,
                          headerName: "Total",
                          renderCell: (params) =>
                            params.value === undefined || params.value === null
                              ? 0
                              : params.value,
                        },
                      ]}
                    /> */}
                  <DataTable
                    value={data}
                    emptyMessage="No data found"
                    showGridlines
                    responsive
                    scrollable
                    scrollHeight="500px"
                    rows={15}
                    paginator
                  >
                    <Column field="partner" header="Partner" />
                    <Column field="servicename" header="Service" />
                    <Column
                      field="queue"
                      header="Queue"
                      body={(rowData) =>
                        rowData.queue === undefined || rowData.queue === null
                          ? 0
                          : rowData.queue
                      }
                    />
                    <Column
                      field="sent"
                      header="Sent"
                      body={(rowData) =>
                        rowData.sent === undefined || rowData.sent === null
                          ? 0
                          : rowData.sent
                      }
                    />
                    <Column
                      field="skip"
                      header="Skip"
                      body={(rowData) =>
                        rowData.skip === undefined || rowData.skip === null
                          ? 0
                          : rowData.skip
                      }
                    />
                    <Column
                      field="duplicateRec"
                      header="Duplicate Record"
                      body={(rowData) =>
                        rowData.duplicateRec === undefined ||
                        rowData.duplicateRec === null
                          ? 0
                          : rowData.duplicateRec
                      }
                    />
                    <Column
                      field="total"
                      header="Total"
                      body={(rowData) =>
                        rowData.total === undefined || rowData.total === null
                          ? 0
                          : rowData.total
                      }
                    />
                  </DataTable>
                </ThemeComponent>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PublisherSubscriptionPage;
