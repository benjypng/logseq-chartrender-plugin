import { CHART_PROP_KEY, TAG_PROP_KEY } from '../constants'
import { transformRawChartData } from '.'

export const getLogseqData = async (blockProps: Record<string, any>) => {
  const tagPageName = blockProps[TAG_PROP_KEY]
  const rawChartProps = blockProps[CHART_PROP_KEY]

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
