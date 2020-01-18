import styled, { css } from "styled-components"

type ZigZagProps = {
  backgroundBefore: string
  backgroundAfter: string
}

// TODO: get the theme context in here so I can use the color keywords and not pass a hex in here.
export const ZigZagDivider = styled.div`
  position: relative;

  &::before {
    content: "''";
    display: block;
    /* TODO pass in sizing */
    width: 46px;
    background: ${(props: ZigZagProps) =>
      css`linear-gradient(45deg, ${props.backgroundBefore} 25px, transparent 0) 0 25px, linear-gradient(135deg, ${props.backgroundBefore} 25px, transparent 0) 0 25px`};
    background-position: top left;
    background-repeat: repeat-y;
    background-size: 50px 50px;
    height: 100%;
    position: absolute;
  }
`
