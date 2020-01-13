import * as React from "react"

import { HAND_CONTAINER_ID, HAND_ID } from "animation/GreetTimeline"
import Hand from "assets/svg/hand.svg"
import Name from "assets/svg/caroline.svg"

import { Box } from "grommet"
import { ResponsiveText } from "components/ResponsiveText"

export const Greeting = () => (
  <Box>
    <Box direction="row" pad="medium" align="baseline">
      <Box basis="1/3" height={{ min: "160px", max: "360px" }} id={HAND_CONTAINER_ID}>
        <Hand id={HAND_ID} />
      </Box>
      <Box>
        <ResponsiveText fontSize={{ min: "40px", max: "140px" }} weight={900}>
          I'm
        </ResponsiveText>
      </Box>
    </Box>
    <Box pad="small" fill="horizontal">
      <Name />
    </Box>
  </Box>
)
