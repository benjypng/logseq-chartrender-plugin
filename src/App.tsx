import React from 'react';
import DrawArea from './graphs/DrawArea';
import DrawBar from './graphs/DrawBar';
import DrawLine from './graphs/DrawLine';
import DrawPercentBar from './graphs/DrawPercentBar';
import DrawPie from './graphs/DrawPie';
import DrawStackedBar from './graphs/DrawStackedBar';

const App = (props) => {
  const {
    chartType,
    chartObj,
    colour,
    chartHeight,
    chartWidth,
    xAxisLabel,
    yAxisLabel,
  } = props;

  return (
    <React.Fragment>
      {chartType === 'line' && (
        <DrawLine
          chartObj={chartObj}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {chartType === 'pie' && <DrawPie chartObj={chartObj} colour={colour} />}

      {chartType === 'area' && (
        <DrawArea
          chartObj={chartObj}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {chartType === 'bar' && (
        <DrawBar
          chartObj={chartObj}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {chartType === 'stackedbar' && (
        <DrawStackedBar
          chartObj={chartObj}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}

      {chartType === 'percentbar' && (
        <DrawPercentBar
          chartObj={chartObj}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      )}
    </React.Fragment>
  );
};

export default App;
