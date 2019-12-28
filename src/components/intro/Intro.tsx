import * as React from 'react';

import { Container } from 'components/container/Container';
import { Row } from 'components/row/Row';

import s from './Intro.scss';

interface IIntroProps {
  children: React.ReactNode;
}

export const Intro = ({ children }: IIntroProps) => {
  return (
    <Container>
      <div className={s.intro}>
        <Row>
          <div className={s.intro__col}>{children}</div>
        </Row>
      </div>
    </Container>
  );
};
