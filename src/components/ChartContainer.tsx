import { MantineProvider, Text, Title } from '@mantine/core'

import { ChartContainerProps } from '../interfaces'
import { RenderBarChart, RenderLineChart, RenderPieChart } from '.'

export const ChartContainer = ({
  chartData,
  chartType,
}: ChartContainerProps) => {
  if (!chartData) {
    return (
      <>
        <Title>Loading...</Title>
        <Text>Enter the chart properties below</Text>
      </>
    )
  }

  const { data: chartValues, categories } = chartData

  const getChartContent = () => {
    switch (chartType) {
      case 'pie':
        return <RenderPieChart data={chartValues} categories={categories} />
      case 'bar':
        return <RenderBarChart data={chartValues} categories={categories} />
      case 'line':
        return <RenderLineChart data={chartValues} categories={categories} />
      default:
        return null
    }
  }

  return <MantineProvider>{getChartContent()}</MantineProvider>
}
