import * as React from 'react';
import Helmet from 'react-helmet';

import { Intro } from 'components/intro/Intro';
import { Container } from 'components/container/Container';
import BongoCat from 'assets/svg/bongo-cat.svg';
// import { BlockText } from 'components/block-text/BlockText';

// import { Logo } from 'components/logo/Logo';
// import { Row } from 'components/row/Row';

export default () => {
  return (
    <>
      <Helmet title="Home" />

      <Intro />
      <Container>
        <BongoCat />
      </Container>
      {/* <Row>
          <WaveHello />
        </Row>
        <Row>
          <Logo />
        </Row>
        <Row>
        </Row>
      </Intro> */}

      {/* <BlockText
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
      /> */}
    </>
  );
};
