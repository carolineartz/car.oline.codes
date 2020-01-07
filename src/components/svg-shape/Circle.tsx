import React from 'react';
// TODO fixme so its library like and don't have to do this.
import { Lines, Paths, Circles } from 'react-svg-textures';

interface ICircleProps {
  fill: string | typeof Lines | typeof Circles | typeof Paths;
  size: number;
}

export const Circle = ({ fill, size }: ICircleProps) => {
  const getFill = (fill: string | typeof Lines) => {
    if (typeof fill === 'string') {
      return fill;
    } else if (fill.props.id) {
      return `url(#${fill.props.id})`;
    } else {
      return 'rebeccapurple';
    }
  };
  return (
    <svg width={size} height={size}>
      {typeof fill !== 'string' && fill}
      <circle cx={size / 2} cy={size / 2} r={size} fill={getFill(fill)} />
    </svg>
  );
};
