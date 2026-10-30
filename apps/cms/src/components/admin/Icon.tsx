import React from 'react'

export const Icon: React.FC = () => {
  return (
    <svg
      viewBox="0 0 512 512"
      width="18"
      height="18"
      style={{
        borderRadius: '4px',
        display: 'block',
        boxShadow: '0 2px 6px rgba(28, 58, 46, 0.25)',
      }}
      aria-label="Anthony Holidays"
    >
      <rect width="512" height="512" rx="112" fill="#1C3A2E" />
      <g fill="#D4B96A">
        <polygon points="212,122 300,122 300,110 212,110" />
        <polygon points="160,390 196,390 252,122 230,122" />
        <polygon points="132,402 216,402 216,390 132,390" />
        <polygon points="248,122 284,122 352,390 310,390" />
        <polygon points="286,402 380,402 380,390 286,390" />
        <rect x="188" y="298" width="136" height="20" rx="3" />
      </g>
    </svg>
  )
}

export default Icon
