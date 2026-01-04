import { ChartContainerProps } from '../interfaces'
import { RenderBarChart, RenderLineChart, RenderPieChart } from '.'

export const ChartContainer = ({
  chartData,
  chartType,
}: ChartContainerProps) => {
  if (!chartData) {
    return (
      <>
        <h2
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '26px',
            fontWeight: 700,
            color: '#1A1B1E',
            margin: '0 0 8px 0',
            lineHeight: 1.3,
          }}
        >
          Loading...
        </h2>
        <p
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '16px',
            color: '#1A1B1E',
            margin: 0,
            lineHeight: 1.55,
          }}
        >
          Enter the chart properties below
        </p>
      </>
    )
  }

  const { data: chartValues, categories } = chartData

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
