import React from "react";

const IFLRIcon = props => (
  <svg
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 500 550"
    {...props}>
    <defs>
      <linearGradient
        id="a9f3a717-61cf-4fc9-b4f1-d2b739808105"
        x1={250}
        x2={250}
        y2={550}
        gradientUnits="userSpaceOnUse">
        <stop offset={0} stopColor="#f7931e" />
        <stop offset={1} stopColor="#f15a24" />
      </linearGradient>
      <linearGradient id="9c245519-ca38-4cb3-bafc-39836b2b98b0" x1={49.5} x2={49.5} y2={124} xlinkHref="#a9f3a717-61cf-4fc9-b4f1-d2b739808105" />
    </defs>
    <g id="f91414b4-bcf9-41a1-8215-2871380f5813" data-name="Layer 2">
      <g id="827f0d6f-5da6-4b7c-babb-211d3b8e6c3c" data-name="Board 3">
        <path
          d="M99 300c0 37 32 50 50 50s50-15 50-50V124c0-40 37-50 51-50 13 0 49 11 49 50v176c0 38 32 50 50 50 17 0 49-13 49-50V50c0-38 37.64-50 51-50 12 0 51 9 51 50v250c0 138.07-111.93 250-250 250S0 438.07 0 300V197c0-39 35-50 49-50 11 0 50 8 50 50"
          fill="url(#a9f3a717-61cf-4fc9-b4f1-d2b739808105)"
        />
        <path
          d="M49 124c15 0 50-11 50-50V49C99 8 60 0 49 0 37 0 0 9 0 49v25c0 48 49 50 49 50"
          fill="url(#9c245519-ca38-4cb3-bafc-39836b2b98b0)"
        />
      </g>
    </g>
  </svg>
);

export default IFLRIcon;
