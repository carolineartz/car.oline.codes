import React from "react"
import Helmet from "react-helmet"

import { Heading } from "grommet"

import { InternalLink } from "components/InternalLink"

export default () => (
  <>
    <Helmet title="Home" />
    <Heading>You are on Page 2!</Heading>
    <InternalLink to="/" label="Go Home!" />
  </>
)
