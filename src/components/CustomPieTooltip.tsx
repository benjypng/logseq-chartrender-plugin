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
    <div
      style={{
        backgroundColor: '#fff',
        minWidth: '120px',
        padding: '10px',
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: '6px',
          marginBottom: '4px',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '9999px',
            backgroundColor: data.payload.fill ?? '#000000',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#1A1B1E',
          }}
        >
          {data.name}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div
          style={{
            fontSize: '14px',
            color: '#1A1B1E',
            fontWeight: 700,
          }}
        >
          {data.value}
          {percentage !== null && (
            <span
              style={{
                fontWeight: 400,
                color: '#868e96',
                marginLeft: '4px',
              }}
            >
              ({percentage}%)
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
