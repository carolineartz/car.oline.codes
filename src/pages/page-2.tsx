import React from "react"
import Helmet from "react-helmet"

import { Link } from "gatsby"
import { Paragraph, Heading } from "grommet"

export default () => (
  <>
    <Helmet title="Page 2" />
    <Heading margin="none">Whoops...!</Heading>
    <Paragraph margin="none">Welcome to page 2</Paragraph>
    <Link to="/">Go back to the homepage</Link>
  </>
)
