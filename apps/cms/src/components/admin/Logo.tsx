import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        textDecoration: 'none',
        userSelect: 'none',
        padding: '2px 0',
      }}
    >
      <svg
        viewBox="0 0 512 512"
        width="36"
        height="36"
        style={{
          borderRadius: '8px',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(28, 58, 46, 0.25)',
        }}
        aria-hidden="true"
      >
        {/* Forest Green squircle */}
        <rect width="512" height="512" rx="112" fill="#1C3A2E" />
        {/* Ceylon Gold Serif 'A' monogram */}
        <g fill="#D4B96A">
          <polygon points="212,122 300,122 300,110 212,110" />
          <polygon points="160,390 196,390 252,122 230,122" />
          <polygon points="132,402 216,402 216,390 132,390" />
          <polygon points="248,122 284,122 352,390 310,390" />
          <polygon points="286,402 380,402 380,390 286,390" />
          <rect x="188" y="298" width="136" height="20" rx="3" />
        </g>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span
          style={{
            fontFamily: 'Georgia, Cambria, "Times New Roman", serif',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--theme-elevation-1000, #1C3A2E)',
          }}
        >
          Anthony
        </span>
        <span
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: '#C9A84C',
          }}
        >
          Holidays
        </span>
      </div>
    </div>
  )
}

export default Logo
