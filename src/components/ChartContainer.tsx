import { Text, Title } from '@mantine/core'

import { CHART_PROP_KEY, CHART_TYPE_PROP_KEY, TAG_PROP_KEY } from '../constants'
import { useChartData } from '../hooks/use-chart-data'
import { ChartContainerProps, ChartTypes } from '../interfaces'
import { RenderBarChart, RenderLineChart, RenderPieChart } from '.'

export const ChartContainer = ({ uuid, blockProps }: ChartContainerProps) => {
  const tagPageName = blockProps[TAG_PROP_KEY]
  const rawChartProps = blockProps[CHART_PROP_KEY]
  const chartType: ChartTypes = blockProps[CHART_TYPE_PROP_KEY]

  const { chartData, isLoading } = useChartData({
    uuid,
    tagPageName,
    rawChartProps,
    chartType,
  })
  if (!chartData) return

  const {
    data: { data: chartValues, categories },
  } = chartData

  if (isLoading || chartValues.length === 0) {
    return (
      <>
        <Title>Loading</Title>
        <Text>Please double check your chart tag and properties</Text>
      </>
    )
  } else {
    switch (chartData.chartType) {
      case 'pie':
        // return <RenderPieChart />
        return <RenderPieChart data={chartValues} categories={categories} />

      case 'bar':
        return <RenderBarChart data={chartValues} categories={categories} />

      case 'line':
        return <RenderLineChart data={chartValues} categories={categories} />
    }
  }
}
