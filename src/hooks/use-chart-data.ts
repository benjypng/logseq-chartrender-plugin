import { useEffect, useState } from 'react'

import { ChartDataState, UseChartDataProps } from '../interfaces'
import { transformRawChartData } from '../utils'

export const useChartData = ({
  uuid,
  tagPageName,
  rawChartProps,
  chartType,
}: UseChartDataProps) => {
  const [data, setData] = useState<ChartDataState>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)

        const propPages = await Promise.all(
          rawChartProps.map((name: string) => logseq.Editor.getPage(name)),
        )
        if (!propPages || propPages.length === 0) return

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

        const transformedData = transformRawChartData(rawChartData)

        setData({
          chartType,
          data: transformedData,
        })
      } catch (e: any) {
        setError(String(e.message) || `Failed to fetch Logseq data`)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [uuid, tagPageName, rawChartProps.length, chartType])

  return {
    chartData: data,
    isLoading,
    error,
  }
}
