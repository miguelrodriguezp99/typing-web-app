/* eslint-disable no-undef */
import { LineChart, Line, XAxis, YAxis } from "recharts";

const ChartComp = () => {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 500, pv: 2800, amt: 2800 },
    { name: "Page C", uv: 300, pv: 1398, amt: 1398 },
    { name: "Page D", uv: 200, pv: 9800, amt: 9800 },
    { name: "Page E", uv: 278, pv: 3908, amt: 3908 },
    { name: "Page F", uv: 189, pv: 4800, amt: 4800 },
  ];
  return (
    <>
      <LineChart width={1000} height={200} data={data}>
        <Line type="monotone" dataKey="uv" stroke="black" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  );
};

export default ChartComp;
