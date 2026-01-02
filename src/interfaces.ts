export interface ChartContainerProps {
  chartData: ChartData | undefined
  chartType: ChartTypes
}

export interface RawChartDataTuple {
  0: string
  1: string
  2: string
}

export type ChartTypes = 'pie' | 'bar' | 'line'

export interface ChartData {
  categories: string[]
  data: Record<string, any>[]
}

export interface ChartDataState {
  data: ChartData
  chartType: ChartTypes
}

export interface UseChartDataProps {
  uuid: string
  tagPageName: string
  rawChartProps: string[]
  chartType: ChartTypes
}

export interface TooltipPayloadProps {
  color: string
  name: string
  fill: string
  value: number
  payload: {
    fill?: string
  }
}

export interface TooltipProps {
  active: boolean
  payload: TooltipPayloadProps[]
  label: string
  total?: number
}
