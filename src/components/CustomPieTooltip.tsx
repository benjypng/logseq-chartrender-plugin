import { ColorSwatch, Group, Paper, Text } from '@mantine/core'

import { TooltipProps } from '../interfaces'

export const PieTooltip = ({
  active,
  payload,
  total,
}: Partial<TooltipProps>) => {
  if (!active || !payload?.length) return null

  const data = payload[0]
  if (!data) return null

  const percentage =
    total != null ? ((Number(data.value) / total) * 100).toFixed(1) : null

  return (
    <Paper
      shadow="md"
      radius="md"
      withBorder
      p="xs"
      bg="white"
      style={{ minWidth: '120px' }}
    >
      {/* Header: Dot + Name */}
      <Group gap={6} mb={4} wrap="nowrap" align="center">
        <ColorSwatch
          color={data.payload.fill ?? '#000000'}
          size={8}
          radius="xl" // Makes it a perfect circle
          withShadow={false}
        />
        <Text size="sm" fw={600} c="dark.9">
          {data.name}
        </Text>
      </Group>

      {/* Body: Value + Percentage */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Text size="sm" c="dark.9" fw={700}>
          {data.value}
          {percentage !== null && (
            <Text span fw={400} c="dimmed" ml={4}>
              ({percentage}%)
            </Text>
          )}
        </Text>
      </div>
    </Paper>
  )
}
