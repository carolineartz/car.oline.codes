import React from "react"
import Helmet from "react-helmet"

import { Link } from "gatsby"
import { Heading } from "grommet"

export default () => (
  <>
    <Helmet title="Home" />
    <Heading>You are home!</Heading>
    <Link to="/page-2/">Go to page 2</Link>
  </>
)
