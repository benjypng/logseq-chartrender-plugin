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
  Global,
  Tooltip,
  Legend,
} from 'recharts';

const App = (props) => {
  Global.isSsr = true;
  const { blockData, chartType } = props;
  const [chart] = useState(chartType);

  const data = blockData[0].children.map((val1, index) => ({
    name: val1.content,
    value: parseInt(blockData[1].children[index].content),
  }));

  return (
    <React.Fragment>
      {chart === 'line' && (
        <LineChart
          width={500}
          height={500}
          data={data}
          isAnimationActive={false}
          margin={{ top: 5, right: 40, left: 20, bottom: 5 }}
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
            stroke="#0088FE"
            isAnimationActive={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )}

      {chart === 'pie' && (
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={120}
            fill="#0088FE"
            label
          />
        </PieChart>
      )}

      {chart === 'area' && (
        <AreaChart
          width={500}
          height={400}
          data={data}
          isAnimationActive={false}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          (
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0088FE"
            fill="#0088FE"
            isAnimationActive={false}
          />
          )
        </AreaChart>
      )}

      {chart === 'bar' && (
        <BarChart
          width={400}
          height={400}
          data={data}
          margin={{
            top: 5,
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
            fill="#0088FE"
            stroke="#0088FE"
            key="value"
            isAnimationActive={false}
            barSize={30}
          />
        </BarChart>
      )}
    </React.Fragment>
  );
};

export default App;
