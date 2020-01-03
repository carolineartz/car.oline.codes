import * as React from 'react';

import s from './Container.scss';

interface IContainerProps {
  children: React.ReactNode;
  id?: string
}

export const Container = ({ children, id }: IContainerProps) => (
  <section id={id} className={s.container}>{children}</section>
);
