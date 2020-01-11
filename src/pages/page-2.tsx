import React from "react"
import Helmet from "react-helmet"

import { Link } from "gatsby"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Heading } from "grommet"

export default () => (
  <>
    <Helmet title="Page 2" />
    <Heading margin="none">Welcome to page 2</Heading>
    <Link to="/">Go back to the homepage</Link>
  </>
)
