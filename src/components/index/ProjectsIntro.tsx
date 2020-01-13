/* eslint-disable react/no-unescaped-entities */
import * as React from "react"

import { Box } from "grommet"
import { ResponsiveText } from "components/ResponsiveText"

export const ProjectsIntro = () => (
  <Box basis="full" align="center" justify="center" pad="medium">
    <Box>
      <ResponsiveText fontSize={{ min: "26px", max: "60px" }} weight={700} textAlign="center">
        These are some things I've worked on recently
      </ResponsiveText>
    </Box>
  </Box>
)
