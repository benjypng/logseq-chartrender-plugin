export const scaffoldDbGraph = async () => {
  const existingProp = await logseq.Editor.getPage('chart-property')
  if (!existingProp) {
    const chartTag = await logseq.Editor.createTag('Chart')
    if (!chartTag) return

    const tagPropForChart = await logseq.Editor.upsertProperty('chart-tag', {
      type: 'node',
      cardinality: 'one',
    })
    if (!tagPropForChart) return
    await logseq.Editor.addTagProperty(chartTag.uuid, tagPropForChart.uuid)

    const propertyPropForChart = await logseq.Editor.upsertProperty(
      'chart-properties',
      {
        type: 'node',
        cardinality: 'many',
      },
    )
    if (!propertyPropForChart) return
    await logseq.Editor.addTagProperty(chartTag.uuid, propertyPropForChart.uuid)

    const chartTypePropForChart = await logseq.Editor.upsertProperty(
      'chart-type',
      {
        type: 'default',
        cardinality: 'one',
      },
    )
    if (!chartTypePropForChart) return
    await logseq.Editor.addTagProperty(
      chartTag.uuid,
      chartTypePropForChart.uuid,
    )
  }
}
