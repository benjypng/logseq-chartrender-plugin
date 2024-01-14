import { AreaChart, CartesianGrid, XAxis, Label, YAxis, Area } from "recharts";
import { GraphProps } from "~/types";

const DrawArea = ({ chartWidth, chartHeight, chartData, yAxisLabel, xAxisLabel, colour }: GraphProps) => {
  return (
    <AreaChart
      width={chartWidth}
      height={chartHeight}
      data={chartData}
      margin={{ top: 20, right: 5, left: 10, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name">
        <Label value={xAxisLabel} offset={-10} position="insideBottom" />
      </XAxis>
      <YAxis
        label={{
          value: yAxisLabel,
          angle: -90,
          position: "insideBottomLeft",
        }}
      />
      (
      <Area
        type="monotone"
        dataKey="value"
        stroke={colour}
        fill={colour}
        isAnimationActive={false}
      />
      )
    </AreaChart>
  );
};

export default DrawArea;
