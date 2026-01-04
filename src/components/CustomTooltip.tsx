import { TooltipProps } from '../interfaces'

export const CustomTooltip = ({
  active,
  payload,
  label,
}: Partial<TooltipProps>) => {
  if (!active || !payload || !payload.length) return null

  return (
    <div
      style={{
        backgroundColor: '#fff',
        minWidth: '150px',
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
          fontWeight: 600,
          marginBottom: '6px',
          fontSize: '14px',
          color: '#1A1B1E',
        }}
      >
        {label}
      </div>

      {payload.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            gap: '10px',
            marginBottom: '4px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '9999px',
              backgroundColor: item.color || item.fill,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: '#868e96',
              textTransform: 'capitalize',
              fontSize: '13px',
              lineHeight: 1.55,
            }}
          >
            {item.name}:
          </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: '13px',
              color: '#1A1B1E',
              lineHeight: 1.55,
            }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
