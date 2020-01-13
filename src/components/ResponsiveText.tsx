import { between } from "polished"
import styled from "styled-components"
import { Text, TextProps } from "grommet"

/*
  Convenience styled component for extended grommet `Text` using polished lib to create responsive sizing
*/

type ResponsiveTextProps = TextProps & {
  fontSize: {
    min: string
    max: string
  }
}

export const ResponsiveText = styled(Text)<ResponsiveTextProps>`
  line-height: 1.3;
  font-size: ${({ fontSize }) => between(fontSize.min, fontSize.max)};
`
