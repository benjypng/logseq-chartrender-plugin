export type ChartDataProps = {
  name: string;
  valueZero?: string;
  valueOne?: string;
  mostValuesInSeries?: string;
} & { [key: string]: string | number | undefined };

export interface ChartProps extends GraphProps {
  chartType: string;
};

export type GraphProps = {
  chartData: ChartDataProps[];
  colour: string;
  chartHeight?: number;
  chartWidth?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  mostValuesInSeries?: number;
}
