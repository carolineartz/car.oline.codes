import * as React from 'react';
import Helmet from 'react-helmet';

import { Intro } from 'components/intro/Intro';
import { BlockText } from 'components/block-text/BlockText';
import BongoCat from 'assets/svg/bongo-cat.svg';
import WaveHello from 'assets/svg/hello.svg';
import { Logo } from 'components/logo/Logo';
import { Row } from 'components/row/Row';

export default () => {
  return (
    <>
      <Helmet title="Home" />

      <Intro>
        <Row>
          <WaveHello />
        </Row>
        <Row>
          <Logo />
        </Row>
        <Row>
          <BongoCat />
        </Row>
      </Intro>

      <BlockText
        heading="Who we are"
        description={
          <>
            Ueno is a full-service agency, busy designing and building beautiful digital products,
            brands, and experiences. For more informations go to{' '}
            <a href="https://ueno.co" target="_blank" rel="noopener noreferrer">
              ueno.co
            </a>
            .
          </>
        }
      />
    </>
  );
};
