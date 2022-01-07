import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  CartesianGrid,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  Label,
  LabelList,
} from 'recharts';

const App = (props) => {
  const { blockData, chartDetails } = props;

  if (blockData.length === 0) {
    return (
      <div
        style={{
          border: '1px solid white',
          padding: '0.5em',
          marginTop: '-2rem',
        }}
      >
        Start by indicating the type of chart you want followed by the colour in
        the child block, e.g. "bar white" or "line pink" or "pie #ffffff" or
        "area rgb(250,100,80)". Refer to the Readme for more instructions!
      </div>
    );
  } else {
    const loadData = (data, details) => {
      let [chart, color, height] = details.split(' ');
      let chartData;

      // Get X and Y values
      if (chart === 'stackedbar') {
        chartData = data[0].children.map((val1, index) => ({
          name: val1.content,
          valueZero: parseFloat(data[1].children[index].content.split(',')[0]),
          valueOne: parseFloat(data[1].children[index].content.split(',')[1]),
        }));
      } else if (chart === 'percentbar') {
        chartData = data[0].children.map((val1, index) => ({
          name: val1.content,
          valueZero: (
            (parseFloat(data[1].children[index].content.split(',')[0]) /
              parseFloat(data[1].children[index].content.split(',')[1])) *
            100
          ).toFixed(2),
          valueOne:
            100 -
            (
              (parseFloat(data[1].children[index].content.split(',')[0]) /
                parseFloat(data[1].children[index].content.split(',')[1])) *
              100
            ).toFixed(2),
        }));
      } else {
        chartData = data[0].children.map((val1, index) => ({
          name: val1.content,
          value: parseFloat(data[1].children[index].content),
        }));
      }

      // Get other chart details
      height = parseFloat(height);
      const width = height * 1.78;

      // Return values
      return { chartData, chart, color, height, width };
    };

    // const getChartDetails = (details) => {
    //   let [chart, color, height] = details.split(' ');
    //   height = parseFloat(height);
    //   const width = height * 1.78;
    //   return { chart, color, height, width };
    // };

    const [data] = useState(loadData(blockData, chartDetails).chartData);
    const [chart] = useState(loadData(blockData, chartDetails).chart);
    const [color] = useState(loadData(blockData, chartDetails).color);
    const [height] = useState(loadData(blockData, chartDetails).height);
    const [width] = useState(loadData(blockData, chartDetails).width);

    return (
      <React.Fragment>
        {chart === 'line' && (
          <LineChart
            width={width}
            height={height}
            data={data}
            isAnimationActive={false}
            margin={{ top: 20, right: 5, left: 10, bottom: 20 }}
          >
            {/* <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend
              width={100}
              wrapperStyle={{
                top: 40,
                right: 20,
                backgroundColor: '#f5f5f5',
                border: '1px solid #d5d5d5',
                borderRadius: 3,
                lineHeight: '40px',
              }}
            /> */}
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
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              isAnimationActive={false}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        )}

        {chart === 'pie' && (
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
        )}
      </React.Fragment>
    );
  }
};

export default App;
