import * as React from "react"
import {
  createGlobalStyle,
  css,
  keyframes,
  Keyframes,
  SimpleInterpolation,
} from "styled-components"

import { Box } from "grommet"

import Cat from "assets/svg/bongo-cat.svg"

const blink: Keyframes = keyframes`
  0% { opacity: 0; }
  49% { opacity: 0; }
  50% { opacity: 1; }
`

const typingF3L9: Keyframes = keyframes`
  0% { d: path('M8,25L8,25'); }
  82% { d: path('M8,25L8,25'); }
  92% { d: path('M8,25L96,25'); }
  100% { d: path('M8,25L96,25'); }
`

const typingF3L8: Keyframes = keyframes`
  0% { d: path('M8,13L8,13'); }
  68% { d: path('M8,13L8,13'); }
  82% { d: path('M8,13L146,13'); }
  100% { d: path('M8,13L146,13'); }
`

const typingF3L7: Keyframes = keyframes`
  0% { d: path('M0,1L0,1'); }
  60% { d: path('M0,1L0,1'); }
  68% { d: path('M0,1L96,1'); }
  100% { d: path('M0,1L96,1'); }
`

const typingF2L6: Keyframes = keyframes`
  0% { d: path('M8,25L8,25'); }
  54% { d: path('M8,25L8,25'); }
  60% { d: path('M8,25L69,25'); }
  100% { d: path('M8,25L69,25'); }
`

const typingF2L5: Keyframes = keyframes`
  0% { d: path('M8,13L8,13'); }
  44% { d: path('M8,13L8,13'); }
  54% { d: path('M8,13L114,13'); }
  100% { d: path('M8,13L114,13'); }
`

const typingF2L4: Keyframes = keyframes`
  0% { d: path('M0,1L0,1'); }
  30% { d: path('M0,1L0,1'); }
  44% { d: path('M0,1L136,1'); }
  100% { d: path('M0,1L136,1'); }
`

const typingF1L3: Keyframes = keyframes`
  0% { d: path('M8,25L8,25'); }
  24% { d: path('M8,25L8,25'); }
  30% { d: path('M8,25L61,25'); }
  100% { d: path('M8,25L61,25'); }
`

const typingF1L2: Keyframes = keyframes`
  0% { d: path('M8,13L8,13'); }
  14% { d: path('M8,13L8,13'); }
  24% { d: path('M8,13L124,13'); }
  100% { d: path('M8,13L124,13'); }
`

const typingF1L1: Keyframes = keyframes`
  0% { d: path('M0,1L0,1'); }
  14% { d: path('M0,1L160,1'); }
  100% { d: path('M0,1L160,1'); }
`
type FunctionGroupName = "f1" | "f2" | "f3"
type LineNumberName = "l1" | "l2" | "l3" | "l4" | "l5" | "l6" | "l7" | "l8" | "l9"
type LineNumber = Record<LineNumberName, Keyframes>
type FunctionGroups = Record<FunctionGroupName, Partial<LineNumber>>

const animations: FunctionGroups = {
  f1: {
    l1: typingF1L1,
    l2: typingF1L2,
    l3: typingF1L3,
  },
  f2: {
    l4: typingF2L4,
    l5: typingF2L5,
    l6: typingF2L6,
  },
  f3: {
    l7: typingF3L7,
    l8: typingF3L8,
    l9: typingF3L9,
  },
}

const baseTypingSpeed = 300
const codeTypingAnimationDuration = 1200
const GlobalStyle = createGlobalStyle`
  #laptop__code {
    transform:
      rotateX(-37deg) rotateY(-46deg) rotateZ(-23deg) translateX(8px) translateY(20px)
      translateZ(-50px);
  }

  #paw-right--up,
  #paw-right--down,
  #paw-left--up,
  #paw-left--down {
    animation: ${blink} ${baseTypingSpeed}ms infinite;
  }

  #paw-right--up,
  #paw-left--down {
    animation-delay: ${baseTypingSpeed / 2}ms;
  }

  ${() => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((typingCss: any[], line: number) => {
      const fnGrp: FunctionGroupName = `f${Math.ceil(line / 3)}` as FunctionGroupName
      const lineNo: LineNumberName = `l${line}` as LineNumberName

      typingCss.push(
        css`
          path#${fnGrp}-${lineNo} {
            animation: ${codeTypingAnimationDuration}ms linear ${animations[fnGrp][lineNo]} infinite;
          }
        `
      )

      return typingCss
    }, [] as SimpleInterpolation[])
  }}
`

export const TypingCat = () => (
  <Box basis="full" align="center" justify="center">
    <GlobalStyle />
    <Box width="70%" pad={{ vertical: "xlarge" }}>
      <Cat />
    </Box>
  </Box>
)
