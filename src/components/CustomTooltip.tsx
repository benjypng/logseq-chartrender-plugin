import { ColorSwatch, Group, Paper, Text } from '@mantine/core'

import { TooltipProps } from '../interfaces'

export const CustomTooltip = ({
  active,
  payload,
  label,
  // Have to add in Partial to solve the type issue in the parent component
}: Partial<TooltipProps>) => {
  if (!active || !payload || !payload.length) return

  if (active && payload && payload.length) {
    return (
      <Paper
        shadow="md"
        radius="md"
        withBorder
        p="xs"
        style={{ minWidth: '150px', backgroundColor: '#fff' }}
      >
        <Text fw={600} mb={6} size="sm" c="dark.9">
          {label}
        </Text>
        {payload.map((item, index) => (
          <Group key={index} gap="xs" mb={4} wrap="nowrap">
            <ColorSwatch
              color={item.color || item.fill}
              size={8}
              radius="xl"
              withShadow={false}
            />
            <Text c="dimmed" tt="capitalize" size="sm" fz={13}>
              {item.name}:
            </Text>
            <Text fw={600} size="sm" c="dark.9" fz={13}>
              {item.value}
            </Text>
          </Group>
        ))}
      </Paper>
    )
  }
}
