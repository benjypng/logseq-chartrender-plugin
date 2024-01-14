import DrawArea from "./graphs/DrawArea";
import DrawBar from "./graphs/DrawBar";
import DrawLine from "./graphs/DrawLine";
import DrawPercentBar from "./graphs/DrawPercentBar";
import DrawPie from "./graphs/DrawPie";
import DrawStackedBar from "./graphs/DrawStackedBar";
import { ChartProps } from "./types";

const Chart = ({
  chartType,
  chartData,
  colour,
  chartHeight,
  chartWidth,
  xAxisLabel,
  yAxisLabel,
  mostValuesInSeries
}: ChartProps) => {
  xAxisLabel = xAxisLabel!.replace("collapsed:: true", "")
  yAxisLabel = yAxisLabel!.replace("collapsed:: true", "")

  return (
    <>
      {chartType === "line" && (
        <DrawLine
          chartData={chartData}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          mostValuesInSeries={mostValuesInSeries}
        />
      )}

      {chartType === "pie" && <DrawPie chartData={chartData} colour={colour} />}

      {chartType === "area" && (
        <DrawArea
          chartData={chartData}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {chartType === "bar" && (
        <DrawBar
          chartData={chartData}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {chartType === "stackedbar" && (
        <DrawStackedBar
          chartData={chartData}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {chartType === "percentbar" && (
        <DrawPercentBar
          chartData={chartData}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}
    </>
  );
};

export default Chart;
