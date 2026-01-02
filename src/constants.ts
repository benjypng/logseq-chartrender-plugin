export const TAG_PROP_KEY =
  ':plugin.property.logseq-chartrender-plugin/chart-tag'

export const CHART_PROP_KEY =
  ':plugin.property.logseq-chartrender-plugin/chart-properties'

export const CHART_TYPE_PROP_KEY =
  ':plugin.property.logseq-chartrender-plugin/chart-type'

export const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

export const ANIMATION_DURATION = 1500

export const mantineThemeOverride = `
  :root {
    --mantine-color-text: var(--ls-primary-text-color);
    --mantine-color-body: var(--ls-primary-background-color);
    --mantine-color-dimmed: var(--ls-secondary-text-color);
    --mantine-color-default-border: var(--ls-border-color);
  }
  .mantine-Text-root, 
  .mantine-Title-root, 
  .mantine-Input-input {
      color: var(--ls-primary-text-color) !important;
      background-color: transparent !important; 
  }
  .mantine-Input-input {
      background-color: var(--ls-secondary-background-color) !important;
      border-color: var(--ls-border-color) !important;
  }`
