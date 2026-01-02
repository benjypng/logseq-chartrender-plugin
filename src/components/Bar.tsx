import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { ANIMATION_DURATION, COLORS } from '../constants'
import { ChartData } from '../interfaces'
import { CustomLegend, CustomTooltip } from '.'

export const RenderBarChart = ({ data, categories }: ChartData) => {
  return (
    <ResponsiveContainer height={400}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
          dy={10}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#eeeeee' }} />
        <CustomLegend />
        {categories.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={COLORS[index % COLORS.length]}
            radius={[4, 4, 0, 0]}
            animationDuration={ANIMATION_DURATION}
            name={key.charAt(0).toUpperCase() + key.slice(1)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}
