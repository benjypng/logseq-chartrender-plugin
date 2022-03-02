import {
  BarChart,
  CartesianGrid,
  XAxis,
  Label,
  YAxis,
  Bar,
  LabelList,
} from 'recharts';

const DrawPercentBar = (props) => {
  const { chartObj, colour, chartHeight, chartWidth, xAxisLabel, yAxisLabel } =
    props;

  return (
    <BarChart
      width={chartWidth}
      height={chartHeight}
      data={chartObj}
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
          position: 'insideBottomLeft',
        }}
        unit={'%'}
      />
      <Bar
        dataKey="valueZero"
        fill={colour}
        stroke={colour}
        key="valueZero"
        stackId="a"
        isAnimationActive={false}
      />
      <Bar
        dataKey="valueOne"
        fill="lightgray"
        stroke="lightgray"
        key="valueOne"
        stackId="a"
        isAnimationActive={false}
      >
        {' '}
        <LabelList dataKey="valueZero" position="insideTop" />
      </Bar>
    </BarChart>
  );
};

export default DrawPercentBar;
