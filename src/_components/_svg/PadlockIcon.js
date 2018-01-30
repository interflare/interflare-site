import React from "react";

const PadlockIcon = props => (
  <svg viewBox="0 0 70 85" {...props}>
    <defs>
      <linearGradient
        id="1be42f5e-50e8-428f-b8a3-e58515688b5b"
        x1={35}
        y1={85}
        x2={35}
        y2={-0.56}
        gradientUnits="userSpaceOnUse">
        <stop offset={0} stopColor="#f15a26" />
        <stop offset={1} stopColor="#f79420" />
      </linearGradient>
    </defs>
    <path
      d="M64 30h-9v-7C55 8.51 48.33 0 35 0S15 8.51 15 23v7H5c-2.76 0-5 3.24-5 6v39a7.35 7.35 0 0 0 4.76 6.54l6 1.93A38.43 38.43 0 0 0 20.5 85h29a38 38 0 0 0 9.76-1.54l6-1.93A7.32 7.32 0 0 0 70 75V36c0-2.76-3.24-6-6-6zm-39-9c0-7.23 4-11 10-11s10 3.77 10 11v9H25z"
      fill="url(#1be42f5e-50e8-428f-b8a3-e58515688b5b)"
    />
  </svg>
);

export default PadlockIcon;
