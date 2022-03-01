import '@logseq/libs';
import { BlockEntity } from '@logseq/libs/dist/LSPlugin.user';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { createChart } from './CreateChart';

const main = async () => {
  console.log('Chart Render plugin loaded');

  // Generate unique identifier
  const uniqueIdentifier = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');

  // Insert renderer upon slash command
  logseq.Editor.registerSlashCommand('chart render', async () => {
    await logseq.Editor.insertAtEditingCursor(
      `{{renderer :charts_${uniqueIdentifier()}}}`
    );
  });

  logseq.App.onMacroRendererSlotted(async ({ slot, payload }) => {
    // Get uuid of payload so that child blocks can be retrieved for the board
    const uuid = payload.uuid;
    const [type] = payload.arguments;
    const id = type.split('_')[1]?.trim();
    const chartId = `charts_${id}`;

    if (!type.startsWith(':charts_')) return;

    const renderBlock = await logseq.Editor.getBlock(uuid, {
      includeChildren: true,
    });

    const childBlock = renderBlock.children[0] as BlockEntity;
    const chartData: any[] = childBlock.children;
    const chartOptions: string = childBlock.content;

    const {
      chartType,
      chartObj,
      colour,
      chartHeight,
      chartWidth,
      xAxisLabel,
      yAxisLabel,
    } = createChart(chartData, chartOptions);

    // Use React to render board
    const board = ReactDOMServer.renderToStaticMarkup(
      <App
        chartType={chartType}
        chartObj={chartObj}
        colour={colour}
        chartHeight={chartHeight}
        chartWidth={chartWidth}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
      />
    );

    // Set div for renderer to use
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
