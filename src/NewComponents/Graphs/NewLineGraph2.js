import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import classes from "./NewLineGraph.module.css";

const NewLineGraph2 = (props) => {
  return (
    <div className={classes.graph_container}>
      <ResponsiveContainer width="100%" height="100%" className={classes.graph}>
        <AreaChart
          width={props.width}
          height={300}
          data={props.data}
          // barCategoryGap="2%"
          // margin={{
          //   top: 5,
          //   right: 30,
          //   left: 20,
          //   bottom: 5,
          // }}
        >
          <CartesianGrid strokeDasharray="3 3" 
          stroke="#555"
          />
          <XAxis
            dataKey="misDate"
            // stroke="white"
            stroke="#343A40"
            style={{ fontSize: "13px"}}
          />
          <YAxis
            // stroke="white"
            stroke="#343A40"
            allowDataOverflow={true}
            allowDecimals={true}
            scale="auto"
            style={{ fontSize: "13px"}}
            domain={[0, props.biggest]}
          />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Legend iconSize={12} iconType="rect" />
          {props.index == 1 && (
            <Area
              type="natural"
              dataKey="renewalsRevenue"
              stroke="#1E90FF"
              fill="#1E90FF"
              strokeWidth={2}
            />
          )}
          {props.index == 2 && (
            <Area
              type="monotone"
              dataKey="subscriptionRevenue"
              stroke="#32CD32"
              fill="#32CD32"
              strokeWidth={2}
            />
          )}
          {props.index == 3 && (
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="#FF6347"
              fill="#FF6347"
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewLineGraph2;
