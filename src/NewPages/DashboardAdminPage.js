import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Loader from "../Components/Loader";
import { fetchClientsServicesData } from "../Data/Api";
import NewSidebarAdmin from "../NewComponents/NewSidebarAdmin";
import NewHeader from "../NewComponents/NewHeader";
import TitleHeader from "../NewComponents/TitleHeader";
import { Dropdown } from "primereact/dropdown";
import classes from "./DailyRevenuePage.module.css";
import ThemeComponent from "../NewComponents/ThemeComponent";
import { Calendar } from "primereact/calendar";
import NewHeaderAdmin from "../NewComponents/NewHeaderAdmin";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

const DashboardAdminPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loader, setLoader] = useState("block");
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState("");
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigate=useNavigate();

  const [sidebarHide, setSidebarHide] = useState(() =>
    localStorage.getItem("sidebar")
      ? JSON.parse(localStorage.getItem("sidebar"))
      : false
  );
  const sidebarHandler = () => {
    localStorage.setItem("sidebar", JSON.stringify(!sidebarHide));
    setSidebarHide(JSON.parse(localStorage.getItem("sidebar")));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    getDataFromBackend(client);
  };

  useEffect(() => {
    const clients_variable = JSON.parse(localStorage.getItem("clients"));
    setClients(clients_variable);
    setClient(clients_variable[0].id);
    // getDataFromBackend(clients_variable[0].id);
  }, []);

  useEffect(() => {
    if (client) {
      getDataFromBackend(client);
    }
  }, [client, month, year]);

  const handleClientChange = (clientId) => {
    setClient(clientId);
    // getDataFromBackend(clientId);
  };

  const getDataFromBackend = async (clientId) => {
    try {
      setLoader("block");
      let token = localStorage.getItem("userToken");
      let headers = { Authorization: "Bearer " + token };
      let data = {};
      const res = await axios.post(
        `${fetchClientsServicesData}?month=${month}&year=${year}&clientId=${clientId}`,
        data,
        { headers: headers }
      );
      setData(res?.data?.data);
      setLoader("none");
    } catch (error) {
      setLoader("none");
      toast.error(
        error?.response?.data?.message || error?.data?.message || error?.message
      );
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <>
      <Loader value={loader} />
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
          <NewSidebarAdmin highlight={1} sidebarHide={sidebarHide} />
        </div>
        <div className={classes.container}>
          <NewHeaderAdmin service="All Services" highlight={1} />
          <div className={classes.sub_container}>
            <form className={classes.form}>
              <div className={classes.client}>
                <Dropdown
                  value={client}
                  onChange={(e) => handleClientChange(e.value)}
                  options={clients?.map((client) => ({
                    label: client?.clientName,
                    value: client?.id,
                  }))}
                  placeholder="Select a client"
                  style={{ width: "100%" }}
                />
              </div>

              <div className={classes.start_date}>
                <Calendar
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.value)}
                  view="month"
                  dateFormat="mm/yy"
                  showIcon
                  maxDate={new Date()}
                  style={{ width: "100%" }}
                />
              </div>
            </form>

            <TitleHeader title="All Services Montly Revenue" />
            <div className={classes.table_container}>
              {/* <div className={classes.table_sub_container}> */}
              <ThemeComponent>
                {/* <DataGrid
                    rows={data.map((dataItem, i) => ({
                      id: i,
                      service: dataItem.service,
                      month: `${dataItem.MONTH}-${dataItem.YEAR}`,
                      renewalsRevenue: dataItem?.renewalsRevenue || 0,
                      subscriptionRevenue: dataItem?.subscriptionRevenue || 0,
                      totalRevenue: dataItem?.totalRevenue || 0,
                    }))}
                    columns={[
                      {
                        field: "service",
                        sortable: false,
                        minWidth: 150,
                        headerName: "Service",
                      },
                      {
                        field: "month",
                        sortable: false,
                        minWidth: 150,
                        headerName: "Month",
                      },
                      {
                        field: "renewalsRevenue",
                        sortable: false,
                        minWidth: 150,
                        headerName: "Renewals Revenue",
                      },
                      {
                        field: "subscriptionRevenue",
                        sortable: false,
                        minWidth: 150,
                        headerName: "Subscription Revenue",
                      },
                      {
                        field: "totalRevenue",
                        minWidth: 150,
                        headerName: "Total Revenue",
                      },
                    ]}
                  /> */}

                <DataTable
                  value={data.map((dataItem, i) => ({
                    id: i,
                    service: dataItem.service,
                    month: `${dataItem.MONTH}-${dataItem.YEAR}`,
                    renewalsRevenue: dataItem?.renewalsRevenue || 0,
                    subscriptionRevenue: dataItem?.subscriptionRevenue || 0,
                    totalRevenue: dataItem?.totalRevenue || 0,
                  }))}
                  emptyMessage="No data found"
                  showGridlines
                  responsive
                  scrollable
                  scrollHeight="500px" 
                  rows={15} 
                  paginator
                >
                  <Column field="service" header="Service" />
                  <Column field="month" header="Month" />
                  <Column field="renewalsRevenue" header="Renewals Revenue" />
                  <Column
                    field="subscriptionRevenue"
                    header="Subscription Revenue"
                  />
                  <Column field="totalRevenue" header="Total Revenue" />
                </DataTable>
              </ThemeComponent>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardAdminPage;
