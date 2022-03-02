import { BarChart, CartesianGrid, XAxis, Label, YAxis, Bar } from 'recharts';
import { randomColours } from '../Utils';

const DrawStackedBar = (props) => {
  const { chartObj, colour, chartHeight, chartWidth, xAxisLabel, yAxisLabel } =
    props;

  let barArr = [];
  for (let i = 0; i < chartObj.mostValuesInSeries; i++) {
    barArr.push(
      <Bar
        dataKey={`value${i}`}
        fill={chartObj.mostValuesInSeries === 1 ? colour : randomColours()}
        stroke={colour}
        stackId="a"
        isAnimationActive={false}
      />
    );
  }

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
      />
      {barArr}
    </BarChart>
  );
};

export default DrawStackedBar;
