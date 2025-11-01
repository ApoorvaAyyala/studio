import type { SVGProps } from 'react';

export function BombIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 0H5V1H6V2H10V1H11V0H12V1H13V2H14V3H15V4H16V12H15V13H14V14H13V15H12V16H4V15H3V14H2V13H1V12H0V4H1V3H2V2H3V1H4V0Z" fill="black"/>
      <path d="M4 1H5V2H6V3H10V2H11V1H4Z" fill="white"/>
      <path d="M11 4H12V5H11V4Z" fill="white"/>
    </svg>
  );
}
