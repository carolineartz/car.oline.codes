import React from "react"
import { Box } from "grommet"
import "styled-components/macro"
import styled from "styled-components"
import { NameAnimation } from "@/animations/nameAnimation"
import { ReactComponent as LinkedIn } from "@/svg/logos/linkedin.svg";
import { ReactComponent as Github } from "@/svg/logos/github.svg";
import { ReactComponent as CodePen } from "@/svg/logos/codepen.svg";
import { ReactComponent as Twitter } from "@/svg/logos/twitter.svg";
import { useSceenSize } from "@/hooks/useScreenSize"
import { CodingCat } from "@/components/CodingCat"

export const NameIntro = React.memo(() => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const firstNameRef = React.useRef<HTMLDivElement>(null)
  const lastNameRef = React.useRef<HTMLDivElement>(null)
  const socialContainerRef = React.useRef<HTMLDivElement>(null)
  const [showCat, setShowCat] = React.useState(false)

  const screenSize = useSceenSize()
  const animationRef = React.useRef<NameAnimation | null>(null)

  React.useLayoutEffect(() => {
    animationRef.current?.kill()

    if (containerRef.current && firstNameRef.current && lastNameRef.current && socialContainerRef.current) {
      animationRef.current = new NameAnimation({
        firstNameEl: firstNameRef.current,
        lastNameEl: lastNameRef.current,
        containerEl: containerRef.current,
        socialContainerEl: socialContainerRef.current
      })

      animationRef.current.animate(() => setShowCat(true))
    }

    return () => {
      animationRef.current?.kill()
    }
  }, [screenSize])

  return (
    <>
      <Box className="name-animation" ref={containerRef} height="100vh" width="100vw" css="visibility: hidden; opacity: 0">
        {screenSize &&
          <AnimationNameEl size={screenSize}>
            <div className="grid-container">
              <div className="empty" />
              <div className="content">
                <div className="container">
                  <div className="animation animation__name">
                    <div className="name name__hidden">carolinee</div>
                    <div className="name name__first" ref={firstNameRef}>caroline</div>
                    <div className="name name__last" ref={lastNameRef}>cartzine</div>
                  </div>
                  <Box align="end" css="position: relative">
                    <Box width="38%" direction="row" gap="medium" css="position: absolute; top: -0.19em;" ref={socialContainerRef}>
                      <Github css="cursor: pointer;" onClick={() => window.open("https://github.com/carolineartz", "_blank")} />
                      <CodePen css="cursor: pointer;" onClick={() => window.open("https://codepen.io/carolineartz", "_blank")} />
                      <LinkedIn css="cursor: pointer;" onClick={() => window.open("https://www.linkedin.com/in/carolineartz/", "_blank")} />
                      <Twitter css="cursor: pointer;" onClick={() => window.open("https://twitter.com/carolineartz", "_blank")} />
                    </Box>
                  </Box>
                </div>
              </div>
              <div className="empty" />
            </div>
          </AnimationNameEl>
        }
      </Box>
      <Box height="50vh" width="100vw">
        <CodingCat start={showCat} />
      </Box>
    </>
  )
})

type AnimationNameElProps = PropsOf<typeof Box> & { size: "small" | "medium" | "large" }

const AnimationNameEl = styled(Box)<AnimationNameElProps>`
  font-family: 'trispace';
  text-rendering: geometricPrecision;
  font-size: ${props => props.size === "small" ? "5em" : props.size === "medium" ? "7em" : "10em"};
  line-height: 1.15;

  background: var(--bg);
  height: 100vh;
  width: 100vw;

  .grid-container {
    height: 100%;
    margin: 0;
    display: grid;
    grid-template-columns: 0.5fr min-content 0.5fr;
  }

  .content {
    display: flex;
    align-items: center;
  }

  .container {
    position: relative;
  }

  .animation {
    &&__social {
      display: flex;
      flex-direction: "row";
    }
  }

  .name {
    color: var(--name, #2f2cf3);
    white-space: pre;

    &__hidden {
      visibility: hidden;
      font-weight: var(--weight-end, 400);
    }

    &__first, &__last {
      position: absolute;
      top: -30%;
    }

    &__last {
      .char {
        &:first-child, &:nth-child(6), &:nth-child(7), &:nth-child(8) {
          visibility: hidden;
        }
      }
    }
  }

`
