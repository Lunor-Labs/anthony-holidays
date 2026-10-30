import React from 'react'

export const ViewFrontendNav: React.FC = () => {
  const frontendUrl =
    process.env.FRONTEND_URL ||
    'http://localhost:3000'

  return (
    <div style={{ padding: '16px 8px 8px 8px', marginTop: 'auto' }}>
      <a
        href={frontendUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderRadius: '6px',
          background: 'var(--theme-elevation-100, rgba(28, 58, 46, 0.06))',
          border: '1px solid var(--theme-elevation-200, rgba(201, 168, 76, 0.35))',
          color: 'var(--theme-elevation-1000, #1C3A2E)',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
        title="Open Anthony Holidays website in a new tab"
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px' }}>🌐</span>
          <span>Open Website</span>
        </span>
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.7 }}
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  )
}

export default ViewFrontendNav
