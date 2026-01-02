export const getStableId = (uuid: string, slot: string): string => {
  const slotEl = parent.document.getElementById(slot)
  if (slotEl?.closest('#right-sidebar')) {
    return `charts_${uuid}_sidebar`
  }
  return `charts_${uuid}_main`
}
