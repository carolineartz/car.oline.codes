import * as React from 'react';

// import s from './Box.scss';

interface IBoxProps {
  children: React.ReactNode;
  id?: string;
  className: string;
}

export const Box = ({ children, id, className = '' }: IBoxProps) => (
  <div id={id} className={className}>
    {children}
  </div>
);
