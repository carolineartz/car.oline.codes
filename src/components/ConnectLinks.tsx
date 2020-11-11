import * as React from "react"

import { Box, BoxProps, Anchor } from "grommet"
import { Codepen, LinkedinOption, Github, Twitter, Mail } from "grommet-icons"
import { ColorType } from "grommet/utils"

type ConnectLinksProps = BoxProps & {
  color?: ColorType
}

type Foo = React.FormEvent

export const ConnectLinks = ({
  color = "accent-3",
  flex = false,
  pad = "medium",
  gap = "medium",
  ...restBoxProps
}: ConnectLinksProps) => (
  <Box {...restBoxProps} pad={pad} flex={flex} gap={gap}>
    <Anchor href="https://github.com/carolineartz/" color={color} icon={<Github />} />
    <Anchor href="https://codepen.io/carolineartz/" color={color} icon={<Codepen />} />
    <Anchor
      href="https://www.linkedin.com/in/carolineartz/"
      color={color}
      icon={<LinkedinOption />}
    />
    <Anchor href="https://twitter.com/carolineartz" color={color} icon={<Twitter />} />
    <Anchor href="mailto:ceartz@gmail.com" color={color} icon={<Mail />} />
  </Box>
)
