import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"

// import { Heading, Grid, Box } from "grommet"
// import { Background } from "components/Background"
// import { InternalLink } from "components/InternalLink"
import { Grid, Box } from "grommet"
import { Background } from "components/Background"
import { Greeting } from "components/Greeting"

const Cursor = styled.div`
  will-change: transform;
  transform: translate(-50%, -50%);
  position: fixed;
  background: #2128bd;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
`

const GreetingArea = styled(Box)`
  /* figure out how to do this with theme var */
  color: #080d33;
  mix-blend-mode: lighten;
`

export default () => (
  <>
    <Helmet title="Caroline Artz" />
    <Cursor />
    <Background />
    <Grid
      fill={true}
      rows={["xsmall", "2/3"]}
      columns={["1/3", "2/3"]}
      areas={[
        { name: "nav", start: [0, 0], end: [1, 0] },
        { name: "greeting", start: [0, 1], end: [1, 1] },
      ]}
    >
      <Box gridArea="nav">Nav Here</Box>
      <GreetingArea background="light-1" gridArea="greeting">
        <Greeting />
      </GreetingArea>
    </Grid>
  </>
)
