import * as React from 'react';
import Helmet from 'react-helmet';

import { Intro } from 'components/intro/Intro';

export default () => {
  return (
    <>
      <Helmet title="Home" />

      <Intro />
    </>
  );
};
