import * as React from "react"
import { Box, BoxProps } from "grommet"
import styled, { css } from "styled-components"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  overflow: hidden;
`

const Circle = styled(Box)<BoxProps & { size: number; background: string }>`
  position: absolute;
  border-radius: 50%;

  ${props => {
    const size: number = props.size

    return css`
      width: ${size}px;
      height: ${size}px;
      margin: -(${size} / 2) 0 0 - (${size} / 2);
    `
  }}
`

export const Background = () => (
  <Container>
    <Circle background="accent-1" size={440} />
    <Circle background="accent-2" size={338} />
    <Circle background="accent-3" size={267} />
  </Container>
)

// interface CircleProps extends BoxProps {
//   layer: "fg" | "mg" | "bg"
// }

// let size: number

// switch (props.layer) {
//   case "fg":
//     size = 267
//     break
//   case "mg":
//     size = 338
//     break
//   case "bg":
//     size = 440
// }
