import React from 'react';
import DrawLine from './graphs/DrawLine';

const App = (props) => {
  const {
    chartType,
    chartObj,
    colour,
    chartHeight,
    chartWidth,
    xAxisLabel,
    yAxisLabel,
  } = props;

  return (
    <React.Fragment>
      {chartType === 'line' && (
        <DrawLine
          chartObj={chartObj}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {/* {chart === 'pie' && (
        <PieChart width={500} height={450}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={220}
            cy={220}
            outerRadius={150}
            fill={color}
            label
          />
        </PieChart>
      )}

      {chart === 'area' && (
        <AreaChart
          width={width}
          height={height}
          data={data}
          isAnimationActive={false}
          margin={{ top: 20, right: 5, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name">
            <Label
              value={blockData[0].content}
              offset={-10}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{
              value: `${blockData[1].content}`,
              angle: -90,
              position: 'insideBottomLeft',
            }}
          />
          (
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={color}
            isAnimationActive={false}
          />
          )
        </AreaChart>
      )}

      {chart === 'bar' && (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 20, right: 5, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name">
            <Label
              value={blockData[0].content}
              offset={-10}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{
              value: `${blockData[1].content}`,
              angle: -90,
              position: 'insideBottomLeft',
            }}
          />
          <Bar
            dataKey="value"
            fill={color}
            stroke={color}
            key="value"
            isAnimationActive={false}
          />
        </BarChart>
      )}

      {chart === 'stackedbar' && (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 20, right: 5, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name">
            <Label
              value={blockData[0].content}
              offset={-10}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{
              value: `${blockData[1].content}`,
              angle: -90,
              position: 'insideBottomLeft',
            }}
          />
          <Bar
            dataKey="valueZero"
            fill={color}
            stroke={color}
            key="valueZero"
            stackId="a"
            isAnimationActive={false}
          />
          <Bar
            dataKey="valueOne"
            fill="gray"
            stroke="gray"
            key="valueOne"
            stackId="a"
            isAnimationActive={false}
          />
        </BarChart>
      )}

      {chart === 'percentbar' && (
        <BarChart
          width={width}
          height={height}
          data={data}
          margin={{ top: 20, right: 5, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name">
            <Label
              value={blockData[0].content}
              offset={-10}
              position="insideBottom"
            />
          </XAxis>
          <YAxis
            label={{
              value: `${blockData[1].content}`,
              angle: -90,
              position: 'insideBottomLeft',
            }}
            unit={'%'}
          />
          <Bar
            dataKey="valueZero"
            fill={color}
            stroke={color}
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
      )} */}
    </React.Fragment>
  );
};

export default App;
