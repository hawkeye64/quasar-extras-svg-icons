import * as React from 'react';
import { IconProps } from './types';

export const TriangleLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', ...props }, forwardedRef) => {
    return (
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        ref={forwardedRef}
      >
        <path d="M9 4L9 11L4.5 7.5L9 4Z" fill={color} />
      </svg>
    );
  }
);

export default TriangleLeftIcon;