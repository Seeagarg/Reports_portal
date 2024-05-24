import React from "react";
import {Routes,Route} from "react-router-dom"
import LoginPage from "../NewPages/LoginPage";
import DailyRevenuePage from "../NewPages/DailyRevenuePage";
import MonthlyRevenuePage from "../NewPages/MonthlyRevenuePage";
import AddCountryAndOperatorPage from "../NewPages/AddCountryAndOperatorPage";
import PublisherTrafficPage from "../NewPages/PublisherTrafficPage";
import PublisherSubscriptionPage from "../NewPages/PublisherSubscriptionPage";
import DashboardPage from "../NewPages/DashboardPage";
import ServicePage from "../NewPages/ServicePage";
import AdvertiserPage from "../NewPages/AdvertiserPage";
import AdvertiserTrafficPage from "../NewPages/AdvertiserTrafficPage";
import AdvertiserSubscriptionPage from "../NewPages/AdvertiserSubscriptionPage";
import DailyRevenueAdminPage from "../NewPages/DailyRevenueAdminPage";
import DashboardAdminPage from "../NewPages/DashboardAdminPage";
import MonthlyRevenueAdminPage from "../NewPages/MonthlyRevenueAdminPage";

const Routing=()=>{
    return(
        <>
                <Routes>
                    <Route element={<LoginPage />} path="/" exact={true}></Route>
                    <Route element={<DailyRevenuePage />} path="/dailyRevenue" exact={true}></Route>
                    <Route element={<MonthlyRevenuePage />} path="/monthlyRevenue" exact={true}></Route>
                    <Route element={<DashboardPage />} path="/dashboard" exact={true}></Route>
                    <Route element={<ServicePage />} path="/dashboard/:serviceName/:id" exact={true}></Route>
                    <Route element={<AddCountryAndOperatorPage />} path="/add-country-and-add-operator" exact={true}></Route>
                    <Route element={<PublisherTrafficPage />} path="/publisher-traffic" exact={true}></Route>
                    <Route element={<PublisherSubscriptionPage />} path="/publisher-subscription" exact={true}></Route>
                    <Route element={<AdvertiserPage />} path="/advertiser" exact={true} />
                    <Route element={<AdvertiserTrafficPage />} path="/advertiser-traffic" exact={true} />
                    <Route element={<AdvertiserSubscriptionPage />} path="/advertiser-subscription" exact={true} />
                    <Route element={<DailyRevenueAdminPage />} path="/dailyRevenueAdmin" exact={true} />
                    <Route element={<MonthlyRevenueAdminPage />} path="/monthlyRevenueAdmin" exact={true} />
                    <Route element={<DashboardAdminPage />} path="/dashboardAdmin" exact={true} />
                </Routes>
        </>
    );
}
export default Routing;