import '@logseq/libs'

import mantineCss from '@mantine/core/styles.css?raw'
import { createRoot } from 'react-dom/client'

import { ChartContainer } from './components'
import { CHART_TYPE_PROP_KEY, mantineThemeOverride } from './constants'
import { ChartTypes } from './interfaces'
import { getStableId, scaffoldDbGraph } from './utils'
import { getLogseqData } from './utils/get-logseq-data'

const main = async () => {
  logseq.provideStyle(mantineCss + mantineThemeOverride)
  const isDbGraph = await logseq.App.checkCurrentIsDbGraph()

  if (!isDbGraph) {
    logseq.UI.showMsg('logseq-chartrender-plugin: Only DB graphs are supported')
  }

  logseq.UI.showMsg('logseq-chartrender-plugin loaded')

  await scaffoldDbGraph()

  logseq.Editor.registerSlashCommand('Chart: Render chart', async (e) => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :charts_${e.uuid}}}`)
    const chartTag = await logseq.Editor.getTag('Chart')
    if (!chartTag) {
      logseq.UI.showMsg('Chart tag not created', 'error')
      return
    }
    await logseq.Editor.addBlockTag(e.uuid, chartTag.uuid)
  })

  logseq.App.onMacroRendererSlotted(
    async ({ slot, payload: { uuid, arguments: args } }) => {
      const [type] = args
      if (!type || !type.startsWith(':charts_')) return

      const chartId = getStableId(uuid, slot)
      const existingEl = parent.document.getElementById(chartId)

      if (!existingEl) {
        logseq.provideUI({
          key: chartId,
          slot,
          reset: true,
          template: `<div id="${chartId}" style="width: 800px; height: 400px; margin: 0 10px 0 20px"></div>`,
        })
      }

      const blockProps = await logseq.Editor.getBlockProperties(uuid)
      if (!blockProps) return

      const chartType: ChartTypes = blockProps[CHART_TYPE_PROP_KEY]

      const chartData = await getLogseqData(blockProps)

      setTimeout(async () => {
        const el = parent.document.getElementById(chartId)
        if (!el || !el.isConnected) return

        let root = (el as any)._reactRoot
        if (!root) {
          root = createRoot(el)
          ;(el as any)._reactRoot = root
        }

        root.render(
          <ChartContainer chartData={chartData} chartType={chartType} />,
        )
      }, 50)
    },
  )
}

logseq.ready(main).catch(console.error)
