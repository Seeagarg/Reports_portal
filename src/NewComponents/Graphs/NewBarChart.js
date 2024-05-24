import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import classes from "./NewLineGraph.module.css";

const NewBarChart = (props) => {
  return (
    <div className={classes.graph_container}>
      <ResponsiveContainer width="100%" height="100%" className={classes.graph}>
        <BarChart
          width={props.width}
          height={300}
          data={props.data}
          barCategoryGap="2%"
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis
            dataKey="misDate"
            // stroke="white"
            stroke="#343A40"
            style={{ fontSize: "smaller" }}
          />
          <YAxis
            // stroke="white"
            stroke="#343A40"
            allowDataOverflow={true}
            allowDecimals={true}
            scale="auto"
            domain={[0, props.biggest]}
          />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Legend iconSize={12} iconType="rect" />
          <Bar
            type="monotone"
            dataKey="renewalsRevenue"
            fill="#1E90FF"
            strokeWidth={2}
          />
          <Bar
            type="monotone"
            dataKey="subscriptionRevenue"
            fill="#32CD32"
            strokeWidth={2}
          />
          <Bar
            type="monotone"
            dataKey="totalRevenue"
            fill="#FF6347"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewBarChart;
