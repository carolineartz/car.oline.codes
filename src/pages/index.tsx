import React from "react"
import Helmet from "react-helmet"

import { Heading } from "grommet"

import { InternalLink } from "components/InternalLink"

export default () => (
  <>
    <Helmet title="Home" />
    <Heading>You are home!</Heading>
    <InternalLink to="/page-2/" label="Go to page 2" />
  </>
)
