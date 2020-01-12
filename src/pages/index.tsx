import React, { PureComponent } from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { gsap } from "gsap"

import { Grid, Box } from "grommet"
import { Background } from "components/Background"
import { Greeting } from "components/Greeting"
;(window as any).gsap = gsap

/* eslint-disable @typescript-eslint/no-var-requires */
const DrawSVGPlugin = require("gsap/DrawSVGPlugin")
const CustomEase = require("gsap/CustomEase")
const CustomBounce = require("gsap/CustomBounce")
/* eslint-enable @typescript-eslint/no-var-requires */

import greet from "animation/GreetTimeline"
import introduce from "animation/IntroduceTimeline"

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

export default class Intro extends PureComponent {
  constructor(props: any) {
    super(props)
    ;(gsap as any).registerPlugin(CustomEase, CustomBounce, DrawSVGPlugin)
  }

  componentDidMount() {
    this.animate()
  }

  animate = () => {
    CustomBounce.CustomBounce.create("myBounce", { strength: 0.6, squash: 2 })
    gsap.set("#section-bongo-cat, #section-projects-intro, #bg > div", { autoAlpha: 0 })

    gsap
      .timeline()
      .add(greet())
      .add(introduce(), ">-3.5")
      .addLabel("projects-intro")
      .to("#section-projects-intro", { autoAlpha: 1 }, "<4.5")
    // .to('#section-bongo-cat', { autoAlpha: 1 }, '<0.1')
  }

  render() {
    return (
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
  }
}
