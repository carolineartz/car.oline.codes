import * as React from "react"

import { Box, Text } from "grommet"

import { HAND_CONTAINER_ID, HAND_ID } from "animation/GreetTimeline"
import Hand from "assets/svg/hand.svg"
import Name from "assets/svg/caroline.svg"

export const Greeting = () => (
  <Box>
    <Box direction="row" pad="medium">
      <Box basis="1/3" id={HAND_CONTAINER_ID}>
        <Hand id={HAND_ID} />
      </Box>
      {
        // eslint-disable-next-line react/no-unescaped-entities
        <Text size="xxlarge">I'm</Text>
      }
    </Box>
    <Box fill="horizontal">
      <Name />
    </Box>
  </Box>
)
