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
    const loadData = (data) => {
      return data[0].children.map((val1, index) => ({
        name: val1.content,
        value: parseInt(data[1].children[index].content),
      }));
    };

    const getChartDetails = (details) => {
      let [chart, color, height] = details.split(' ');
      height = parseInt(height);
      const width = height * 1.78;
      return { chart, color, height, width };
    };

    const [data] = useState(loadData(blockData));
    const [chart] = useState(getChartDetails(chartDetails).chart);
    const [color] = useState(getChartDetails(chartDetails).color);
    const [height] = useState(getChartDetails(chartDetails).height);
    const [width] = useState(getChartDetails(chartDetails).width);

    return (
      <React.Fragment>
        {chart === 'line' && (
          <LineChart
            width={width}
            height={height}
            data={data}
            isAnimationActive={false}
            margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
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
            <XAxis dataKey="name" />
            <YAxis />
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
            margin={{
              top: 10,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
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
            margin={{
              top: 10,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar
              dataKey="value"
              fill={color}
              stroke={color}
              key="value"
              isAnimationActive={false}
            />
          </BarChart>
        )}
      </React.Fragment>
    );
  }
};

export default App;
