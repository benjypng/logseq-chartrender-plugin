import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { ANIMATION_DURATION, COLORS } from '../constants'
import { ChartData } from '../interfaces'
import { CustomLegend, PieTooltip } from '.'

export const RenderPieChart = ({ data, categories }: ChartData) => {
  // Pie charts need only 1 category, so have to just take the first one
  const activeCategory = categories[0]
  if (!activeCategory) return

  const total = data.reduce((total, item) => total + item[activeCategory], 0)

  return (
    <ResponsiveContainer height={400}>
      <PieChart height={400} width={400}>
        <Pie
          data={data}
          nameKey="name"
          dataKey={activeCategory}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={'80%'}
          paddingAngle={2}
          pointerEvents={'all'}
          animationDuration={ANIMATION_DURATION}
        >
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              strokeWidth={0}
            />
          ))}
        </Pie>
        <Tooltip
          content={<PieTooltip total={total} />}
          isAnimationActive={false}
        />
        <CustomLegend />
      </PieChart>
    </ResponsiveContainer>
  )
}
