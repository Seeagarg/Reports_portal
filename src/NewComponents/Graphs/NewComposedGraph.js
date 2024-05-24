import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
} from "recharts";
import classes from "./NewLineGraph.module.css";

const NewComposedGraph = (props) => {
  return (
    <div className={classes.graph_container}>
      <ResponsiveContainer width="100%" height="100%" className={classes.graph}>
        <ComposedChart
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
          <CartesianGrid stroke="#555" />
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
          <Area
            type="monotone"
            dataKey="totalRevenue"
            stroke="#FF6347"
            fill="#FF6347"
            strokeWidth={2}
          />
          <Bar
            type="monotone"
            dataKey="renewalsRevenue"
            stroke="#1E90FF"
            fill="#1E90FF"
            barSize={20}
          />
          <Line
            type="monotone"
            dataKey="subscriptionRevenue"
            stroke="#32CD32"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewComposedGraph;
