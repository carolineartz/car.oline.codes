import * as React from 'react';

import s from './Intro.scss';

type IntroTextSize = 'large' | 'medium' | 'small';

interface ITextProps {
  children: React.ReactNode;
  className?: any;
  size: IntroTextSize;
}

export const Text = ({ children, className, size = 'medium' }: ITextProps) => {
  return <div className={s(className, s.text, { [size]: true })}>{children}</div>;
};
