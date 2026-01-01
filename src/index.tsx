import "@logseq/libs";

import { BlockEntity } from "@logseq/libs/dist/LSPlugin.user";
import ReactDOMServer from "react-dom/server";

import Chart from "./Chart";
import Instructions from "./Instructions";
import { createChart } from "./Utils";

const main = async () => {
  console.log("Chart Render plugin loaded");

  // Insert renderer upon slash command
  logseq.Editor.registerSlashCommand("Render chart", async (e) => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :charts_${e.uuid}}}`);
  });

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    // Get uuid of payload so that child blocks can be retrieved for the board
    const uuid = payload.uuid;
    const [type] = payload.arguments;
    const chartId = `charts_${uuid}_${slot}`;

    if (!type || !type.startsWith(":charts_")) return;

    const renderBlock = await logseq.Editor.getBlock(uuid, {
      includeChildren: true,
    });
    if (!renderBlock || !renderBlock.children) return;

    const childBlock = renderBlock.children[0] as BlockEntity;
    const chartBlocks = childBlock.children as BlockEntity[];
    const chartOptions = childBlock.content;
    if (!chartBlocks || !chartOptions) return;

    let board = "";
    if (chartBlocks.length > 0 && chartOptions.length > 0) {
      const chart = createChart(chartBlocks, chartOptions);
      if (!chart) return;

      const {
        chartType,
        chartData,
        colour,
        chartHeight,
        chartWidth,
        xAxisLabel,
        yAxisLabel,
        mostValuesInSeries,
      } = chart;

      board = ReactDOMServer.renderToStaticMarkup(
        <Chart
          chartType={chartType}
          chartData={chartData}
          colour={colour}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          mostValuesInSeries={mostValuesInSeries}
        />,
      );
    } else {
      board = ReactDOMServer.renderToStaticMarkup(<Instructions />);
    }

    const cmBoard = (board: string) => {
      return `<div id="${chartId}" data-slot-id="${slot}" data-chart-id="${chartId}" data-block-uuid="${uuid}">${board}</div>`;
    };

    logseq.provideUI({
      key: `${chartId}`,
      slot,
      reset: true,
      template: cmBoard(board),
    });
  });
};

logseq.ready(main).catch(console.error);
