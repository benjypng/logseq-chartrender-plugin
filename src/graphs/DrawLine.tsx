import { LineChart, CartesianGrid, XAxis, Label, YAxis, Line } from "recharts";
import { randomColours } from "../Utils";
import { GraphProps } from "~/types";

const DrawLine = ({
  chartData,
  colour,
  chartHeight,
  chartWidth,
  xAxisLabel,
  yAxisLabel,
  mostValuesInSeries,
}: GraphProps) => {
  if (!mostValuesInSeries) return;

  const lineArr = [];
  for (let i = 0; i < mostValuesInSeries; i++) {
    lineArr.push(
      <Line
        type="monotone"
        dataKey={`value${i}`}
        stroke={mostValuesInSeries === 1 ? colour : randomColours()}
        isAnimationActive={false}
        activeDot={{ r: 8 }}
      />,
    );
  }

  return (
    <LineChart
      width={chartWidth}
      height={chartHeight}
      data={chartData}
      margin={{ top: 20, right: 5, left: 10, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name">
        <Label
          value={xAxisLabel}
          offset={-10}
          position="insideBottom"
          fill={"gray"}
        />
      </XAxis>
      <YAxis
        label={{
          value: yAxisLabel,
          angle: -90,
          position: "insideBottomLeft",
          fill: "gray",
        }}
        type="number"
        domain={["dataMin", "dataMax"]}
      />
      {lineArr}
    </LineChart>
  );
};

export default DrawLine;
