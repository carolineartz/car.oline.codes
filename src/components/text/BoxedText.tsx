import * as React from 'react';

export interface IBoxedTextProps {
  children: React.ReactNode;
  tag: string;
  display?: string;
}

export const BoxedText = ({ tag, display, children }: IBoxedTextProps) => {
  return React.createElement(tag, { style: display ? { display } : {} }, children);
};
