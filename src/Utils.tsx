import { BlockEntity } from "@logseq/libs/dist/LSPlugin.user";
import { ChartDataProps, ChartProps } from "./types";

const returnChartData = (
  chartType: string,
  chartDataZeroChildren: BlockEntity[],
  chartDataOneChildren: BlockEntity[],
): { data: ChartDataProps[]; mostValuesInSeries?: number } => {
  if (chartType === "percentbar") {
    const data = chartDataZeroChildren.map(
      (val1: { content: string }, index: number) => {
        const numerator = chartDataOneChildren[index]!.content.split(",")[0];
        const denominator = chartDataOneChildren[index]!.content.split(",")[1];
        if (!numerator || !denominator) throw new Error();
        return {
          name: val1.content,
          valueZero: (
            (parseFloat(numerator) / parseFloat(denominator)) *
            100
          ).toFixed(2),
          valueOne: (
            100 -
            (parseFloat(numerator) / parseFloat(denominator)) * 100
          ).toFixed(2),
        };
      },
    );
    return { data };
  } else if (
    chartType === "line" ||
    chartType === "bar" ||
    chartType === "stackedbar"
  ) {
    let mostValuesInSeries = 0;
    const data = chartDataZeroChildren.map(
      (val1: { content: string }, index: number) => {
        const values: string[] =
          chartDataOneChildren[index]!.content.split(",");

        if (values.length > mostValuesInSeries) {
          mostValuesInSeries = values.length;
        }
        const returnObj: ChartDataProps = {
          name: val1.content,
        };
        for (let i = 0; i < values.length; i++) {
          returnObj[`value${i}`] = parseFloat(values[i] as string);
        }
        return returnObj;
      },
    );
    return { data, mostValuesInSeries };
  } else {
    const data = chartDataZeroChildren.map(
      (val1: { content: string }, index: number) => ({
        name: val1.content,
        value: parseFloat(chartDataOneChildren[index]!.content),
      }),
    );
    return { data };
  }
};

export const createChart = (
  chartBlocks: BlockEntity[],
  chartOptions: string,
): ChartProps | undefined => {
  const [chartType, colour, height, reverse] = chartOptions.split(" ") as [
    string,
    string,
    string,
    boolean,
  ];
  if (!chartType || !colour || !height) return;

  if (
    chartBlocks.length === 0 ||
    !chartBlocks[0] ||
    !chartBlocks[1] ||
    !chartBlocks[0].children ||
    !chartBlocks[1].children
  )
    throw new Error("Invalid chart options");

  const chartHeight = parseFloat(height);
  const chartWidth = chartHeight * 1.78;

  const xAxisLabel = chartBlocks[0].content;
  const yAxisLabel = chartBlocks[1].content;

  const chartDataZeroChildren = chartBlocks[0].children as BlockEntity[];
  const chartDataOneChildren = chartBlocks[1].children as BlockEntity[];

  let { data, mostValuesInSeries } = returnChartData(
    chartType,
    chartDataZeroChildren,
    chartDataOneChildren,
  );

  let chartData;
  if (reverse) {
    chartData = data.reverse()
  }
  chartData = data

  return {
    colour,
    chartData,
    chartType,
    chartWidth,
    chartHeight,
    yAxisLabel,
    xAxisLabel,
    mostValuesInSeries,
  };
};

export const randomColours = () => {
  const letters = "0123456789ABCDEF";
  let colour = "#";
  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }
  return colour;
};
