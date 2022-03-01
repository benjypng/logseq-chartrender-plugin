import Instructions from './Instructions';

export const createChart = (chartData: any[], chartOptions: string) => {
  if (chartData.length === 0) {
    <Instructions />;
  } else {
    let [chartType, colour, height] = chartOptions.split(' ');
    const chartHeight = parseFloat(height);
    const chartWidth = chartHeight * 1.78;

    const xAxisLabel = chartData[0].content;
    const yAxisLabel = chartData[1].content;

    let chartObj: any;
    if (chartType === 'stackedbar') {
      chartObj = chartData[0].children.map(
        (val1: { content: string }, index: number) => ({
          name: val1.content,
          valueZero: parseFloat(
            chartData[1].children[index].content.split(',')[0]
          ),
          valueOne: parseFloat(
            chartData[1].children[index].content.split(',')[1]
          ),
        })
      );
    } else if (chartType === 'percentbar') {
      chartObj = chartData[0].children.map(
        (val1: { content: string }, index: number) => ({
          name: val1.content,
          valueZero: (
            (parseFloat(chartData[1].children[index].content.split(',')[0]) /
              parseFloat(chartData[1].children[index].content.split(',')[1])) *
            100
          ).toFixed(2),
          valueOne: (
            100 -
            (parseFloat(chartData[1].children[index].content.split(',')[0]) /
              parseFloat(chartData[1].children[index].content.split(',')[1])) *
              100
          ).toFixed(2),
        })
      );
    } else if (chartType === 'line') {
      let mostValuesInSeries = 0;
      chartObj = chartData[0].children.map(
        (val1: { content: string }, index: number) => {
          const values: string[] =
            chartData[1].children[index].content.split(',');

          if (values.length > mostValuesInSeries) {
            mostValuesInSeries = values.length;
          }

          let returnObj = {
            name: val1.content,
            mostValuesInSeries: mostValuesInSeries,
          };

          for (let i = 0; i < values.length; i++) {
            returnObj[`value${i}`] = parseFloat(values[i]);
          }

          return returnObj;
        }
      );
    } else {
      chartObj = chartData[0].children.map(
        (val1: { content: string }, index: number) => ({
          name: val1.content,
          value: parseFloat(chartData[1].children[index].content),
        })
      );
    }

    return {
      chartObj,
      chartType,
      colour,
      chartHeight,
      chartWidth,
      xAxisLabel,
      yAxisLabel,
    };
  }
};
