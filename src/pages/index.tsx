import React, { PureComponent } from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import GSDevTools from "gsap/GSDevTools"
import { gsap } from "gsap"

/* eslint-disable @typescript-eslint/no-var-requires */
const DrawSVGPlugin = require("gsap/DrawSVGPlugin")
const CustomEase = require("gsap/CustomEase")
const CustomBounce = require("gsap/CustomBounce")
const SplitText = require("gsap/SplitText")
/* eslint-enable @typescript-eslint/no-var-requires */

import { Grid, Box } from "grommet"
import { Background } from "components/index/Background"
import { Greeting } from "components/index/Greeting"
import { ProjectsIntro } from "components/index/ProjectsIntro"
import { TypingCat } from "components/index/TypingCat"
import { LanguageStatus } from "components/index/LanguageStatus/LanguageStatus"
import { ConnectLinks } from "components/ConnectLinks"
import { ZigZagDivider } from "components/ZigZagDivider"
import { usePointPosition } from "hooks/use-point-position"

import greet from "animation/GreetTimeline"
import introduce from "animation/IntroduceTimeline"

const Cursor = styled.div`
  will-change: transform;
  position: fixed;
  background: #2128bd;
  user-select: none;
  pointer-events: none;
  z-index: 10000;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border-radius: 50%;
`

const GreetingArea = styled(Box)`
  /* Do this with theme var */
  color: #080d33;
  mix-blend-mode: lighten;
  display: flex;
  flex-direction: row;
`

const ProjectsIntroArea = styled(Box)`
  /* Do this with theme var */
  color: #ffffff;
  mix-blend-mode: darken;
  background: #080d33;
`

const TypingCatArea = styled(Box)`
  /* Do this with theme var */
  color: #080d33;
  mix-blend-mode: lighten;
`

const LanguageStatusArea = styled(Box)`
  /* Do this with theme var */
  color: #ffffff;
  mix-blend-mode: darken;
  background: #080d33;
`

const BlendedConnectLinks = styled(ConnectLinks)`
  mix-blend-mode: multiply;
`

type ContentProps = { children: React.ReactNode }

// This is pulled out into a separate component with the cursor through a hook so I can use that
// same logic on other pages but with different styles. Cannot use a hook in stateful components
// and need one to trigger GSAP animations componentDidMount.
const Content = ({ children }: ContentProps) => {
  if (typeof window !== `undefined`) {
    const position = usePointPosition()

    // TODO: move these into useEffect
    gsap.set("#cursor", {
      x: position.x,
      y: position.y,
      ease: "power4.in",
    })

    gsap.to("#bg div", {
      x: position.x,
      y: position.y,
      autoAlpha: 0.9,
      stagger: -0.1,
    })
  }

  // CSS grid does seem like overkill right now but adding the projects will make this more logical.
  return (
    <Grid
      rows={["1fr", "auto", "auto", "auto"]}
      columns={["1/3", "auto", "46px", "min-content"]}
      areas={[
        { name: "greeting", start: [0, 0], end: [2, 0] },
        { name: "top-connect-links", start: [3, 0], end: [3, 0] },
        { name: "language-status", start: [0, 1], end: [3, 1] },
        { name: "typing-cat", start: [0, 2], end: [3, 2] },
        { name: "projects-intro", start: [0, 3], end: [3, 3] },
      ]}
    >
      {children}
    </Grid>
  )
}

export default class extends PureComponent {
  constructor(props: any) {
    super(props)
    if (typeof window !== `undefined`) {
      this.init()
    }
  }

  init() {
    ;(gsap as any).registerPlugin(CustomEase, CustomBounce, DrawSVGPlugin, SplitText, GSDevTools)
  }

  componentDidMount() {
    this.animate()
  }

  animate = () => {
    CustomBounce.CustomBounce.create("myBounce", { strength: 0.6, squash: 2 })

    gsap
      .timeline()
      .add(greet())
      .add(introduce(), ">-3.5")
  }

  render() {
    return (
      <>
        <Helmet title="Caroline Artz" />
        <Cursor id="cursor" />
        <Background id="bg" />
        <Box as="main">
          <Content>
            <GreetingArea background="light-1" gridArea="greeting">
              <Greeting />
              <ZigZagDivider backgroundBefore="white" backgroundAfter="white" />
            </GreetingArea>
            <BlendedConnectLinks
              gridArea="top-connect-links"
              pad={{ vertical: "medium", right: "medium", left: "xlarge" }}
            />
            <LanguageStatusArea background="brand" gridArea="language-status">
              <LanguageStatus />
            </LanguageStatusArea>
            <TypingCatArea background="light-1" gridArea="typing-cat">
              <TypingCat />
            </TypingCatArea>
            <ProjectsIntroArea background="brand" gridArea="projects-intro">
              <ProjectsIntro />
            </ProjectsIntroArea>
          </Content>
        </Box>
      </>
    )
  }
}
