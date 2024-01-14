export type ChartDataProps = {
  name: string;
  valueZero?: string;
  valueOne?: string;
  mostValuesInSeries?: string;
} & { [key: string]: string | number | undefined };

export type ChartProps = {
  chartType: string;
  chartData: ChartDataProps[];
  colour: string;
  chartHeight: number;
  chartWidth: number;
  xAxisLabel: string;
  yAxisLabel: string;
  mostValuesInSeries?: number;
};
