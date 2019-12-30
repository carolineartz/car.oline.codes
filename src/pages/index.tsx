import * as React from 'react';
import Helmet from 'react-helmet';

import { Intro } from 'components/intro/Intro';
import { Container } from 'components/container/Container';
import BongoCat from 'assets/svg/bongo-cat.svg';

export default () => {
  return (
    <>
      <Helmet title="Home" />

      <Intro />
      <Container>
        <BongoCat />
      </Container>
    </>
  );
};
