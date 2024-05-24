import React, { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { fetchClientSubServicesApi, sendDataApi } from "../Data/Api";
import PostSecure from "../Request/PostSecure";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import NewHeader from "../NewComponents/NewHeader";
import NewSidebar from "../NewComponents/NewSidebar";
import classes from "./DailyRevenuePage.module.css";
import NewLineGraph from "../NewComponents/Graphs/NewLineGraph";
import ThemeComponent from "../NewComponents/ThemeComponent";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import TitleHeader from "../NewComponents/TitleHeader";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import ExportDailyRevenueToExcel from "../NewComponents/ExportDailyRevenueToExcel";
import axios from "axios";
import NewLineGraph2 from "../NewComponents/Graphs/NewLineGraph2";
import NewComposedGraph from "../NewComponents/Graphs/NewComposedGraph";
import NewBarChart from "../NewComponents/Graphs/NewBarChart";
import { TabView, TabPanel } from "primereact/tabview";

const DailyRevenuePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    gettingServices();
  }, []);

  const [sidebarHide, setSidebarHide] = useState(() =>
    localStorage.getItem("sidebar")
      ? JSON.parse(localStorage.getItem("sidebar"))
      : false
  );
  const sidebarHandler = () => {
    localStorage.setItem("sidebar", JSON.stringify(!sidebarHide));
    setSidebarHide(JSON.parse(localStorage.getItem("sidebar")));
  };

  const [dates, setDates] = useState({
    to: moment(new Date()).format("yyyy-MM-DD"),
    from: moment().subtract(30, "days").format("yyyy-MM-DD"),
  });

  const [startDateForCalendar, setStartDateForCalendar] = useState(
    moment().subtract(30, "days").toDate()
  );
  const [endDateForCalendar, setEndDateForCalendar] = useState(new Date());

  const [service, setService] = useState("");
  const [country, setCountry] = useState("");
  const [subService, setSubService] = useState("");
  const [responseService, setResponseService] = useState("");

  const [services, setServices] = useState([]);
  const [countries, setCountries] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [serviceId, setServiceId] = useState("");

  const [biggest, setBiggest] = useState(0);
  const [biggestRenewal, setBiggestRenewal] = useState(0);
  const [biggestSubscription, setBiggestSubscription] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const dt = useRef(null);

  const gettingServices = () => {
    let services2 = JSON.parse(localStorage.getItem("services"));
    let countries2 = JSON.parse(localStorage.getItem("country"));
    console.log(services2, "s2");
    console.log(countries2, "c2");
    let filteredServices = services2.filter(
      (service) => service?.country == countries2[0]?.country
    );
    setCountry(countries2[0]?.country);
    // setServices(services2);
    setServices(filteredServices);
    setCountries(countries2);
    getDataFromBackend(filteredServices[0]?.serviceName, services2);
  };

  const fetchSubServices = async (serviceid) => {
    try {
      let token = localStorage.getItem("userToken");

      let headers = { Authorization: "Bearer " + token };
      const response = await axios.post(
        `${fetchClientSubServicesApi}?mainServiceId=${serviceid}`,
        null,
        {
          headers: headers,
        }
      );

      setSubServices(response?.data?.data?.dataArray);
      setSubService(() => response?.data?.data?.dataArray[0]?.subServiceName);
      return response?.data?.data?.dataArray[0]?.subServiceName;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
      navigate("/");
    }
  };

  const getDataFromBackend = async (service2, servicesAll) => {
    setService(service2);
    const serviceid = servicesAll.filter(
      (data) => data?.serviceName == service2
    );
    // setServiceId(() =>
    //   services.filter((data) => data?.serviceName == service2)
    // );

    if (serviceid.length > 0) {
      const subServiceValue = await fetchSubServices(serviceid[0]?.id);
      let data = {
        from: dates.from,
        to: dates.to,
        serviceName: service2,
        subServiceName: subServiceValue,
      };

      let promise = PostSecure(sendDataApi, data);
      promise
        .then((e) => {
          handleDataResponse(e);
        })
        .catch((err) => toast.error(err?.data?.message || err?.message || err));
    }
  };

  const getDataFromBackend2 = async (selectedSubService) => {
    setSubService(selectedSubService);
    let data = {
      from: dates.from,
      to: dates.to,
      serviceName: service,
      subServiceName: selectedSubService,
    };

    let promise = PostSecure(sendDataApi, data);
    promise
      .then((e) => {
        handleDataResponse(e);
      })
      .catch((err) => toast.error(err?.data?.message || err?.message || err));
  };

  const [data, setData] = useState([]);

  const handleDataResponse = (e) => {
    if (e.response === "error") {
      toast.error(e.error?.response?.data?.message || e.error?.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setLoader("none");
    } else {
      setLoader("none");
      const dataFromBackend = e.data;
      const dataDateManupulate = dataFromBackend.map((dataItem) => {
        return {
          id: dataItem?.id,
          misDate: dataItem?.misDate.substring(0, 10),
          totalBase: dataItem?.totalBase,
          totalActiveBase: dataItem?.totalActiveBase,
          subscriptions: dataItem?.subscriptions,
          unsubscriptions: dataItem?.unsubscriptions,
          renewals: dataItem?.renewals,
          renewalsRevenue: dataItem?.renewalsRevenue,
          subscriptionRevenue: dataItem?.subscriptionRevenue,
          totalRevenue: dataItem?.totalRevenue,
          dailyIncreaseAccumulated: dataItem?.DailyIncreaseAccumulated,
        };
      });

      const dataLimit = dataDateManupulate.slice(0, 33);
      setData(dataLimit.reverse());

      const biggestValue = Math.max.apply(
        Math,
        dataLimit.map(function (dataItem) {
          return dataItem.totalRevenue;
        })
      );
      setResponseService(e.service);
      setBiggest(biggestValue);
      const biggestValueRenewal = Math.max.apply(
        Math,
        dataLimit.map(function (dataItem) {
          return dataItem.renewalsRevenue;
        })
      );
      setBiggestRenewal(biggestValueRenewal);
      const biggestValueSubscription = Math.max.apply(
        Math,
        dataLimit.map(function (dataItem) {
          return dataItem.subscriptionRevenue;
        })
      );
      setBiggestSubscription(biggestValueSubscription);
    }
  };

  //Method to handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoader("block");
    getDataFromBackend2(subService);
    // getDataFromBackend(service);
  };

  //Hook to store loader div state
  const [loader, setLoader] = useState("block");

  const dataLength = data.length;
  let width = 3000;
  if (dataLength > 25) {
    width = 3000;
  }
  if (dataLength > 17 && dataLength <= 25) {
    width = 2200;
  }
  if (dataLength > 10 && dataLength <= 17) {
    width = 1800;
  }
  if (dataLength >= 5 && dataLength <= 10) {
    width = 1100;
  }
  if (dataLength > 0 && dataLength < 5) {
    width = 500;
  }

  const monthlyTotalSubscriptions = data.reduce(
    (total, dataItem) => total + dataItem.subscriptions,
    0
  );
  const monthlyTotalUnsubscriptions = data.reduce(
    (total, dataItem) => total + dataItem.unsubscriptions,
    0
  );
  const totalRenewalRevenue =
    Math.round(
      data.reduce((total, dataItem) => total + dataItem.renewalsRevenue, 0) *
        100
    ) / 100;
  const totalSubscriptionRevenue = data.reduce(
    (total, dataItem) => total + dataItem.subscriptionRevenue,
    0
  );
  const monthlyTotalRevenue = data.reduce(
    (total, dataItem) => total + dataItem.totalRevenue,
    0
  );
  const totals = {
    id: monthlyTotalRevenue,
    misDate: "Totals",
    subscriptions: monthlyTotalSubscriptions.toFixed(0),
    unsubscriptions: monthlyTotalUnsubscriptions.toFixed(0),
    renewalsRevenue: totalRenewalRevenue.toFixed(0),
    subscriptionRevenue: totalSubscriptionRevenue.toFixed(0),
    totalRevenue: monthlyTotalRevenue.toFixed(0),
  };

  const handleCountryChange = (selectedCountry) => {
    console.log(selectedCountry, "sccc");
    setCountry(selectedCountry);
    let servicesAll = JSON.parse(localStorage.getItem("services"));
    let filteredServices = servicesAll.filter(
      (service) => service?.country == selectedCountry
    );
    setServices(filteredServices);
    getDataFromBackend(filteredServices[0]?.serviceName, servicesAll);
  };

  const handleServiceChange = (selectedService) => {
    getDataFromBackend(selectedService, services);
  };

  const handleSubServiceChange = (selectedSubService) => {
    getDataFromBackend2(selectedSubService);
  };

  const convertStartDate = (utcDate) => {
    setStartDateForCalendar(utcDate);
    setDates({
      ...dates,
      from: moment(new Date(utcDate)).format("yyyy-MM-DD"),
    });
  };

  const convertEndDate = (utcDate) => {
    setEndDateForCalendar(utcDate);
    setDates({ ...dates, to: moment(new Date(utcDate)).format("yyyy-MM-DD") });
  };

  const handleTabChanged = (indexValue) => {
    setTabIndex(indexValue);
  };

  const header = (
    <ExportDailyRevenueToExcel
      data={[...data, totals]}
      handleTabChanged={handleTabChanged}
      tabIndex={tabIndex}
    />
  );

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
          <NewSidebar highlight={1} sidebarHide={sidebarHide} />
        </div>
        <div className={classes.container}>
          <NewHeader service={responseService} highlight={1} />
          <div className={classes.sub_container}>
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <div className={classes.service}>
                <Dropdown
                  key={country}
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  options={countries?.map((country) => ({
                    label: country?.country,
                    value: country?.country,
                  }))}
                  placeholder="Select a Country"
                  style={{ width: "100%" }}
                />
              </div>

              <div className={classes.service}>
                <Dropdown
                  key={service}
                  value={service}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  options={services?.map((service) => ({
                    label: service?.serviceName,
                    value: service?.serviceName,
                  }))}
                  // options={services}
                  // optionLabel="serviceName"
                  // optionValue="serviceName"
                  placeholder="Select a Service"
                  style={{ width: "100%" }}
                />
              </div>

              <div className={classes.service}>
                <Dropdown
                  value={subService}
                  onChange={(e) => handleSubServiceChange(e.target.value)}
                  options={subServices?.map((service) => ({
                    label: service?.subServiceName,
                    value: service?.subServiceName,
                  }))}
                  placeholder="Select a Sub Service"
                  style={{ width: "100%" }}
                />
              </div>

              <div className={classes.start_date}>
                <Calendar
                  value={startDateForCalendar}
                  onChange={(e) => convertStartDate(e.value)}
                  showIcon
                  showButtonBar
                  placeholder="Start Date"
                  style={{ width: "100%" }}
                  maxDate={endDateForCalendar}
                />
              </div>
              <div className={classes.end_date}>
                <Calendar
                  value={endDateForCalendar}
                  onChange={(e) => convertEndDate(e.value)}
                  showIcon
                  // touchUI
                  showButtonBar
                  placeholder="End Date"
                  style={{ width: "100%" }}
                  minDate={startDateForCalendar}
                  maxDate={new Date()}
                />
              </div>
              <button type="submit" className={classes.search_btn}>
                Search
              </button>
            </form>

            <TitleHeader
              title="Daily Revenue"
              icon={<i className="fa-solid fa-chart-simple"></i>}
            />

            <TabView style={{ width: "100%"}} scrollable>
              <TabPanel header="Chart">
                <NewLineGraph data={data} width={width} biggest={biggest} />
              </TabPanel>
              <TabPanel header="Renewal Revenue Chart">
                <NewLineGraph2
                  index={1}
                  data={data}
                  width={width}
                  biggest={biggestRenewal}
                />
              </TabPanel>
              <TabPanel header="Subscription Revenue Chart">
                <NewLineGraph2
                  index={2}
                  data={data}
                  width={width}
                  biggest={biggestSubscription}
                />
              </TabPanel>
              <TabPanel header="Total Revenue Chart">
                <NewLineGraph2
                  index={3}
                  data={data}
                  width={width}
                  biggest={biggest}
                />
              </TabPanel>
            </TabView>

            {/* <NewComposedGraph data={data} width={width} biggest={biggest} /> */}
            {/* <NewBarChart data={data} width={width} biggest={biggest} /> */}

            <div className={classes.table_container}>
              <DataTable
                value={[...data, totals]}
                emptyMessage="No data found"
                showGridlines
                responsive
                scrollable
                scrollHeight="500px"
                rows={16}
                paginator
                header={header}
              >
                <Column field="misDate" header="Date" />
                {(tabIndex == 0 || tabIndex == 1) && (
                  <Column
                    field="totalBase"
                    header="Total Subscription"
                    body={(rowData) =>
                      rowData?.totalBase ? rowData?.totalBase : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 1) && (
                  <Column
                    field="totalActiveBase"
                    header="Active Subscription"
                    body={(rowData) =>
                      rowData?.totalActiveBase ? rowData?.totalActiveBase : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 1) && (
                  <Column
                    field="subscriptions"
                    header="Paid Subscriptions"
                    body={(rowData) =>
                      rowData?.subscriptions ? rowData?.subscriptions : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 2) && (
                  <Column
                    field="unsubscriptions"
                    header="Unsubscriptions"
                    body={(rowData) =>
                      rowData?.unsubscriptions ? rowData?.unsubscriptions : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 3) && (
                  <Column
                    field="renewals"
                    header="Renewals Count"
                    body={(rowData) =>
                      rowData?.renewals ? rowData?.renewals : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 3 || tabIndex == 4) && (
                  <Column
                    field="renewalsRevenue"
                    header="Renewal Revenue"
                    body={(rowData) =>
                      rowData?.renewalsRevenue ? rowData?.renewalsRevenue : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 1 || tabIndex == 4) && (
                  <Column
                    field="subscriptionRevenue"
                    header="Subscription Revenue"
                    body={(rowData) =>
                      rowData?.subscriptionRevenue
                        ? rowData?.subscriptionRevenue
                        : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 4) && (
                  <Column
                    field="totalRevenue"
                    // header="Total Revenue"
                    header="Daily Revenue"
                    body={(rowData) =>
                      rowData?.totalRevenue ? rowData?.totalRevenue : 0
                    }
                  />
                )}
                {(tabIndex == 0 || tabIndex == 4) && (
                  <Column
                    field="dailyIncreaseAccumulated"
                    header="Total Revenue"
                    body={(rowData) =>
                      rowData?.dailyIncreaseAccumulated
                        ? rowData?.dailyIncreaseAccumulated
                        : 0
                    }
                  />
                )}
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DailyRevenuePage;
