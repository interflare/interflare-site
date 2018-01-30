import React from "react";

const PaletteIcon = props => (
  <svg viewBox="0 0 98 76" {...props}>
    <defs>
      <linearGradient
        id="066cfd38-b976-44da-85b7-9e8449ad8666"
        x1={49}
        y1={75.17}
        x2={49}
        y2={0.6}
        gradientUnits="userSpaceOnUse">
        <stop offset={0} stopColor="#f15a26" />
        <stop offset={1} stopColor="#f79420" />
      </linearGradient>
    </defs>
    <path
      d="M85.76 10.83C70.24.5 52.81-3.06 32.15 2.86 16 7.49 1.23 25.83.09 41.55-1.26 60.12 13.2 76 38.68 76c27.47 0 37.75-13.22 38-17.23S65.94 47.35 73 39.73c8.83-9.54 16.68-1.41 21.44-2.56s7.16-15.8-8.68-26.34zM53.89 57.41a7.5 7.5 0 1 1 7.52-7.5 7.5 7.5 0 0 1-7.52 7.5z"
      fill="url(#066cfd38-b976-44da-85b7-9e8449ad8666)"
    />
  </svg>
);

export default PaletteIcon;
