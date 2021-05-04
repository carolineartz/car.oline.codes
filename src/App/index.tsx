import { Box, Grommet, Heading, HeadingProps, ResponsiveContext } from "grommet";
import React from "react";
import styled from "styled-components";
import "styled-components/macro";
import { CodingCatEmbed } from "../CodingCatEmbed";
import useDeferredMount from "../useDeferredMount";
import { Projects } from "./../Projects";
import { GlobalStyles } from "./globalStyles";
import { theme } from "./theme";
import { Fade } from "react-awesome-reveal";

const AppContent = () => {
  const shouldMount = useDeferredMount()
  const screenSize = React.useContext(ResponsiveContext);
  const size = screenSize === "small" ? "65px" : "140px";

  return (
    <>
      <Fade>
        <Box
          id="section-intro"
          height="100vh"
          tag="section"
          style={{ visibility: shouldMount ? "visible" : "hidden" }}
          background="#1b1e2d"
        >
          <Box pad="medium">
            <HeadingText fontSize={size}>
              CAROLINE
                <br />
                ARTZ
            </HeadingText>
          </Box>
          <Box justify="center" align="center">
            <CodingCatEmbed />
          </Box>
        </Box>
      </Fade>
      <Box id="section-portfolio" pad="medium" tag="section" background="white">
        <Projects />
      </Box>
    </>
  );
};

type HeadingTextProps = HeadingProps & {
  fontSize: string;
};

const HeadingText = styled(Heading)<HeadingTextProps>`
  font-family: Livvic, sans-sarif;
  font-weight: 900;
  text-shadow: 0.09em 0.09em 0px #a5cbcc;
  position: absolute;
  font-size: ${(props) => props.fontSize};
  mix-blend-mode: color-dodge;
  color: black;
  line-height: 1;
  pointer-events: none;
  text-transform: uppercase;
`;

export const App = () => {
  return (
    <Grommet css="min-height: 100vh; background-color: #1a1e2d;" theme={theme}>
      <GlobalStyles />
      <AppContent />
    </Grommet>
  );
};
