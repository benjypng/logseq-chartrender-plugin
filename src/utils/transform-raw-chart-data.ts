import { RawChartDataTuple } from '../interfaces'

type ChartDataEntry = Record<string, any>

export const transformRawChartData = (results: RawChartDataTuple[]) => {
  const grouped: Record<string, ChartDataEntry> = {}
  const categories = new Set<string>() //Unique set of categories

  for (const entry of results) {
    const name = entry[0]
    const category = entry[1]
    const value = entry[2]

    grouped[name] ??= { name }
    grouped[name][category] = value
    categories.add(category)
  }
  return {
    data: Object.values(grouped),
    categories: Array.from(categories),
  }
}
