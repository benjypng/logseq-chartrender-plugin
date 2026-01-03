import { CHART_PROP_KEY, TAG_PROP_KEY } from '../constants'
import { transformRawChartData } from '.'

export const getLogseqData = async (blockProps: Record<string, any>) => {
  const tagPageName = blockProps[TAG_PROP_KEY]
  const rawChartProps = blockProps[CHART_PROP_KEY]

  if (!tagPageName || !rawChartProps) {
    logseq.UI.showMsg(
      'Plugin tag or properties not setup correctly. Please delete the tag #Chart and the properties #chart-tag and chart-tag, chart-properties and chart-type and re-install the plugin',
      'error',
    )
    return
  }

  const propPages = await Promise.all(
    rawChartProps.map((name: string) => logseq.Editor.getPage(name)),
  )

  const propPagesIds = propPages.map((propPage) => propPage?.id)
  const idsSetStringForUseInQuery = `#{${propPagesIds.join(' ')}}`

  const tagPage = await logseq.Editor.getPage(tagPageName)
  if (!tagPage) return

  const rawChartData = await logseq.DB.datascriptQuery(`
[:find ?title ?propName ?value
:where
[?b :block/tags ${tagPage.id}]
[?b :block/refs ?propId]
[(contains? ${idsSetStringForUseInQuery} ?propId)]
[?propId :db/ident ?propIdent]
[?b ?propIdent ?valNode]
[?b :block/title ?title]
[?valNode :logseq.property/value ?value]
[?propId :block/name ?propName]]`)

  return transformRawChartData(rawChartData)
}
