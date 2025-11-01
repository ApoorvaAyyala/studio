import type { SVGProps } from 'react';

export function FlagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 14H6V2H5V14Z" />
      <path d="M5 2H12V8H5V2Z" className="text-destructive" />
    </svg>
  );
}
