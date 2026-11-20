import React from 'react'

export const ViewFrontendButton: React.FC = () => {
  const frontendUrl =
    process.env.FRONTEND_URL ||
    'http://localhost:3000'

  return (
    <a
      href={frontendUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 12px',
        fontSize: '12.5px',
        fontWeight: 600,
        color: '#1C3A2E',
        backgroundColor: '#F5EEDC',
        border: '1px solid #C9A84C',
        borderRadius: '4px',
        textDecoration: 'none',
        lineHeight: 1.3,
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
      }}
      title="Open Anthony Holidays front-end in a new tab"
    >
      <span>View Website</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1C3A2E"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  )
}

export default ViewFrontendButton
