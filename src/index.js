import '@logseq/libs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

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

    const data = renderBlock.children[0].children;
    const chartDetails = renderBlock.children[0].content;

    // Use React to render board
    const board = ReactDOMServer.renderToStaticMarkup(
      <App blockData={data} chartDetails={chartDetails} />
    );

    // Set div for renderer to use
    const cmBoard = (board) => {
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
